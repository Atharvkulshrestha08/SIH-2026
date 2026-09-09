#!/usr/bin/env python3
"""Extract a clip into a WebP frame sequence + manifest for the Next app.

  python3 tools/extract.py <clip.mp4> <out_dir> [--fps 12] [--width 1280] [--reverse]
"""

import json
import os
import subprocess
import sys

from PIL import Image


def main():
    clip, out_dir = sys.argv[1], sys.argv[2]
    fps = int(sys.argv[sys.argv.index("--fps") + 1]) if "--fps" in sys.argv else 12
    width = int(sys.argv[sys.argv.index("--width") + 1]) if "--width" in sys.argv else 1280
    reverse = "--reverse" in sys.argv

    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(out_dir):
        if f.endswith((".png", ".webp")):
            os.remove(os.path.join(out_dir, f))

    vf = f"fps={fps},scale={width}:-2" + (",reverse" if reverse else "")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", clip, "-vf", vf,
                    os.path.join(out_dir, "frame_%03d.png")], check=True)

    pngs = sorted(f for f in os.listdir(out_dir) if f.endswith(".png"))
    for f in pngs:
        p = os.path.join(out_dir, f)
        Image.open(p).save(p.replace(".png", ".webp"), "WEBP", quality=80)
        os.remove(p)

    name = os.path.basename(out_dir.rstrip("/"))
    manifest = {"count": len(pngs), "pattern": f"frames/{name}/frame_%03d.webp"}
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f)
    size = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir)) / 1e6
    print(f"{name}: {len(pngs)} frames, {size:.1f} MB")


if __name__ == "__main__":
    main()
