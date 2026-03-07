---
layout: post
title: Setting photo screensaver
tags: [ off-topic ]
---

My next step on my home photos journey has been to set up our best photos to show on our family TV using xautolock, immich-kiosk, and immich.

I followed these steps:

1. [Install immich-kiosk on home server](https://docs.immichkiosk.app/installation/)
2. Update the [home server environment variable](https://docs.immichkiosk.app/installation/#when-using-environment-variables) to point immich-kiosk to our favourited photos in our immich library
3. Install xautolock on the TV computer
```sudo apt install xautolock```
4. Create a wrapper script at `~/.projects/immich-screensaver/immich-screensaver.sh`
```
#!/bin/bash
sed -i ''s/"exit_type":"Crashed"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
chromium --kiosk --noerrdialogs --disable-infobars http://192.168.0.102:3900
```
5. Give execute permission
```
chmod +x ~/.project/immich-screensaver/immich-screensaver.sh
```
6. Edit `~/.xscreensaver` to add this script as a custom screensaver program
7. Enable xscreensaver to run at startup via using autostart settings on Linux Mint