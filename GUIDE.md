# Practical Decision Guide

Use this guide after the catalog gives you a shortlist. It favors the smallest
stack that covers the job and makes each system's ownership explicit.

## Principles

1. Start with the operational problem, not a product category.
2. Give each kind of data one authoritative owner.
3. Prefer exportable data and documented APIs over deep lock-in.
4. Test restore and upgrade paths before feature depth.
5. Add a component only when a measured need justifies operating it.

## One owner per kind of data

Integrations work best when they copy data in one direction from an authority
to consumers. Two tools editing the same fact creates drift.

| Data | Authoritative system | Typical consumers |
|---|---|---|
| People, groups, and authentication policy | Identity provider or directory | Service desk, remote access, applications |
| Laptop ownership, warranties, and licenses | IT asset management | Service desk and finance |
| Intended IP space, racks, circuits, and cabling | Network source of truth | Automation, monitoring, and diagrams |
| Live health, metrics, and availability | Monitoring platform | Alerting, dashboards, and incident workflows |
| Running network-device configurations | Configuration archive | Audit, diff, and recovery workflows |
| Requests, incidents, and changes | Service desk / ITSM | Reporting, automation, and knowledge base |
| Passwords, keys, and dynamic credentials | Password or secrets manager | People, services, and automation |
| Recovery points and retention history | Backup platform | Restore and disaster-recovery workflows |

## Minimum viable stack recipes

These are component boundaries, not copy-and-paste production architectures.
Validate scale, security, support, and recovery requirements in your own
environment.

### Small internal IT team

Start with:

