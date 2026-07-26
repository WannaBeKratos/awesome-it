# Awesome IT & ICT

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](LICENSE)

A curated, practical list of tools for operating endpoints, servers, networks,
cloud platforms, communications, and IT services.

This list favors useful, well-documented, actively maintained tools. Open-source
and self-hostable projects are preferred, but a widely used tool may be included
when it makes a comparison more useful.

> [!NOTE]
> Comparison tables are decision aids, not rankings. Features, editions, and
> licenses change; verify the linked documentation before adopting a tool.
> Last reviewed: **2026-07-26**.

## Contents

- [Choose a tool](#choose-a-tool)
- [Practical decision guide](#practical-decision-guide)
- [Comparison matrices](#comparison-matrices)
  - [Infrastructure automation](#infrastructure-automation)
  - [Virtualization and private cloud](#virtualization-and-private-cloud)
  - [Containers and orchestration](#containers-and-orchestration)
  - [Infrastructure monitoring](#infrastructure-monitoring)
  - [Logs and observability](#logs-and-observability)
  - [Asset inventory and CMDB](#asset-inventory-and-cmdb)
  - [Service desk](#service-desk)
  - [Remote access](#remote-access)
  - [Backup](#backup)
  - [Security monitoring](#security-monitoring)
  - [Identity and access](#identity-and-access)
  - [Password management](#password-management)
- [Catalog](#catalog)
  - [Operating systems and endpoint administration](#operating-systems-and-endpoint-administration)
  - [Virtualization and HCI](#virtualization-and-hci)
  - [Containers](#containers)
  - [Cloud, infrastructure as code, and automation](#cloud-infrastructure-as-code-and-automation)
  - [Networking and IPAM](#networking-and-ipam)
  - [DNS, DHCP, and core network services](#dns-dhcp-and-core-network-services)
  - [Monitoring, logging, and observability](#monitoring-logging-and-observability)
  - [Security](#security)
  - [Identity, secrets, and certificates](#identity-secrets-and-certificates)
  - [Asset management, inventory, and CMDB](#asset-management-inventory-and-cmdb)
  - [Service desk and ITSM](#service-desk-and-itsm)
  - [Remote support and access](#remote-support-and-access)
  - [Backup, recovery, and storage](#backup-recovery-and-storage)
  - [Communications and collaboration](#communications-and-collaboration)
  - [Documentation and diagrams](#documentation-and-diagrams)
  - [Testing and troubleshooting](#testing-and-troubleshooting)
  - [Learning and labs](#learning-and-labs)
- [Contributing](#contributing)
- [License](#license)

## Choose a tool

Good starting points for common jobs:

| Need | Start with | Why |
|---|---|---|
| Track laptops, licenses, and assignments | [Snipe-IT](https://snipeitapp.com/) | Focused IT asset checkout and lifecycle management |
| Model networks, racks, circuits, and IP space | [NetBox](https://netbox.dev/) | Network-focused source of truth with strong APIs |
| Run a general-purpose service desk | [Zammad](https://zammad.org/) | Full web help desk with multiple intake channels |
| Monitor mixed servers and network devices | [Zabbix](https://www.zabbix.com/) | Agents, SNMP, discovery, alerting, and dashboards in one system |
| Monitor cloud-native workloads | [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/oss/grafana/) | Strong metrics ecosystem and flexible visualization |
| Centralize logs in an existing Grafana stack | [Loki](https://grafana.com/oss/loki/) | Label-indexed logs that integrate closely with Grafana |
| Monitor endpoint security and compliance | [Wazuh](https://wazuh.com/) | Endpoint agents, detection rules, vulnerability data, and a central dashboard |
| Remotely manage a fleet through a browser | [MeshCentral](https://meshcentral.com/) | Self-hosted desktop, terminal, and file access |
| Make encrypted file backups to object storage | [restic](https://restic.net/) | Small CLI, built-in encryption, deduplication, and broad backend support |
| Run VMs and containers on a few on-premises hosts | [Proxmox VE](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview) | Integrated KVM, LXC, clustering, storage, and web management |

## Practical decision guide

The [practical decision guide](GUIDE.md) turns the catalog into:

- minimum viable stack recipes for small IT, network, cloud-native, security,
  and virtualization teams;
- a map of which system should own each kind of operational data;
- a weighted comparison scorecard and proof-of-concept checklist; and
- a production-readiness and exit-plan checklist.

## Comparison matrices

### Infrastructure automation

These tools overlap, but they do not all manage the same layer. A common stack
uses a provisioner for infrastructure and Ansible for operating-system and
application configuration.

| Tool | Main model | Authoring | Persistent resource state | Best fit |
|---|---|---|---|---|
| [OpenTofu](https://opentofu.org/) | Declarative provisioning | HCL / JSON | Yes, local or remote backend | Vendor-neutral, open-source multi-cloud provisioning |
| [Terraform](https://developer.hashicorp.com/terraform) | Declarative provisioning | HCL / JSON | Yes, local or remote backend | Teams already standardized on Terraform and its ecosystem |
| [Pulumi](https://www.pulumi.com/docs/iac/) | Declarative provisioning through SDKs | TypeScript, JavaScript, Python, Go, .NET, Java, YAML | Yes, managed or self-managed backend | Software teams that want normal languages, testing, and reusable packages |
| [Ansible](https://docs.ansible.com/) | Task execution and configuration management | YAML playbooks | No central resource-state snapshot | Host configuration, application deployment, and ad-hoc operations |

### Virtualization and private cloud

| Tool | Compute model | Management plane | Operational shape | Best fit |
|---|---|---|---|---|
| [Proxmox VE](https://pve.proxmox.com/pve-docs/) | KVM virtual machines and LXC containers | Integrated web UI, API, and CLI | Appliance-like hosts with built-in clustering and storage integration | Small and medium clusters, labs, and general on-premises virtualization |
| [XCP-ng](https://docs.xcp-ng.org/) | Xen virtual machines | Xen Orchestra, API, and CLI | Dedicated hypervisor hosts grouped into pools | VM-centric environments wanting integrated Xen Orchestra management and backup |
| [Harvester](https://docs.harvesterhci.io/) | KubeVirt virtual machines on Kubernetes | Web UI, Kubernetes APIs, and Rancher integration | Hyperconverged Kubernetes-based cluster | Teams combining VM operations with a Kubernetes control plane |
| [OpenStack](https://docs.openstack.org/) | Primarily KVM, with other drivers available | Modular APIs, CLI, and Horizon dashboard | Multi-service private-cloud control plane | Large multi-tenant private clouds with dedicated platform staff |

### Containers and orchestration

| Tool | Scope | Runtime approach | Primary unit | Best fit |
|---|---|---|---|---|
| [Docker Engine](https://docs.docker.com/engine/) + [Compose](https://docs.docker.com/compose/) | Single host | Daemon; rootless mode available | Container / Compose application | Developer workflows and straightforward single-host services |
| [Podman](https://podman.io/docs) | Single host | Daemonless; first-class rootless operation | Container or pod | Linux hosts, systemd integration, and daemonless operation |
| [Kubernetes](https://kubernetes.io/docs/home/) | Cluster | Control plane plus OCI-compatible node runtime | Pod and controller | Portable, extensible orchestration for complex distributed applications |
| [Nomad](https://developer.hashicorp.com/nomad/docs) | Cluster | Servers schedule work to client agents | Job and task group | A compact scheduler for containerized and non-containerized workloads |

### Infrastructure monitoring

| Tool | Collection model | Agent requirement | Data and UI | Best fit |
|---|---|---|---|---|
| [Prometheus](https://prometheus.io/docs/introduction/overview/) | Primarily pull, with service discovery and exporters | Exporter or instrumented endpoint for most host data | Local time-series database; PromQL; Grafana commonly added | Metrics-first, cloud-native, and application monitoring |
| [Zabbix](https://www.zabbix.com/features) | Pull and push through server, proxies, agents, and protocols such as SNMP | Optional | SQL-backed history with integrated UI, maps, discovery, and alerting | Mixed server, network, appliance, and remote-site monitoring |
| [Icinga](https://icinga.com/docs/) | Scheduled active checks and distributed check execution | Optional | Web UI plus configurable data backends | Check-oriented availability monitoring and customized operations workflows |
| [Netdata](https://learn.netdata.cloud/docs/welcome-to-netdata/) | Distributed, high-frequency edge collection | Yes for host-level depth | Per-node storage and dashboards; optional Netdata Cloud | Fast deployment and real-time troubleshooting by lean teams |

### Logs and observability

| Tool | Storage/query approach | Signals | Primary UI | Best fit |
|---|---|---|---|---|
| [Grafana Loki](https://grafana.com/docs/loki/latest/) | Indexes labels and stores compressed log chunks | Logs | Grafana | Cost-aware logging alongside Prometheus and Grafana |
| [OpenSearch](https://opensearch.org/docs/latest/) | Distributed full-text document indexes | Logs and search documents | OpenSearch Dashboards | Search-heavy log analytics and customizable data pipelines |
| [Graylog](https://go2docs.graylog.org/current/home.htm) | Streams and processing pipelines over indexed storage | Logs and events | Integrated Graylog UI | Central log management with opinionated routing, parsing, and alerting |
| [SigNoz](https://signoz.io/docs/) | ClickHouse-backed telemetry platform | Metrics, logs, and traces | Integrated SigNoz UI | One open-source interface for application observability signals |

### Asset inventory and CMDB

Pick the data model that matches the question you need to answer.

| Tool | Source-of-truth focus | Workflow strength | Deliberate limitation | Best fit |
|---|---|---|---|---|
| [NetBox](https://netboxlabs.com/docs/netbox/) | Networks, IPAM, DCIM, circuits, and cabling | APIs, plugins, automation events | Not a general endpoint asset checkout system | Network engineering and automation |
| [Snipe-IT](https://snipe-it.readme.io/docs/introduction) | Assigned hardware, accessories, licenses, and consumables | Check-in/out, labels, audits, and lifecycle fields | Not a relationship-heavy CMDB or help desk | End-user IT asset accountability |
| [GLPI](https://glpi-project.org/) | IT assets and discovered inventory | Service desk, contracts, financial data, and agents | Broader interface than a single-purpose asset tracker | Organizations wanting ITAM and ticketing together |
| [iTop](https://www.itophub.io/wiki/page) | Configuration items, services, and their relationships | ITIL-oriented requests, incidents, problems, changes, and SLAs | Requires deliberate CMDB modeling and ownership | Service-centered CMDB and ITSM |

### Service desk

| Tool | Main intake | Asset / CMDB link | Workflow shape | Best fit |
|---|---|---|---|---|
| [Zammad](https://zammad.org/) | Email, web, chat, and other channels | External integration | Full agent workspace, roles, groups, SLAs, and automation | General internal or customer-facing help desks |
| [FreeScout](https://freescout.net/) | Shared email inbox | External integration | Lightweight mailbox workflow extended by modules | Small teams replacing a shared support mailbox |
| [osTicket](https://osticket.com/) | Email, web forms, and API | External integration | Traditional queues, filters, SLAs, and canned responses | Straightforward ticketing with a mature deployment model |
| [GLPI](https://glpi-project.org/) | Portal, email, and forms | Native IT asset inventory | ITSM processes tied directly to users and assets | Internal IT teams that want tickets and ITAM in one product |

### Remote access

| Tool | Connection model | Client experience | Managed agent | Best fit |
|---|---|---|---|---|
| [Apache Guacamole](https://guacamole.apache.org/) | Gateway to RDP, VNC, and SSH targets | Web browser | No | Browser access to existing servers and desktops without installing a client |
| [MeshCentral](https://docs.meshcentral.com/) | Self-hosted management server to enrolled endpoints | Web browser | Yes | Persistent fleet management with desktop, terminal, files, and Intel AMT support |
| [RustDesk](https://rustdesk.com/docs/en/) | Direct or self-hosted rendezvous/relay service | Native desktop and mobile clients | Yes | Attended and unattended remote support with a TeamViewer-like workflow |
| [Remmina](https://remmina.org/) | Local client directly to remote services | Linux desktop application | No | Administrators who need one client for RDP, VNC, SSH, and related protocols |

### Backup

All three file-backup tools below provide deduplication and client-side
encryption. None replaces application-aware database dumps or tested restore
procedures.

| Tool | Interface | Repository targets | Distinctive strength | Best fit |
|---|---|---|---|---|
| [restic](https://restic.readthedocs.io/) | CLI | Local, SFTP, REST, and major object stores | Small cross-platform binary and broad storage support | Scripted backups to object storage or an existing backup service |
| [BorgBackup](https://borgbackup.readthedocs.io/) | CLI | Local filesystem or remote Borg over SSH | Efficient content-defined deduplication and compression | Unix-like systems backing up to a controlled server |
| [Kopia](https://kopia.io/docs/features/) | CLI and desktop GUI; optional server mode | Local, SFTP, WebDAV, and major object stores | Policies, mandatory encryption, GUI, and error-correction options | Cross-platform users wanting both graphical and scripted operation |
| [UrBackup](https://www.urbackup.org/) | Central web UI with client agents | Storage attached to the backup server | Centralized file and image backups | Small and medium endpoint fleets, especially mixed Windows and Linux |

### Security monitoring

These tools cover different telemetry. Zeek and Suricata are commonly deployed
together; Security Onion packages both into a broader analyst platform.

| Tool | Observes | Detection style | Response model | Best fit |
|---|---|---|---|---|
| [Wazuh](https://documentation.wazuh.com/current/getting-started/components/index.html) | Endpoint events, files, configuration, vulnerabilities, and collected logs | Rules, indicators, posture checks, and endpoint telemetry | Central alerts plus configurable active response | Endpoint-focused SIEM/XDR and compliance monitoring |
| [Security Onion](https://docs.securityonion.net/) | Network traffic plus ingested host and service logs | Integrated Suricata, Zeek, rules, hunting, and case workflows | Analyst-driven SOC workflow | A packaged network-security monitoring and investigation platform |
| [Zeek](https://docs.zeek.org/en/current/about.html) | Passive network traffic | Protocol analysis and rich behavioral metadata | Produces structured logs and notices for downstream analysis | Network visibility, hunting, and protocol-level investigations |
| [Suricata](https://docs.suricata.io/en/latest/what-is-suricata.html) | Network packets and flows | Signature and protocol-aware IDS/IPS | Passive alerting or inline blocking | Known-threat detection and inline network prevention |

### Identity and access

| Tool | Primary role | Main protocols / integration | Best fit |
|---|---|---|---|
| [Keycloak](https://www.keycloak.org/documentation) | Central identity provider | OpenID Connect, OAuth 2.0, and SAML | Organizations needing a mature application SSO and federation platform |
| [authentik](https://docs.goauthentik.io/) | Identity provider and access proxy | OIDC, OAuth 2.0, SAML, LDAP, proxy outposts | Self-hosters wanting SSO plus proxy-based protection in one UI |
| [Authelia](https://www.authelia.com/overview/prologue/introduction/) | Authentication and authorization portal | Reverse-proxy forward auth and OpenID Connect | Adding MFA and policy gates in front of internal web applications |
| [FreeIPA](https://www.freeipa.org/page/Documentation) | Linux identity and policy domain | LDAP, Kerberos, DNS, certificates, and host policy | Central Linux users, hosts, sudo rules, and Kerberos authentication |

### Password management

| Tool | Vault model | Synchronization | Sharing model | Best fit |
|---|---|---|---|---|
| [KeePassXC](https://keepassxc.org/) | Encrypted local database file | Bring your own file synchronization | Shared database file | Individuals or offline-first environments |
| [Bitwarden](https://bitwarden.com/help/) | Client/server vault | Hosted or official self-hosted server | Organization collections | General cross-platform personal and team password management |
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Community Bitwarden-compatible server | Self-hosted | Bitwarden-compatible organizations | Small self-hosters comfortable operating an unofficial server implementation |
| [Passbolt](https://www.passbolt.com/docs/) | Team-oriented client/server vault | Cloud or self-hosted server | User and group sharing | Teams prioritizing credential sharing, ownership, and audit workflows |

## Catalog

### Operating systems and endpoint administration

- [AlmaLinux](https://almalinux.org/) — Community-owned, RHEL-compatible Linux distribution.
- [Chocolatey](https://chocolatey.org/) — Package manager and automation tooling for Windows.
- [Clonezilla](https://clonezilla.org/) — Disk imaging and cloning system.
- [Debian](https://www.debian.org/) — Stable, general-purpose Linux distribution with a large package ecosystem.
- [Fleet](https://fleetdm.com/) — Device management and security visibility built around osquery.
- [FOG Project](https://fogproject.org/) — Network-based imaging and lifecycle management for endpoints.
- [FreeBSD](https://www.freebsd.org/) — Unix-like operating system known for networking, storage, and jails.
- [Munki](https://www.munki.org/munki/) — Managed software installation for macOS fleets.
- [NixOS](https://nixos.org/) — Declaratively configured Linux distribution with reproducible system builds.
- [osquery](https://www.osquery.io/) — Query operating-system state using SQL.
- [Rocky Linux](https://rockylinux.org/) — Community enterprise Linux distribution compatible with RHEL.
- [Rufus](https://rufus.ie/) — Windows utility for creating bootable USB drives.
- [Sysinternals](https://learn.microsoft.com/sysinternals/) — Microsoft troubleshooting, diagnostics, and administration utilities.
- [Ubuntu Server](https://ubuntu.com/server) — Widely supported Linux server distribution.
- [Ventoy](https://www.ventoy.net/) — Boot multiple ISO, WIM, IMG, VHD(x), and EFI images from one USB drive.
- [WinGet](https://learn.microsoft.com/windows/package-manager/) — Microsoft's command-line Windows package manager.

### Virtualization and HCI

- [Harvester](https://harvesterhci.io/) — Kubernetes-based hyperconverged infrastructure for VMs and container environments.
- [Incus](https://linuxcontainers.org/incus/) — System container and virtual-machine manager.
- [KubeVirt](https://kubevirt.io/) — Virtual-machine management through Kubernetes APIs.
- [libvirt](https://libvirt.org/) — Common API and daemon for managing virtualization platforms.
- [OpenNebula](https://opennebula.io/) — Cloud and edge management platform for virtualized infrastructure.
- [OpenStack](https://www.openstack.org/) — Modular private and public cloud infrastructure platform.
- [oVirt](https://www.ovirt.org/) — KVM virtualization management platform.
- [Proxmox VE](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview) — Integrated KVM and LXC virtualization platform.
- [QEMU](https://www.qemu.org/) — Machine emulator and virtualizer.
- [Vagrant](https://developer.hashicorp.com/vagrant) — Reproducible development and test environments.
- [XCP-ng](https://xcp-ng.org/) — Xen-based enterprise virtualization platform.
- [Xen Project](https://xenproject.org/) — Open-source type-1 hypervisor.

### Containers

- [containerd](https://containerd.io/) — Industry-standard container runtime.
- [Docker](https://www.docker.com/) — Container build, runtime, and developer workflow ecosystem.
- [Harbor](https://goharbor.io/) — OCI registry with replication, scanning, signing, and policy controls.
- [K3s](https://k3s.io/) — Lightweight, conformant Kubernetes distribution.
- [Kubernetes](https://kubernetes.io/) — Extensible platform for orchestrating containerized workloads.
- [LXC](https://linuxcontainers.org/lxc/) — Low-level Linux system containers.
- [Nomad](https://developer.hashicorp.com/nomad) — Distributed scheduler for containers and other workload types.
- [Podman](https://podman.io/) — Daemonless container and pod engine.
- [Portainer CE](https://docs.portainer.io/start/install-ce) — Web management for Docker, Swarm, Podman, and Kubernetes environments.
- [Rancher](https://www.rancher.com/) — Multi-cluster Kubernetes management platform.
- [Skopeo](https://github.com/containers/skopeo) — Inspect, copy, sign, and delete container images without running them.

### Cloud, infrastructure as code, and automation

- [Ansible](https://www.ansible.com/) — Agentless configuration management, deployment, and task automation.
- [Atlantis](https://www.runatlantis.io/) — Pull-request automation for Terraform and OpenTofu.
- [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/) — Declarative language for Azure Resource Manager.
- [cloud-init](https://docs.cloud-init.io/) — Cross-platform instance initialization used by clouds and VM images.
- [Crossplane](https://www.crossplane.io/) — Cloud resource control planes built with Kubernetes APIs.
- [Foreman](https://theforeman.org/) — Provisioning and lifecycle management for physical and virtual servers.
- [Jenkins](https://www.jenkins.io/) — Extensible automation server for build and operations workflows.
- [OpenTofu](https://opentofu.org/) — Open-source infrastructure-as-code engine compatible with the Terraform language.
- [Packer](https://developer.hashicorp.com/packer) — Automated machine-image builder.
- [Pulumi](https://www.pulumi.com/) — Infrastructure as code using general-purpose programming languages.
- [Rundeck Community](https://www.rundeck.com/open-source) — Runbook automation and delegated operations.
- [Salt](https://saltproject.io/) — Event-driven configuration management and remote execution.
- [Terraform](https://developer.hashicorp.com/terraform) — Infrastructure provisioning with a declarative configuration language.

### Networking and IPAM

- [Batfish](https://www.batfish.org/) — Network configuration analysis and validation.
- [Containerlab](https://containerlab.dev/) — Container-based networking labs.
- [FRRouting](https://frrouting.org/) — Routing protocol suite for Linux and Unix platforms.
- [LibreNMS](https://www.librenms.org/) — Auto-discovering network monitoring with broad device support.
- [Nautobot](https://networktocode.com/nautobot/) — Network source of truth and automation platform.
- [NetBox](https://netbox.dev/) — Network source of truth combining IPAM and DCIM.
- [Netdisco](https://netdisco.org/) — Web-based network discovery and management.
- [ntopng](https://www.ntop.org/products/traffic-analysis/ntop/) — Web-based network traffic analysis.
- [OpenWrt](https://openwrt.org/) — Extensible Linux operating system for embedded network devices.
- [Oxidized](https://github.com/ytti/oxidized) — Network-device configuration backup with version-control integration.
- [phpIPAM](https://phpipam.net/) — Web-based IP address management.
- [VyOS](https://vyos.io/) — Linux-based network operating system for routing and security.

### DNS, DHCP, and core network services

- [AdGuard Home](https://adguard.com/adguard-home/overview.html) — Network-wide DNS filtering service.
- [BIND 9](https://www.isc.org/bind/) — Authoritative DNS server and recursive resolver.
- [chrony](https://chrony-project.org/) — NTP implementation for synchronizing system clocks.
- [dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) — Lightweight DNS, DHCP, router advertisement, and network boot service.
- [Kea](https://www.isc.org/kea/) — Extensible DHCPv4 and DHCPv6 server.
- [Pi-hole](https://pi-hole.net/) — DNS sinkhole for network-wide content blocking.
- [PowerDNS](https://www.powerdns.com/) — Authoritative DNS server, recursor, and related tools.
- [Technitium DNS Server](https://technitium.com/dns/) — Cross-platform authoritative and recursive DNS server with a web console.
- [Unbound](https://nlnetlabs.nl/projects/unbound/about/) — Validating, recursive, caching DNS resolver.

### Monitoring, logging, and observability

- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) — Deduplication, grouping, routing, and silencing for Prometheus alerts.
- [Checkmk Raw](https://checkmk.com/product/raw-edition) — Infrastructure and application monitoring based on a large check catalog.
- [Grafana](https://grafana.com/oss/grafana/) — Dashboards and exploration across metrics, logs, traces, and other data sources.
- [Graylog](https://graylog.org/products/source-available/) — Centralized log collection, processing, search, and alerting.
- [Icinga](https://icinga.com/) — Extensible availability and infrastructure monitoring.
- [Jaeger](https://www.jaegertracing.io/) — Distributed tracing platform.
- [Loki](https://grafana.com/oss/loki/) — Horizontally scalable log aggregation inspired by Prometheus.
- [Netdata](https://www.netdata.cloud/) — Distributed real-time infrastructure monitoring.
- [OpenSearch](https://opensearch.org/) — Search and analytics suite used for logs and observability data.
- [OpenTelemetry](https://opentelemetry.io/) — Vendor-neutral APIs, SDKs, and collectors for telemetry.
- [Prometheus](https://prometheus.io/) — Metrics monitoring and alerting toolkit with a time-series database.
- [SigNoz](https://signoz.io/) — Open-source metrics, logs, and traces platform.
- [Uptime Kuma](https://uptime.kuma.pet/) — Self-hosted uptime monitor with status pages.
- [VictoriaMetrics](https://victoriametrics.com/) — Time-series database and monitoring stack.
- [Zabbix](https://www.zabbix.com/) — Integrated monitoring for servers, networks, applications, and services.

### Security

#### Detection and response

- [CrowdSec](https://www.crowdsec.net/) — Collaborative behavior-based intrusion prevention engine.
- [Falco](https://falco.org/) — Runtime threat detection for hosts and cloud-native workloads.
- [MISP](https://www.misp-project.org/) — Threat-intelligence sharing and indicator management.
- [Security Onion](https://securityonionsolutions.com/software) — Linux distribution for network security monitoring, hunting, and log management.
- [Suricata](https://suricata.io/) — High-performance network IDS, IPS, and security monitoring engine.
- [TheHive](https://thehive-project.org/) — Security incident response and case management platform.
- [Wazuh](https://wazuh.com/) — Endpoint security, SIEM, XDR, and compliance platform.
- [Zeek](https://zeek.org/) — Passive network traffic analyzer that produces rich protocol metadata.

#### Assessment and hardening

- [Greenbone Community Edition](https://greenbone.github.io/docs/latest/) — Vulnerability management stack built around the OpenVAS scanner.
- [Lynis](https://cisofy.com/lynis/) — Security auditing and hardening guidance for Unix-like systems.
- [OpenSCAP](https://www.open-scap.org/) — Automated security compliance and vulnerability assessment.
- [OWASP ZAP](https://www.zaproxy.org/) — Web application security testing proxy and scanner.
- [Trivy](https://trivy.dev/) — Vulnerability and misconfiguration scanner for repositories, images, clusters, and filesystems.
- [YARA](https://virustotal.github.io/yara/) — Pattern-matching rules for identifying malware and other file content.

#### Network defense

- [Fail2ban](https://github.com/fail2ban/fail2ban) — Blocks sources that repeatedly trigger authentication and service failures.
- [nftables](https://netfilter.org/projects/nftables/) — Linux packet filtering and firewall framework.
- [OPNsense](https://opnsense.org/) — Firewall, VPN, routing, and security appliance platform.
- [WireGuard](https://www.wireguard.com/) — Modern, cross-platform VPN protocol and implementation.

### Identity, secrets, and certificates

- [Authelia](https://www.authelia.com/) — Authentication and authorization portal for reverse-proxied applications.
- [authentik](https://goauthentik.io/) — Identity provider and access-management platform.
- [cert-manager](https://cert-manager.io/) — Certificate issuance and renewal for Kubernetes.
- [FreeIPA](https://www.freeipa.org/) — Integrated Linux identity, policy, DNS, and certificate management.
- [Keycloak](https://www.keycloak.org/) — Identity and access management with SSO and federation.
- [OpenBao](https://openbao.org/) — Open-source secrets and encryption management system.
- [step-ca](https://smallstep.com/docs/step-ca/) — Private certificate authority for automated certificate workflows.
- [Vault](https://developer.hashicorp.com/vault) — Secrets management, encryption services, and dynamic credentials.

### Asset management, inventory, and CMDB

- [GLPI](https://glpi-project.org/) — IT asset management and service desk platform.
- [iTop](https://www.itophub.io/) — ITIL-oriented CMDB and IT service management.
- [OCS Inventory NG](https://ocsinventory-ng.org/) — Hardware and software inventory using endpoint agents.
- [Ralph](https://github.com/allegro/ralph) — Data-center infrastructure and asset lifecycle management.
- [Snipe-IT](https://snipeitapp.com/) — Web-based IT asset and license management.

### Service desk and ITSM

- [FreeScout](https://freescout.net/) — Lightweight shared inbox and help desk.
- [osTicket](https://osticket.com/) — Mature, extensible support ticket system.
- [OTOBO](https://doc.otobo.org/) — ITSM and customer-service ticketing platform derived from OTRS.
- [Zammad](https://zammad.org/) — Web-based help desk with multi-channel ticket intake.

### Remote support and access

- [Apache Guacamole](https://guacamole.apache.org/) — Clientless browser gateway for RDP, VNC, and SSH.
- [MeshCentral](https://meshcentral.com/) — Web-based remote computer management.
- [Remmina](https://remmina.org/) — Linux remote-desktop client supporting multiple protocols.
- [RustDesk](https://rustdesk.com/) — Cross-platform remote desktop with self-hosted server options.

### Backup, recovery, and storage

- [Bareos](https://www.bareos.com/) — Network backup system for heterogeneous environments.
- [BorgBackup](https://www.borgbackup.org/) — Deduplicating, compressing, and optionally encrypted backups.
- [Ceph](https://ceph.io/) — Distributed block, object, and file storage.
- [Kopia](https://kopia.io/) — Encrypted, deduplicated snapshots with CLI and GUI clients.
- [MinIO](https://min.io/) — S3-compatible object storage.
- [Proxmox Backup Server](https://www.proxmox.com/en/products/proxmox-backup-server/overview) — Deduplicated backup for Proxmox virtual machines, containers, and hosts.
- [Rclone](https://rclone.org/) — File synchronization and transfer across cloud and network storage providers.
- [restic](https://restic.net/) — Fast, encrypted, deduplicated backups to local and cloud storage.
- [Syncthing](https://syncthing.net/) — Continuous peer-to-peer file synchronization.
- [TrueNAS](https://www.truenas.com/) — ZFS-based network storage platform.
- [UrBackup](https://www.urbackup.org/) — Centralized file and image backup for endpoint fleets.

### Communications and collaboration

#### Real-time communications and telephony

- [Asterisk](https://www.asterisk.org/) — PBX and communications toolkit for voice and video applications.
- [BigBlueButton](https://bigbluebutton.org/) — Virtual classroom and web-conferencing platform.
- [coturn](https://github.com/coturn/coturn) — TURN and STUN server for NAT traversal.
- [FreeSWITCH](https://signalwire.com/freeswitch) — Software-defined telecom stack for voice, video, and messaging.
- [Jitsi Meet](https://jitsi.org/jitsi-meet/) — Secure video-conferencing platform.
- [Kamailio](https://www.kamailio.org/) — High-performance SIP server for large real-time communications systems.
- [Matrix](https://matrix.org/) — Open protocol for decentralized secure communications.
- [OpenSIPS](https://www.opensips.org/) — Multi-purpose SIP server for carrier and enterprise communications.

#### Messaging, files, and email

- [Element](https://element.io/) — Matrix collaboration client with self-hosted options.
- [mailcow](https://mailcow.email/) — Docker-based email groupware suite.
- [Mattermost](https://mattermost.com/) — Self-hosted collaboration and messaging platform.
- [Nextcloud](https://nextcloud.com/) — File synchronization, sharing, groupware, and collaboration platform.
- [Rocket.Chat](https://www.rocket.chat/) — Team messaging and omnichannel communications platform.
- [Seafile](https://www.seafile.com/) — File synchronization and sharing platform.

### Documentation and diagrams

- [BookStack](https://www.bookstackapp.com/) — Wiki organized as shelves, books, chapters, and pages.
- [diagrams.net](https://www.diagrams.net/) — Browser and desktop diagram editor formerly known as draw.io.
- [Docusaurus](https://docusaurus.io/) — Documentation website generator built around Markdown and React.
- [Excalidraw](https://excalidraw.com/) — Collaborative whiteboard and sketch-style diagram tool.
- [MkDocs](https://www.mkdocs.org/) — Static documentation generator using Markdown.
- [NetBox Topology Views](https://github.com/netbox-community/netbox-topology-views) — Topology visualization plugin for NetBox.
- [Wiki.js](https://js.wiki/) — Modern, extensible wiki platform.

### Testing and troubleshooting

- [dig](https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility) — DNS lookup and troubleshooting utility distributed with BIND.
- [iperf3](https://software.es.net/iperf/) — Active network throughput measurement.
- [mtr](https://www.bitwizard.nl/mtr/) — Combines traceroute and ping for path diagnostics.
- [Nmap](https://github.com/nmap/nmap) — Host discovery, port scanning, and service identification.
- [OpenSpeedTest](https://openspeedtest.com/selfhosted-speedtest) — Self-hosted browser-based network speed test.
- [Packet Sender](https://packetsender.com/) — GUI and CLI tool for sending and receiving TCP, UDP, SSL, and HTTP traffic.
- [SmokePing](https://oss.oetiker.ch/smokeping/) — Long-term latency measurement and visualization.
- [Wireshark](https://www.wireshark.org/) — Interactive packet capture and protocol analysis.

### Learning and labs

- [Cisco Modeling Labs](https://developer.cisco.com/modeling-labs/) — Official Cisco network simulation platform.
- [EVE-NG Community](https://www.eve-ng.net/index.php/community/) — Multi-vendor network emulation environment.
- [GNS3](https://www.gns3.com/) — Graphical network software emulator.
- [OverTheWire](https://overthewire.org/wargames/) — Security and Unix learning through practical wargames.
- [Proxmox VE Documentation](https://pve.proxmox.com/pve-docs/) — Administration guides for virtualization, clustering, storage, and networking.
- [SadServers](https://sadservers.com/) — Hands-on Linux troubleshooting scenarios.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md)
before opening a pull request.

Keep entries concise, link to the official project, and explain what makes the
tool useful. Comparison changes should be supported by current first-party
documentation.

## License

To the extent possible under law, this work is dedicated to the public domain
under [CC0 1.0 Universal](LICENSE).
