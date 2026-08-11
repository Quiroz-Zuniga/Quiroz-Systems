# Supply Chain Security Policy
Version: 1.0
Status: Mandatory
Priority: Critical

---

# Purpose

This policy protects the project against software supply chain attacks, compromised npm packages,
malicious installation scripts, credential theft, dependency confusion, and unauthorized dependency changes.

These rules apply to:

- Human developers
- AI Agents
- OpenCode
- Antigravity
- Codex
- Claude Code
- Cursor
- GitHub Copilot
- CI/CD Pipelines

Compliance is mandatory.

---

# Core Principles

1. Security is more important than convenience.
2. Never trust third-party packages by default.
3. Every dependency increases the attack surface.
4. Every dependency change must be intentional.
5. If something looks suspicious, stop immediately.

---

# Rule 1 — Never Install Dependencies Automatically

Agents MUST NEVER execute:

```bash
npm install
npm update
npm audit fix --force
pnpm add
pnpm update
yarn add
yarn upgrade
bun add
bun update
```

without explicit user approval.

Installing dependencies is considered a security-sensitive operation.

---

# Rule 2 — New Dependencies Require Justification

Before suggesting a dependency, the agent must explain:

- Why it is needed.
- Whether it is actively maintained.
- Whether a native solution exists.
- Possible alternatives.
- Security considerations.

No dependency should be added simply because it is convenient.

---

# Rule 3 — Inspect package.json

Before installing anything, inspect:

```json
scripts
dependencies
devDependencies
optionalDependencies
peerDependencies
```

Pay special attention to:

```
preinstall
postinstall
prepare
install
prepublish
postpublish
```

These scripts are common malware entry points.

---

# Rule 4 — Detect Dangerous Installation Scripts

If any of these files exist:

```
setup.js
setup.mjs
install.js
bootstrap.js
prepare.js
postinstall.js
```

the agent MUST stop and request human review.

Do NOT execute them automatically.

---

# Rule 5 — Dangerous Commands

If installation scripts execute:

```
curl
wget
powershell
Invoke-WebRequest
bash
sh
cmd.exe
child_process.exec
execSync
spawn
fork
```

the agent must immediately stop and warn the developer.

---

# Rule 6 — Install Without Scripts

If dependency installation is approved, prefer:

```bash
npm install --ignore-scripts
```

or

```bash
pnpm install --ignore-scripts
```

Installation scripts should only run after manual review.

---

# Rule 7 — Lockfiles Are Mandatory

One lockfile must always exist.

Accepted:

```
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lockb
```

Agents must never delete or regenerate lockfiles without informing the user.

---

# Rule 8 — Prefer Fixed Versions

Avoid:

```json
"express": "^5.0.0"
```

Prefer:

```json
"express": "5.0.0"
```

Pinned versions improve reproducibility and reduce unexpected supply chain risks.

---

# Rule 9 — Review Package Reputation

Before recommending a package, verify:

- Active maintenance
- Trusted maintainers
- Official repository
- Download history
- Recent ownership transfers
- Security advisories
- Community reputation

Recently transferred packages deserve extra scrutiny.

---

# Rule 10 — Protect Secrets

Never commit:

```
.env
.env.local
.env.production

*.pem
*.key
id_rsa
id_ed25519

AWS Keys
Cloudflare Tokens
GitHub PAT
JWT Secrets
Database Passwords
API Keys
```

Agents must refuse to expose secrets.

---

# Rule 11 — Credential Rotation

If malicious code may have executed:

Immediately rotate:

- GitHub Personal Access Tokens
- SSH Keys
- Cloudflare Tokens
- AWS Credentials
- Database Passwords
- JWT Secrets
- Vercel Tokens
- Supabase Keys
- Upstash Tokens
- Third-party API Keys

Never assume credentials remain safe.

---

# Rule 12 — Dependency Updates

Dependency updates must:

- Be reviewed.
- Explain breaking changes.
- Explain security impact.
- Preserve lockfile consistency.
- Be performed in isolated commits.

---

# Rule 13 — Git Protection

Agents must never:

- Force push to protected branches.
- Disable branch protection.
- Rewrite published history.
- Modify GitHub security settings.

---

# Rule 14 — CI/CD Security

Pipelines should include:

- npm audit
- Secret scanning
- Dependency review
- SAST
- License checks

Pipeline failures must block production deployment.

---

# Rule 15 — Malware Indicators

Immediately stop if you detect:

Unexpected:

- setup.mjs
- install.js
- obfuscated JavaScript
- Base64 payloads
- eval()
- Function()
- child_process
- network downloads
- credential access
- Git credential reading
- SSH directory access
- ~/.aws access
- ~/.ssh access

These are high-risk indicators.

---

# Rule 16 — Pull Request Review

Dependency changes require review.

Review:

- package.json
- package-lock.json
- pnpm-lock.yaml
- yarn.lock
- bun.lockb

Unexpected changes must be investigated.

---

# Rule 17 — Principle of Least Privilege

Dependencies should only receive the permissions they actually require.

Avoid unnecessary:

- File system access
- Network access
- Process execution
- Environment variable access

---

# Rule 18 — Incident Response

If compromise is suspected:

1. Stop development.
2. Disconnect affected systems if necessary.
3. Preserve evidence.
4. Rotate credentials.
5. Remove malicious packages.
6. Audit recent commits.
7. Review CI/CD logs.
8. Notify collaborators.
9. Restore from trusted versions.
10. Resume only after validation.

---

# Agent Behavior

AI Agents MUST:

✅ Explain security risks.

✅ Refuse dangerous automatic installations.

✅ Ask before modifying dependencies.

✅ Report suspicious scripts.

✅ Prefer official packages.

✅ Preserve reproducible builds.

✅ Protect project secrets.

---

# Security Philosophy

Every dependency is executable code written by someone else.

Treat every package as untrusted until proven otherwise.

Convenience never outweighs security.