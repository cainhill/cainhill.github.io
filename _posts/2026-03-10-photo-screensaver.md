---
layout: post
title: Setting 
tags: [ off-topic ]
---

My next step on my home photos journey has been to set up our best photos to show on our family TV using xscreensaver and immich-kiosk.

I followed these steps:

1. Install immich-kiosk on home server
2. Point the immich-kiosk to our favourited photos in our immich library
3. Install xscreensaver on the TV computer
```sudo apt install xscreensaver```
4. Create a wrapper script at `~/immich-screensaver.sh`
```#!/bin/bash
chromium-browser --kiosk --noerrdialogs --disable-infobars http://192.168.0.102:3900
```
5. Give execute permission
```
chmod +x ~/immich-screensaver.sh
```
6. Edit `~/.xscreensaver` to add this script as a custom screensaver program
7. Enable xscreensaver to run at startup via using autostart settings on Linux Mint