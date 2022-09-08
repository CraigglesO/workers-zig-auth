# Workers Zig Authentication

A [**WASI**](https://wasi.dev/) + [**Zig**](https://ziglang.org/) + [**Argon2**](https://en.wikipedia.org/wiki/Argon2) solution to password security.

[Argon2](https://www.argon2.com/) is a key derivation function that was selected as the winner of the 2015 Password Hashing Competition

Due to the liberties given to us via `unbound`, I recommend setting the [t parameter to 1000+ for maximum safety](https://github.com/CraigglesO/workers-zig-auth/blob/master/auth/lib/handlers/argon.zig#L18). I found results are still close to instantaneous

**The long term goal**: When Cloudflare supports dynamic imports, this template will be replaced as a library to quickly hash and verify password. Until then, this template uses zig inside a service worker to not bloat the main api.

## Getting Started

## Install

```bash
# in one go
git clone --recurse-submodules -j8 git@github.com:CraigglesO/workers-zig-auth.git
```

### API:

Read below and get started with AUTH first before trying to test the API code locally.

### AUTH:

Read the setup instructions [here](https://github.com/CraigglesO/workers-zig-auth/tree/master/auth).
