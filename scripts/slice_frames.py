import os
import cv2
import json
import numpy as np
from PIL import Image

def build_frames():
    video_path = "Laptop_drops_and_opens_1080p_202609072248.mp4"
    gpu_img_path = "GPU_processing_data_visualization_2K_202609072255.jpeg"
    out_dir = os.path.join("frontend", "public", "frames", "laptop")
    os.makedirs(out_dir, exist_ok=True)

    target_w, target_h = 1280, 720
    target_count = 90
    video_frames_count = 72
    blend_frames_count = 18

    # 1. Read video
    cap = cv2.VideoCapture(video_path)
    total_v_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video total frames: {total_v_frames}")

    # Sample video frame indices
    sample_indices = np.linspace(0, total_v_frames - 1, video_frames_count, dtype=int)
    extracted_video_frames = []

    current_idx = 0
    sampled_set = set(sample_indices)
    max_idx = max(sample_indices)

    frame_dict = {}
    while current_idx <= max_idx:
        ret, frame = cap.read()
        if not ret:
            break
        if current_idx in sampled_set:
            resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)
            # Convert BGR to RGB
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            frame_dict[current_idx] = rgb
        current_idx += 1
    cap.release()

    for idx in sample_indices:
        if idx in frame_dict:
            extracted_video_frames.append(frame_dict[idx])
        elif len(extracted_video_frames) > 0:
            extracted_video_frames.append(extracted_video_frames[-1])

    print(f"Extracted {len(extracted_video_frames)} frames from video.")

    # 2. Read GPU image
    gpu_bgr = cv2.imread(gpu_img_path)
    gpu_rgb = cv2.cvtColor(gpu_bgr, cv2.COLOR_BGR2RGB)
    gpu_resized = cv2.resize(gpu_rgb, (target_w, target_h), interpolation=cv2.INTER_AREA)

    # 3. Last frame of video for blending
    last_v_frame = extracted_video_frames[-1].astype(np.float32)
    gpu_float = gpu_resized.astype(np.float32)

    all_frames = []
    # Add video frames (up to video_frames_count - 6)
    all_frames.extend(extracted_video_frames[:video_frames_count - 6])

    # Crossfade into GPU image over 24 frames
    crossfade_count = target_count - len(all_frames)
    for i in range(crossfade_count):
        alpha = (i + 1) / float(crossfade_count)
        # Ease in-out
        t = 0.5 * (1 - np.cos(alpha * np.pi))
        blended = (1.0 - t) * last_v_frame + t * gpu_float
        all_frames.append(np.clip(blended, 0, 255).astype(np.uint8))

    print(f"Total compiled frames: {len(all_frames)}")

    # 4. Save frames as WebP
    for idx, frame_arr in enumerate(all_frames):
        filename = f"frame_{idx + 1:03d}.webp"
        filepath = os.path.join(out_dir, filename)
        img = Image.fromarray(frame_arr)
        img.save(filepath, "WEBP", quality=82, method=4)

    # 5. Write manifest
    manifest = {
        "name": "laptop-reveal-sequence",
        "count": len(all_frames),
        "pattern": "/frames/laptop/frame_%03d.webp",
        "width": target_w,
        "height": target_h
    }
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"Manifest written with {len(all_frames)} frames.")

if __name__ == "__main__":
    build_frames()
