const std = @import("std");
const Builder = std.build.Builder;

pub fn build(b: *Builder) void {
    // Standard target options allows the person running `zig build` to choose
    // what target to build for. Here we do not override the defaults, which
    // means any target is allowed, and the default is native. Other options
    // for restricting supported target set are available.
    // const target = b.standardTargetOptions(.{});

    // Standard release options allow the person running `zig build` to select
    // between Debug, ReleaseSafe, ReleaseFast, and ReleaseSmall.
    b.is_release = true;
    // const mode = b.standardReleaseOptions();
    b.cache_root = "cache";
    b.global_cache_root = "cache";
    b.use_stage1 = true;

    // const wasm_build = b.addSharedLibrary("zigWASM", "lib/main.zig", .unversioned);
    // wasm_build.setTarget(std.zig.CrossTarget {
    //     .cpu_arch = .wasm32,
    //     .os_tag = .freestanding,
    // });
    // wasm_build.build_mode = std.builtin.Mode.ReleaseSmall;
    // wasm_build.strip = true;
    // wasm_build.linkage = std.build.LibExeObjStep.Linkage.dynamic;
    // wasm_build.addPackagePath("workers-zig", "workers-zig/lib/main.zig");
    // wasm_build.install();

    // ! UNCOMMENT IF USING WASI
    const wasm_build = b.addSharedLibrary("zigWASI", "lib/wasi.zig", .unversioned);
    wasm_build.setTarget(std.zig.CrossTarget {
        .cpu_arch = .wasm32,
        .os_tag = .wasi,
    });
    wasm_build.build_mode = std.builtin.Mode.ReleaseSmall;
    wasm_build.strip = true;
    wasm_build.linkage = std.build.LibExeObjStep.Linkage.dynamic;
    wasm_build.install();
}
