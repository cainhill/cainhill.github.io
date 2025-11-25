---
layout: post
title: Custom album covers in Thumbsup
tags: [ off-topic ]
---

In my previous post, I shared how I solved the custom video thumbnail challenge in Thumbsup gallery maker. Today, I'm tackling another customisation need, album covers.

## The challenge

Thumbsup uses a concept of virtual albums to organise and generate its gallery structure. It's a powerful feature that makes browsing large photo collections much more manageable. However, my particular use case required something beyond the default behaviour, custom album covers.

By default, Thumbsup automatically selects the first photo in each album as its cover image. This is a sensible default that works well for most scenarios. However, for my family photo gallery, I wanted the ability to handpick cover images that best represent each album's content, which is a feature that isn't currently supported out of the box.

## Solution

Rather than accepting the default behaviour, I developed a workaround that gives me complete control over album covers whilst still leveraging Thumbsup's excellent gallery generation. Here's my approach:

**Generate the gallery**

First, I run Thumbsup normally to generate the complete gallery with all its default settings.

**Identify album filenames**

In the generated output, I browse to find the albums I want to customise. Each album has a corresponding HTML file, such as `Favourites.html`, `Summer_Vacation.html`. I make note of these filenames.

**Create custom cover images**

For each album I want to customise, I create a corresponding cover image in a `src/custom-covers/` directory. The key is matching the filename exactly. For example, if my album file is `Favourites.html`, I create `src/custom-covers/Favourites.jpg`.

**Copy custom covers to output**

I update my gallery build script to automatically copy all files from `src/custom-covers/` to `website/custom-cover/` in the generated output directory. This ensures my custom cover images are available in the final gallery.

**Add JavaScrcript to swap covers**

Finally, I add some JavaScript code to the gallery that runs when albums are displayed. The script attempts to replace each album's default cover image with a custom one if it exists. It checks whether a matching custom cover is available and uses it, otherwise, it falls back to Thumbsup's default album cover selection.

## Result

Now my gallery displays albums with carefully chosen cover images that truly represent what's inside. Whether it's the perfect candid shot from a holiday or a beautifully composed family portrait, each album now makes the right first impression.

This approach maintains compatibility with Thumbsup's updates whilst giving me the customisation I need. The JavaScript enhancement gracefully handles both customised and non-customised albums, so I can selectively apply custom covers only where they matter most.

Between custom video thumbnails and custom album covers, my family photo gallery now feels truly personalised whilst still benefiting from Thumbsup's excellent static gallery generation capabilities.