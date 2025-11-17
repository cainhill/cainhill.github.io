---
layout: post
title: Generating photo galleries more easily using a thumbsup AppImage
tags: [ appimage, linux ]
type: technique
---

For people wanting to generate photo galleries that can be viewed in a web browser, I wholeheartedly recommend the [thumbsup](https://github.com/thumbsup/thumbsup) tool. The following post explains how I packaged thumbsup into an [AppImage](https://appimage.org/) so it was more portable and easier for me to run directly from my photo hard drive without installing to the various Linux PCs in my house.

## Context

- I wanted a lightweight no-install tool for building HTML media galleries.
- ThumbsUp is perfect for this purpose, but normally requires installation using npm or Docker.
- I thought maybe I could use AppImage tech instead to build ThumbsUp as a portable app and to keep it on my external hard drives with our family memories.
- That way it would be possible to add photos to a given hard drive and then simply run a refresh script to make the HTML gallery navigable on any of our home computers.

## Version 

This build was successfully completed using the following version numbers:
- thumbsup 2.18.0
- node 18.20.8
- ffmpeg 7.0.2
- graphicsmagick 1.3.46
- pkg2appimage continuous
- appimagetool continuous

## Steps

**Creating the AppDir**

1. Because thumbsup is a command-line tool, it is best to use the instructions for manually building an AppImage (refer to the official AppImage documentation[^1] or this helpful tutorial[^2]).

2. Create an AppDir, which is essentially a standard folder to contain everything appimgtool needs to build an AppImage binary file. I stored mine in my normal projects folder.
```
mkdir ~/Projects/thumbsup-portable
```

3. The AppImage documentation defines a structure that the AppDir must follow to be considered valid for AppImage build. I used this initial structure:
```
thumbsup-portable/
thumbsup-portable/AppRun
thumbsup-portable/thumbsup-portable.desktop
thumbsup-portable/bin/
thumbsup-portable/lib/
thumbsup-portable/thumbsup-portable.png
```
4. Next, create the **thumbsup-portable.desktop** file, with this content.
```

```
5. Next, embed a copy of the following into the AppDir: nodejs, thumbsup, ffmpeg, and graphicsmagick. Starting with nodejs.

---

**Embedding the tool and dependencies into AppDir**

1. As at 2025-11-11, the thumbsup repository hints that it depends on node v18 (you can see this version listed in this file https://github.com/thumbsup/thumbsup/blob/master/.nvmrc).

2. Go to (https://nodejs.org/en/download/) and make the following selections and press **Standalone Binary (.xz)** to download:
```
Get Node.js® = v18.20.8
Or get a prebuilt Node.js® for = Linux
running a = x64
```

3. If the above doesn't work, the direct link was (https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-x64.tar.xz) when I used it.

4. Then extract the contents of the .tar.xz into the **thumbsup-portable/bin/** folder. This creats a folder called **node-v18.20.8-linux-x64**, containing folders such as **bin**, **include**, and others.

5. Rename the **node-v18.20.8-linux-x64** folder to **node** and delete the original .tar.xz file.
6. Enable execute permissions on the following files:
```
thumbsup-portable/usr/bin/node/bin/node
```

7. Now, download the thumbsup tool itself into the AppDir. Importantly, because thumbsup is a collection of files and not a single binary, I stored it in the **thumbsup-portable/usr/lib/** folder.

8. Run the following from the **thumbsup-portable/usr/** folder. Note, the **./bin** prefix ensures that the node binary just downloaded will be used, rather than any existing node package on the system.
```
./bin/node/bin/node ./bin/node/bin/npm install thumbsup --prefix=./lib/thumbsup
```

9. There should now be a **thumbsup-portable/usr/lib/thumbsup/node_modules** folder.

10. Next, add the additional dependencies to the AppDir (exiftool, ffmpeg).

11. You could compile your own exiftool binary, but it is easier to download from (https://github.com/pulsejet/exiftool-bin/releases/latest). As at 2025-11-11, version 13.30 was the latest, direct link here (https://github.com/pulsejet/exiftool-bin/releases/download/13.30/exiftool-amd64-glibc).

12. Copy **exiftool-amd64-glibc** to **thumbsup-portable/usr/bin/**, no need for a containing folder. Then rename the file to **exiftool** and enable executable permissions.

13. Next, time to focus on ffmpeg, which is needed to process videos.

14. Go to (https://johnvansickle.com/ffmpeg/), who publishes Linux binaries for ffmpeg, and download the latest **ffmpeg-release-amd64-static.tar.xz** (do not download any of the files starting with **ffmpeg-git**). As at 2025-11-11, the latest was 7.0.2 version.

15. Extract only **ffmpeg** and **ffprobe** to the **thumbsup-portable/usr/bin/** folder. And remember to delete the original .tar.xz file.

16. Now to focus on graphicsmagick.

17. Go to (https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick/) and open the page for the latest release (at 2025-11-11 it is 1.3.46).

18. Download the file named like **GraphicsMagick-1.3.46.tar.xz** file and extract it to a working folder for the next steps.

19. Unfortunately, I need to make the binaries myself from the source code just downloaded. Change directory to the working folder.

20. Then run these commands. Note, I'll need to **adjust the version number** if I want to use a newer stable release.
```
# Create a temporary folder
cd /tmp

# Download the graphicsmagick source files
wget https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick/**1.3.46**/GraphicsMagick-**1.3.46**.tar.xz/download
tar xf **GraphicsMagick-1.3.46**.tar.xz
cd GraphicsMagick-**1.3.46**.tar.xz

# Build in /tmp
cd /tmp
tar xf GraphicsMagick-**1.3.46**.tar.xz
cd GraphicsMagick-**1.3.46**
./configure --prefix=/tmp/build-graphicsmagick --disable-shared --enable-static --without-heif
make -j$(nproc)
make install

# Copy only the final gm binary to thumbsup-portable/usr/bin/
cp /tmp/build-graphicsmagick/bin/gm ~/Projects/thumbsup-portable/usr/bin/
```

21. Run this command. Note, the prefix option expects an absolute path, but the username will likely be different on your system. Double check and replace the bold with your username before running this command.

22. Importantly, the graphicsmagick configuration relies on a library libheif for processing HEIF photos, but I encountered issues with this, so I will simply disable that functionalitty for the build, which is okay because I don't actually use HEIF photos.

23. Navigate to the working folder for where I extracted the graphicsmagick source and run the following:

```
export PKG_CONFIG_PATH=/nonexistent
./configure --prefix=/tmp/build-graphicsmagick --disable-shared --enable-static --without-heif
```

24. The --disable-shared and --enable-static options will make the graphicsmagick binary more portable. And I've disabled the HEIF capabilities using the export line and adding in --with-heic=no because of an underlying issue with libheif which I did not resolve because I do not intend to process HEIC images and can live without that functionality.

25. Run the command to compile into a binary.
```
make -j$(nproc)
make install
```

26. Then remove the folders: the graphics magic folder you were working in, 

27. Safely delete this folder (the version number may be different):
```
usr/lib/GraphicsMagick-1.3.46
```

---

**Using appimage tool to build the AppImage**

32. Download the appimagetool (https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage)

33. Give it execute permissions

34. Move the downloaded appimagetool to your /usr/local/bin/ folder do it can be run from terminal
```
sudo mv appimagetool-x86_64.AppImage /usr/local/bin/appimagetool
```

## Out of scope
- **Signing**: I only intend to use this AppImage myself, but it is interesting to know that you can sign an AppImage for user confidence
- **HEIC Support**: I don't have HEIC photos in my library and I was encountering graphicsmagick build errors, so disabled HEIC support
- **Multi-System Testing**: I will only run this AppImage on my home PCs (CatchyOS and Linux Mint)

## Resources
[^1]: https://github.com/AppImage/docs.appimage.org/blob/master/source/packaging-guide/manual.rst
[^2]: https://linuxconfig.org/building-a-hello-world-appimage-on-linux
[^3]: https://github.com/AppImage/AppImageSpec/blob/master/draft.md
[^4]: http://www.graphicsmagick.org/INSTALL-unix.html
[^5]: https://appimage-builder.readthedocs.io/en/latest/advanced/troubleshooting.html
