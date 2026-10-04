# Planet Mandelbrot — High definition

Release 1, based on showcase/planet-gpu-calc r8.
Fixed GPU calculation and High definition graphics. Play/pause, timeline
and frame-preparation progress remain; comparison switches are removed.
URL options cannot enable CPU calculation or change graphics quality.

Requires a browser supporting WebGL2 in an OffscreenCanvas worker.
Audio uses SoundCloud. User iPhone preparation: about 7 seconds before
playback, or 10 seconds when started immediately, with mild initial
choppiness. Numerical differences from the original remain a known limit.

Only browser runtime assets are included, plus deployment configuration
and ai-context. No Rust source, Wasm, CPU calculator, benchmark or offline
generator. JavaScript and GLSL are required browser runtime assets.

Hosting: serve the repository root for GitHub Pages, or run
`node stage.cjs` and serve `public/` for Cloudflare Pages.
Cloudflare branch: hi-def-planet. Build: node stage.cjs.
For Workers: deploy with `npx wrangler deploy`; Worker name animate-demo2
in wrangler.toml. Select the intended Worker project/name when configuring.