| Role | Tool | Owns |
|---|---|---|
| Inventory and service desk | [GLPI](https://glpi-project.org/) + [GLPI Agent](https://help.glpi-project.org/tutorials/inventory/computer_inventory) | Assets, assignments, tickets, and discovered endpoint inventory |
| Remote support | [MeshCentral](https://docs.meshcentral.com/) | Enrolled endpoints and remote sessions |
| Infrastructure monitoring | [Zabbix](https://www.zabbix.com/features) | Health checks, metrics, alerts, and network-device observations |

Add later:

- [Proxmox VE](https://pve.proxmox.com/pve-docs/) only when you need to operate
  an on-premises virtualization cluster.
- [Proxmox Backup Server](https://www.proxmox.com/en/products/proxmox-backup-server/overview)
  with Proxmox, or [restic](https://restic.net/) for encrypted file backups to
  existing storage.
- A central identity provider when repeated account provisioning or MFA policy
  becomes a real burden.

Watch for three endpoint agents competing for maintenance windows. Define
ownership, rollout rings, and emergency access before wide deployment.

### Network operations

Start with:

| Role | Tool | Owns |
|---|---|---|
| Intended network state | [NetBox](https://netboxlabs.com/docs/netbox/) | IPAM, DCIM, devices, circuits, and cabling |
| Configuration execution | [Ansible](https://docs.ansible.com/) | Reviewed changes generated from inventory and playbooks |
| Running configuration history | [Oxidized](https://github.com/ytti/oxidized) | Timestamped device-configuration snapshots and diffs |
| Observed health | [LibreNMS](https://www.librenms.org/) | Discovery, SNMP metrics, availability, and alerts |

Treat NetBox as intent and LibreNMS as observation. Reconcile differences
deliberately; do not make two-way synchronization the default.

Add [Batfish](https://www.batfish.org/) when configuration review needs
pre-change reachability and policy analysis. Add a workflow runner only when
manual, reviewed Ansible runs become a bottleneck.

### Cloud-native platform

Start with:

| Role | Tool | Owns |
|---|---|---|
| Infrastructure provisioning | [OpenTofu](https://opentofu.org/) | Cloud resources and their provisioning state |
| Workload orchestration | [Kubernetes](https://kubernetes.io/docs/home/) | Desired and observed workload state |
| Metrics and alerts | [Prometheus](https://prometheus.io/docs/introduction/overview/) + [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) | Time-series metrics and alert routing |
| Visualization | [Grafana](https://grafana.com/oss/grafana/) | Dashboards and cross-signal exploration |

Add [Loki](https://grafana.com/docs/loki/latest/) when centralized log queries
have a defined retention and cost model. Add
[OpenTelemetry](https://opentelemetry.io/) when you need traces or a
vendor-neutral telemetry pipeline.

Watch metric cardinality, log retention, persistent-volume recovery, and
control-plane ownership before adding more observability components.

### Security monitoring

Start with the telemetry you can staff:

| Coverage | Tool | Owns |
|---|---|---|
| Endpoint and server security | [Wazuh](https://documentation.wazuh.com/current/getting-started/components/index.html) | Endpoint events, file integrity, posture, vulnerability, and response data |
| Network security monitoring | [Security Onion](https://docs.securityonion.net/) | Network sensors, Suricata alerts, Zeek metadata, hunting, and cases |

Security Onion already packages Zeek and Suricata. Operate them separately only
when you need a custom sensor or pipeline. Before adding both platforms, assign
alert ownership, retention, escalation, and on-call response; unowned alerts
are not coverage.

### Virtualization cluster

Choose one platform stack:

| Platform | Management and backup path | Best starting shape |
|---|---|---|
| [Proxmox VE](https://pve.proxmox.com/pve-docs/) | Integrated management plus [Proxmox Backup Server](https://www.proxmox.com/en/products/proxmox-backup-server/overview) | General KVM and LXC cluster |
| [XCP-ng](https://docs.xcp-ng.org/) | [Xen Orchestra](https://docs.xcp-ng.org/management/manage-at-scale/xo-web-ui/) for central management and VM backup | VM-focused Xen pools |

Deploy the platform-native backup path and complete a restore into a fresh
location before adding general monitoring. Do not treat storage snapshots alone
as backups.

## Comparison scorecard

Eliminate a tool immediately if it fails a hard requirement. Score the
remaining candidates from 0 to 5 and multiply by the weight:

- **0** — absent;
- **1** — possible only through custom work;
- **3** — supported with limitations;
- **5** — verified in the proof of concept.

| Criterion | Weight | Tool A | Tool B | Evidence |
|---|---:|---:|---:|---|
| Required workflows | 5 |  |  |  |
| Security, SSO, MFA, and least privilege | 5 |  |  |  |
| Backup, restore, export, and exit path | 5 |  |  |  |
| Installation, upgrades, and operating burden | 4 |  |  |  |
| API and integration fit | 3 |  |  |  |
| Project lifecycle, documentation, and support | 3 |  |  |  |
| User and administrator experience | 2 |  |  |  |
| Resource use and expected scale | 2 |  |  |  |
| License and total cost | 2 |  |  |  |
| **Weighted total** |  |  |  |  |

Keep evidence as a link, test result, or measured observation. Marketing claims
without a reproducible check score zero.

## Proof-of-concept checklist

Use realistic data and the same test for every candidate:

- [ ] Install from current documentation on a clean environment.
- [ ] Import or create a representative set of users, devices, services, and
      history.
- [ ] Complete the three most common end-to-end workflows.
- [ ] Configure least-privilege roles and, where required, SSO and MFA.
- [ ] Exercise the API or a documented bulk export.
- [ ] Back up configuration and data, then restore into a fresh instance.
- [ ] Perform one representative upgrade and record downtime and rollback.
- [ ] Disconnect optional cloud services and observe what stops working.
- [ ] Measure idle and peak CPU, memory, storage growth, and network use.
- [ ] Trigger an alert or failure and follow the runbook to resolution.

## Production-readiness checklist

- [ ] A named owner and backup owner are responsible for the service.
- [ ] Deployment, upgrade, rollback, and disaster-recovery runbooks exist.
- [ ] A fresh restore has been completed within the required recovery time.
- [ ] TLS, SSO, MFA, RBAC, service accounts, and emergency access are reviewed.
- [ ] Secrets are outside source control and have a rotation path.
- [ ] Audit, telemetry, and business data have explicit retention policies.
- [ ] The tool itself is monitored and alerts reach an owned response path.
- [ ] Capacity limits and storage growth have warning thresholds.
- [ ] External integrations and outbound connections are documented.
- [ ] A full export and replacement path is tested before lock-in becomes
      expensive.

## Decision record

Copy this into an issue or architecture record:

```markdown
# Tool decision: <problem>

- Date:
- Owner:
- Review trigger:
- Problem and users:
- Hard requirements:
- Candidates:
- Proof-of-concept evidence:
- Weighted results:
- Decision:
- Why the alternatives were rejected:
- Data owner and integration direction:
- Backup, restore, and exit plan:
```
