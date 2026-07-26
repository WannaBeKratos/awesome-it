import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const defaultFiles = ["README.md", "GUIDE.md", "CONTRIBUTING.md"];

function slug(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headings(markdown) {
  return new Set(
    [...markdown.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => slug(match[1])),
  );
}

function markdownLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]*]\(([^)]+)\)/g)].map(
    (match) => match[1],
  );
}

function tableErrors(file, markdown) {
  const errors = [];
  let expected = 0;

  for (const [index, line] of markdown.split(/\r?\n/).entries()) {
    if (!line.startsWith("|")) {
      expected = 0;
      continue;
    }

    const columns = line.split("|").length - 2;
    expected ||= columns;
    if (columns !== expected) {
      errors.push(`${file}:${index + 1}: table has ${columns}, expected ${expected} columns`);
    }
  }

  return errors;
}

function catalogErrors(markdown) {
  const catalog = markdown.slice(markdown.indexOf("## Catalog"));
  const errors = [];
  const seen = new Set();
  let section = "";
  let names = [];

  const checkOrder = () => {
    const sorted = [...names].sort((a, b) =>
      a.localeCompare(b, "en", { sensitivity: "base" }),
    );
    if (names.join("\0") !== sorted.join("\0")) {
      errors.push(`README.md: catalog entries are not sorted in "${section}"`);
    }
  };

  for (const line of catalog.split(/\r?\n/)) {
    const heading = line.match(/^#{3,6}\s+(.+)$/);
    if (heading) {
      checkOrder();
      section = heading[1];
      names = [];
      continue;
    }

    const entry = line.match(/^- \[([^\]]+)]\(([^)]+)\)/);
    if (!entry) continue;

    const key = entry[1].toLowerCase();
    if (seen.has(key)) {
      errors.push(`README.md: duplicate catalog entry "${entry[1]}"`);
    }
    seen.add(key);
    names.push(entry[1]);
  }
  checkOrder();

  return errors;
}

function validate(files) {
  const documents = new Map(
    files.map((file) => [file, fs.readFileSync(path.join(root, file), "utf8")]),
  );
  const errors = [];

  for (const [file, markdown] of documents) {
    errors.push(...tableErrors(file, markdown));

    for (const href of markdownLinks(markdown)) {
      if (/^(https?:|mailto:)/.test(href)) continue;

      const [targetName, anchor] = href.split("#");
      const target = targetName || file;
      const targetPath = path.resolve(root, path.dirname(file), target);

      if (!fs.existsSync(targetPath)) {
        errors.push(`${file}: missing local file "${target}"`);
        continue;
      }

      if (!anchor) continue;
      const targetMarkdown =
        documents.get(path.relative(root, targetPath).replaceAll("\\", "/")) ??
        fs.readFileSync(targetPath, "utf8");
      if (!headings(targetMarkdown).has(anchor)) {
        errors.push(`${file}: missing anchor "#${anchor}" in "${target}"`);
      }
    }
  }

  errors.push(...catalogErrors(documents.get("README.md")));
  return errors;
}

function selfTest() {
  assert.equal(slug("DNS, DHCP, and `Core` Services"), "dns-dhcp-and-core-services");
  assert.deepEqual(markdownLinks("[A](README.md#a)\n[B](https://example.com)"), [
    "README.md#a",
    "https://example.com",
  ]);
  assert.deepEqual(tableErrors("x.md", "| A | B |\n|---|---|\n| 1 | 2 |"), []);
  assert.equal(tableErrors("x.md", "| A | B |\n| 1 |").length, 1);
  console.log("Validator self-test passed.");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const files = process.argv.slice(2);
  const checked = files.length ? files : defaultFiles;
  const errors = validate(checked);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Validated ${checked.join(", ")}.`);
}
