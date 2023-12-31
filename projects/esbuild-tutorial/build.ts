import esbuild, { PluginBuild } from "esbuild";
import raw from "esbuild-plugin-raw2";
import worker from "esbuild-plugin-webworker";

const plugins = [
  {
    name: "log-rebuild",
    setup(build: PluginBuild) {
      build.onEnd(() => console.log("built finished!"));
    },
  },
  raw({
    filter: /\.(txt|glsl|fs)$/i,
  }),
  worker({
    inline: true,
    filter: /\?worker$/,
  }),
];

esbuild
  .context({
    entryPoints: ["./index.ts"],
    outfile: "./dist/out.js",
    bundle: true,
    sourcemap: true,
    format: "esm",
    platform: "browser",
    plugins,
    target: ["chrome100"],
    define: {
      __ESM__: `true`,
    },
  })
  .then((ctx) => ctx.watch());
