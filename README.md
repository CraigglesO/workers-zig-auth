# Workers Zig Authentication

A [**WASI**](https://wasi.dev/) + [**Zig**](https://ziglang.org/) + [**Argon2**](https://en.wikipedia.org/wiki/Argon2) solution to password security.

[Argon2](https://www.argon2.com/) is a key derivation function that was selected as the winner of the 2015 Password Hashing Competition. You can read more about the specification of argon2 [here](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf).

Due to the liberties given to us via `unbound`, I recommend [raising the t parameter (iterations) for maximum safety](https://github.com/CraigglesO/workers-zig-auth/blob/master/auth/lib/handlers/argon.zig#L18). Because the worker is limted to a single thread and at most 64MB raising t is the best way to increase security. I found results are still fast even at `1_000`. Also be sure to [update the salt](https://github.com/CraigglesO/workers-zig-auth/blob/master/auth/lib/handlers/argon.zig#L7).

Here is a benchmark to better understand time cost ([script used](https://gist.github.com/Indigo744/e92356282eb808b94d08d9cc6e37884c)):

```
m_cost (MB) |  1  |  2  |  4  |  8  | 16  | 32  | 64  | 128 | 256
            =====================================================
t_cost=1    |  1  |  2  |  5  | 10  | 24  | 46  | 90  | 188 | 348
t_cost=2    |  2  |  4  |  8  | 18  | 39  | 75  | 145 | 295 | 636
t_cost=3    |  3  |  6  | 12  | 26  | 53  | 102 | 209 | 473 | 926
t_cost=4    |  5  |  9  | 30  | 56  | 78  | 147 | 309 | 567 |1233
t_cost=5    |  4  |  9  | 19  | 40  | 79  | 165 | 359 | 690 |1372
t_cost=6    |  5  | 12  | 23  | 49  | 93  | 198 | 399 | 781 |1777
t_cost=7    |  6  | 14  | 29  | 53  | 118 | 259 | 508 |1036 |2206
t_cost=8    |  8  | 16  | 33  | 82  | 179 | 294 | 528 |1185 |2344
```

On linux you can generate a string of randomness like so:
```bash
head -3 /dev/urandom | tr -cd '[:alnum:]' | cut -c -64
```

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
