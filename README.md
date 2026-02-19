# ChickenLand

A 2D platformer game built entirely in a single HTML file using HTML5 Canvas and Web Audio API. No external dependencies, assets, or build tools required.

## How to Play

### Run with Docker (recommended)

```
docker compose up -d
```

Then visit `http://localhost:3000`.

### Run with Node.js

```
node server.js
```

Then visit `http://localhost:3000`.

### Run without a server

Open `index.html` directly in any modern browser. The game works fully offline, but the shared leaderboard requires the server.

### Controls

| Key | Action |
|-----|--------|
| **W** / **D** / **Right Arrow** | Move forward (right) |
| **A** / **Left Arrow** | Move left |
| **S** / **Down Arrow** | Move back (left) |
| **Space** / **Up Arrow** | Jump |

### Objective

You're a chicken who escaped the pen. Navigate through 5 levels of obstacles to find your way back home. Reach the glowing chicken coop at the end of each level to advance.

### Pickups

- **Bugs** — Eat them to restore 1 heart (5 hearts max)
- **Super Egg** — Glowing golden egg that grants 5 seconds of invincibility. While active, you can destroy wolves by touching them

### Obstacles

- **Wolves** — Patrol platforms and deal damage on contact
- **Pits** — Gaps in the ground that kill instantly
- **Thorn Bushes** — Prickly plants that deal damage on contact

## Levels

| # | Name | Theme | Music Style |
|---|------|-------|-------------|
| 1 | The Farmyard | Blue sky, daytime | Cheerful chiptune |
| 2 | Wolf Woods | Night sky, moon & stars | Slow, creepy minor key |
| 3 | The Great Escape | Sunset | Epic rock with drums & guitar |
| 4 | Autumn Hollow | Fall colors | Lo-fi hip-hop |
| 5 | Frozen Peak | Winter, snow & ice | Dubstep with wobble bass |

## Features

- Pixel art drawn entirely with code (no image files)
- Scrolling camera with parallax backgrounds
- 5 unique chiptune soundtracks generated with Web Audio API
- Synthesized sound effects (jump, hurt, death, eat, power-up, wolf destroy)
- Screen shake, particle effects, and invincibility flash
- Wolves with physics, wall collision, edge detection, and stuck-jump AI
- Beat the game to unlock a cape for the chicken on replay
- Speedrun timer and global top-5 leaderboard

## Tech

Everything runs in a single `index.html` — vanilla JavaScript, Canvas 2D rendering, and Web Audio API oscillators/filters for all audio. Zero dependencies.

The server (`server.js`) is a lightweight Node.js HTTP server with no npm dependencies. It serves the game and provides a REST API for the shared leaderboard, storing scores in `leaderboard.json`.
