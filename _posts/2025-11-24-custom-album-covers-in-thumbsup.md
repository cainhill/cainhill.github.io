---
layout: post
title: Custom video thumbnails in Thumbsup
tags: [ off-topic ]
---

I've been using Thumbsup gallery maker to share our family photos and videos on our local network. It's a great tool for creating static galleries, but I recently ran into a limitation that needed some creative problem-solving.

## Custom thumbnails

While Thumbsup works wonderfully for photos, I wanted more control over how my videos appeared in the gallery. Specifically, I wanted to set custom thumbnails for videos rather than relying on automatically generated ones.

Unfortunately, Thumbsup supports two options for video thumbnails: capturing a still from a specific frame position or grabbing one from the middle of the video. However, I wanted to set a specific thumbnail.

## The approach

After some experimentation, I made a shell script that uses Thumbsup's existing functionality in a creative way. Here's how it works:

**Prepare custom thumbnails**

First, I create custom thumbnail images as JPG files and save them in the same location as their corresponding video files.
```
IMG_365.jpg
IMG_365.mp4
```

**Script marks the thumbnails**

Next, I used a shell script to add a suffix **.tn.** to every JPG with a matching MP4.

**Generate thumbnails for custom images**

I run Thumbsup configured to process only these `.tn.jpg` files, outputting the results to a temporary location. This creates properly formatted thumbnails from my custom images.

**Generate the main gallery**

Next, I run Thumbsup again, this time excluding the `.tn.jpg` files so they don't appear as separate items in the gallery. This generates the full gallery with all photos and videos.

**Rename the temporary files**

Before copying the files over, I process all the thumbnail files in the temporary location to remove the `.tn.` portion from their filenames. This ensures they match the naming convention that Thumbsup expects for video thumbnails.

**Merge the results**

Finally, I copy the renamed custom thumbnail files from the temporary location into the newly generated gallery folder, overwriting the auto-generated video thumbnails.

## Result

The end result is exactly what I wanted, a beautiful family photo gallery where videos display with the custom thumbnails I've chosen.

While this workaround requires a bit of scripting knowledge, it's a practical solution that extends Thumbsup's capabilities without needing to modify the tool itself. If you're facing a similar need, this approach might be just what you need.