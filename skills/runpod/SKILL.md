# RunPod Pod Control

Use this skill to check, start, or stop GPU pods on RunPod.

## When to use
- User asks to start/stop/check a RunPod pod
- User wants to generate video/images using a model hosted on RunPod

## Requirements
- RUNPOD_API_KEY must be set in the environment

## Usage
node /home/openclaw/clawd/skills/runpod/runpod-client.js list
node /home/openclaw/clawd/skills/runpod/runpod-client.js start <podId>
node /home/openclaw/clawd/skills/runpod/runpod-client.js stop <podId>
