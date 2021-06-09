<h2 align="center">Populate</h2>

<blockquote align="center"> Easy-to-use, local content driven network for designer</blockquote>

# Intro

Populate convert, optimize, rename and organise your assets. From one sources to various support.

# Install

# Use

```json
{
	"buildFont": [
		{
			"path": "properties/assets/icons",
			"output": "icons",
			"fontTypes": ["ttf"],
			"assetTypes": ["css", "html"]
		}
	],

	"font": [
		{
			"path": "properties/assets/fonts/Roboto-Regular.ttf",
			"rename": "medium",
			"output": "fonts",
			"extension": ["ttf", "woff", "woff2"]
		}
	],

	"image": [
		{
			"path": "properties/assets/images/illustration-pain-alias-module.svg",
			"extension": "png",
			"folder": "images",
			"option": [{
				"width": 700,
				"height": 448
			}]
		},
		{
			"path": "properties/assets/images/logo-brand__low.svg",
			"rename": "favicon",
			"extension": "png",
			"option": [{
				"size": 16
			}, {
				"size": 32
			}],
			"folder": "appicons"
		},
		{
			"path": "properties/assets/images/logo-brand__low.svg",
			"rename": "safari-pinned-tab",
			"extension": "svg",
			"folder": "appicons"
		}
	]
}
```

Some global option:

-   folder: add a custom outputPath.

## buildFont

input: `svg`

buildfont will convert a folder that conatain `svg`  into a font. buildfont use [fontastic](https://github.com/tancredi/fantasticon) and allow you to use some export setting from it.

Option currently support:

-   fontTypes
-   assetTypes

## font

input `ttf`

font will convert font to various format woff, woff2

## image

input `svg`

image convert svg file to png or svgo
image use [sharp](https://github.com/lovell/sharp) for the convertion to png and you can use some export settings from it.

Option currently support:

-   width
-   height

Additional settings

-       size: shortcut that will convert to width x height size.
-   rename: rename the output file
