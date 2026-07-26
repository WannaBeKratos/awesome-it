# Contributing

Thank you for helping make Awesome IT & ICT more useful.

## What belongs here

A tool should:

- solve a real IT or ICT operations problem;
- be maintained, documented, and usable beyond a single private environment;
- have a clear official project page or source repository;
- add something meaningfully different from existing entries; and
- be safe and legal to use for its stated purpose.

Open-source and self-hostable tools are preferred. Commercial or
source-available tools may be accepted when they are widely relevant and make
a category or comparison materially more useful.

## Pull requests

1. Search the list and open pull requests for duplicates.
2. Add one tool or one focused group of related changes per pull request.
3. Place catalog entries alphabetically within their subsection.
4. Use the official project or documentation URL, without referral or tracking
   parameters.
5. Write one neutral sentence in this form:

   ```markdown
   - [Tool](https://example.com/) — What it does and why an operator would use it.
   ```

6. Explain in the pull-request description why the tool is useful and disclose
   any affiliation.
7. Run `node scripts/validate.mjs`.
8. Run or wait for the external link check.

Please do not add star counts, popularity claims, promotional adjectives,
abandoned projects, duplicate editions of the same product, or links that
require an account just to understand the tool.

## Comparison changes

Comparison tables should help readers choose, not declare a winner.

- Compare tools that address the same job or clearly explain where their scopes
  differ.
- Prefer observable properties over subjective scores.
- Link the tool name to current first-party documentation.
- Cite the exact first-party source in the pull-request description for a
  disputed or newly added capability.
- Update the review date in `README.md` when a table has been rechecked in full.
- Avoid price figures and version numbers unless the distinction cannot be
  explained without them; both age quickly.

Changes to `GUIDE.md` should preserve its minimum-first approach: name the
smallest useful stack, explain what each component owns, and add another tool
only when there is a concrete operational trigger.

## Removing a tool

A tool may be removed when it is archived, unmaintained, unsafe, superseded, or
no longer has usable documentation. Include evidence in the pull request so the
decision is easy to review.
