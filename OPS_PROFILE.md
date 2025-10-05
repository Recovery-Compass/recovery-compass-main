# OPS_PROFILE

## SSH

- Primary GitHub SSH identity: `~/.ssh/my_new_ed25519`
- Fingerprint (SHA256): `2TB7n4C+bOneTr5SXXLPzZxeivUujr9VzyVkYZZ8EO0`
- Policy:
  - Use Keychain and agent: `UseKeychain yes`, `AddKeysToAgent yes`
  - Force intended identity for GitHub: `IdentitiesOnly yes`
  - Never prompt for passphrase interactively; load from Keychain
  - Never echo secrets

### Discovery and verification
- Discover effective SSH settings for GitHub:
  - `ssh -G github.com` (look for `identityfile ~/.ssh/my_new_ed25519` and `identitiesonly yes`)
- Verify key is loaded in the agent:
  - `ssh-add -l -E sha256` (should include the fingerprint above)
- Load the key from Keychain if the agent is empty:
  - `ssh-add --apple-use-keychain ~/.ssh/my_new_ed25519`

### Expected test
- `ssh -T git@github.com` → `Hi <USERNAME>! You've successfully authenticated, but GitHub does not provide shell access.`
