---
layout: post
title: Sensible backups for Kdenline video editing
tags: [ off-topic ]
---

I've been learning about video editing on Linux recently, with a special focus on [Kdenlive](https://kdenlive.org/). Despite being the leading open-source video editor for Linux, there are many reports of unexpected crashes.

Thankfully, I'm yet to experience anything like that, but it prompted me to make this script I can run every time I start a video editing session. Every 10 minutes, it saves any .kdenlive file in the current folder into a subfolder named **backups**.

Kdenlive will save to **~/.local/share/kdenlive/backups/** by itself, but I want my backups saved to my hard drive alongside the project file for portability.

```
#!/bin/bash

DEST="backups"

mkdir -p "$DEST"

while true; do
    STAMP=$(date +"%Y-%m-%d_%H-%M-%S")

    for f in *.kdenlive; do
        [ -e "$f" ] || continue
        cp "$f" "$DEST/${f%.kdenlive}_$STAMP.kdenlive"
    done

    sleep 600
done
```