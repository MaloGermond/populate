const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path');

const ttfToWoff2 = require('ttf2woff2');
const ttfToWoff = require('ttf2woff');
const {
	generateFonts
} = require('fantasticon')

const Utils = require("../src/Utils");

class Font {
	export (dictionary, config) {
		/*
			 Check, there's some font to export
		*/

		// check that front is well defined in config.json
		if (config.front === null || config.front === undefined) {
			return
		}

		const fontDictionary = dictionary.allProperties.filter(prop => prop.attributes["type"] === config.front && prop.attributes["item"] === "fonts")



		// check that there's some file require into properties/brand/font.json
		if (dictionary.allProperties.filter(prop => prop.attributes["type"] === config.front && prop.attributes["item"] === "fonts").length === 0) {
			console.info("❎ " + config.front + " not able to find font to export");
			return
		}
		console.info("🔎 " + config.front + " needs some fonts to be exported");

		/*
			 Check, there's a font folder or create it
		*/

		Utils.createFolder(config.buildPath + "assets/fonts")


		/*
			 Export font
		*/

		fontDictionary.map(el => {
			const source = "properties/assets/fonts/" + el.attributes["subitem"] + "-" + el.attributes["state"] + ".ttf"
			console.info(el.attributes["subitem"] + "-" + el.attributes["state"]);
			el.value.map(format => {
				/*
					 export TTF font
				*/
				if (format === 'ttf') {
					this.exportTTF(el, source, config.buildPath + "assets/fonts/")
				}

				/*
					 export WOTF font from TTF
				*/

				/*
					 export WOTF2 font from TTF
				*/

				if (format === 'woff2') {
					this.exportWOFF2(el, source, config.buildPath + "assets/fonts/")
				}

			})
		})
	}


	async TTFToWOFF(from, to, label) {
		if (!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`);

		if (!fs.existsSync(to))
			await Utils.createFolder(to)

		const input = path.join(from, label + ".ttf")
		const output = path.join(to, label + ".woff")

		const file = fs.readFileSync(input)
		// const woff = Buffer.from(ttfToWoff(new Uint8Array(file), {}).buffer)
		await fs.writeFileSync(output, ttfToWoff(new Uint8Array(file), {}).buffer)

		console.info("✅  WOTF  fonts has been exported to: " + output)

	}

	async TTFToWOFF2(from, to, label) {
		if (!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`)
		if (!fs.existsSync(to))
			await Utils.createFolder(to)


		const input = path.join(from, label + ".ttf")
		const output = path.join(to, label + ".woff2")

		/*
			 This solution take time and use ressources a lot... sorry 🙏
		*/
		const buffer = fs.readFileSync(input)
		await fs.writeFileSync(output, ttfToWoff2(buffer))
		console.info("✅  WOTF2 fonts has been exported to: " + output)
	}

	async SVGToTTF(from, to) {
		if (!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`)
		if (!fs.existsSync(to))
			// throw new Error(`File does not exist: ${to}`)
			await Utils.createFolder(to)

		await generateFonts({
			inputDir: from, // (required)
			outputDir: to, // (required)
			fontTypes: ['ttf'],
			assetTypes: ['css', 'html'],
		})

		console.info("✅  SVG -> TTF has been convert to: " + to)
	}
}


module.exports = new Font();
