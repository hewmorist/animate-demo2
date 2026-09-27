# Planet Mandelbrot — player2

This branch runs the tested ahead-of-time browser frame cache by default, with the SoundCloud player, Play/Pause button, and timeline scrubber. The animation recipe is embedded in `index.html` and also available as `mandelbrot-demo.json`. The visible revision is `player2 r1`.

A background worker calculates 105 detailed RGBA frames for the turn and most of the ascent (about 1:58–3:30). They occupy roughly 61 MiB in browser memory and are discarded on reload; they are not downloaded as image or video files. Playback uses the live renderer until the cached frames are ready and outside the cached interval.

The public track is [Planet Mandelbrot](https://soundcloud.com/hewmorist/mandelbrot-techno). The nominal 4:21 recipe timeline is scaled to the duration reported by SoundCloud.

Pages can be set to deploy this `player2` branch from `/ (root)`. The revision on the page distinguishes it from previous deployments.
