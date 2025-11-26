---
layout: post
title: Custom album covers in Thumbsup
tags: [ off-topic ]
---

In my previous post, I shared how I solved the custom video thumbnail challenge in Thumbsup gallery maker. Today, I'm tackling another customisation need, album covers.

## Challenge

Thumbsup uses a concept of virtual albums to organise and generate its gallery structure. It's a powerful feature that makes browsing large photo collections much more manageable. However, my particular use case required something beyond the default behaviour, custom album covers.

By default, Thumbsup automatically selects the first photo in each album as its cover image. This is a sensible default that works well for most scenarios. However, for my family photo gallery, I wanted to handpick cover images that best represent each album's content, which is a feature that isn't currently supported.

## Approach

This folder structure and steps below describe the approach I used to apply custom album covers whilst still benefiting from Thumbsup's excellent gallery generation.

---

**My folder structure**
```
.
├── memories/
│   └── 2025-04 Japan/
│       ├── PXL_20250525_032613400.jpg
│       └── PXL_20250525_032614456.jpg
└── .thumbsup/
    ├── thumbsup-run.sh <-- (Step 3) Update main script to copy src/custom-covers/ to website/custom-covers/ every build
    ├── src/
    │   ├── custom-theme/
    │   │   └── album.hbs <-- (Step 4) Update JavaScript so gallery checks website/custom-covers/ for matching cover
    │   └── custom-covers/
    │       └── 2025-04-Japan.jpg <-- (Step 2) Create cover with name that matches the generated HTML page name
    └── website/
        └── 2025-04-Japan.html <-- (Step 1) Run thumbsup as normal to output album pages under 'website' directory
```

---

**Step 1: Run thumbsup as normal to output album pages under 'website' directory**

First, I run the Thumbsup normally to generate the complete gallery. My setup scans the `memories/` directory and builds into `.thumbsup/website/` directory. In the example, `2025-04-Japan.html` is generated.

---

**Step 2: Create cover with name that matches the generated HTML page name**

For each album I want to customise, I create a corresponding cover image in a `src/custom-covers/` directory. The key is matching the filename exactly. For example, if my album file is `2025-04-Japan.html`, I create `src/custom-covers/2025-04-Japan.jpg`.

---

**Step 3: Update main script to copy 'src/custom-covers/' to 'website/custom-covers/' every build**

Next, I need to make sure the custom covers are available for the HTML pages output to the `website` directory. So I update my gallery build script to automatically copy all files from `src/custom-covers/` to `website/custom-cover/` in the generated output directory.
```sh
# Copy src/custom-covers/ over website/media/custom-covers folder
cp -r src/custom-covers website/media
```

---

**Step 4: Update JavaScript so gallery checks website/custom-covers/ for matching cover**

In my own setup, I'm using a custom theme based on "flow" by Thumbsup. This means I can add the following code to the `src/custom-theme/album.hbs` file, which attempts to replace each album's default cover image with a custom one, but only if a custom cover image exists in the `website/media/custom-covers/` directory with the same base name as the base name of the linked album HTML file.

```js
document.querySelectorAll('a[href$=".html"] img').forEach(img => {
  const a = img.closest("a");
  const name = a.href.split('/').pop().replace('.html', '');
  const url = `media/custom-covers/${name}.jpg`;
  const t = new Image();
  t.onload = () => img.src = url;
  t.src = url;
});
```

---

## Result

Now my gallery displays albums with carefully chosen cover images that truly represent what's inside.

This approach remains lightweight, while giving me the customisation I need. The JavaScript enhancement gracefully handles both customised and non-customised albums, so I can selectively apply custom covers only where they matter most.

Between custom video thumbnails and custom album covers, my family photo gallery now feels truly personalised whilst still benefiting from Thumbsup's excellent static gallery generation capabilities.
