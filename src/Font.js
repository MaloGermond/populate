const fs = require('fs')
const fsx = require('fs-extra')

const ttfToWoff2 = require('ttf2woff2');

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

	exportTTF(file, source, directory) {
		const output = directory + file.attributes["subitem"] + "-" + file.attributes["state"] + ".ttf"

		Utils.copyFile(source, output)

		console.info("✅ TTF fonts has been exported to: " + output)
	}

	exportWOFF2(file, source, directory) {
		const output = directory + file.attributes["subitem"] + "-" + file.attributes["state"] + ".woff2"
		/*
			 This solution use ressources a lot... sorry 🙏
		*/
		const buffer = fs.readFileSync(source)
		fs.writeFileSync(output, ttfToWoff2(buffer))
		console.info("✅ WOTF2 fonts has been exported to: " + output)
	}
}


module.exports = new Font();
