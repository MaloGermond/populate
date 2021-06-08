const fs = require('fs')
const path = require('path');
const sharp = require("sharp")

const Utils = require("../src/Utils");

class Image {
	SVGToSVGO() {

	}

	async SVGToPNG(from, to, option) {
		if(!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`)
		if (!fs.existsSync(path.dirname(to)))
			// throw new Error(`File does not exist: ${to}`)
			await Utils.createFolder(path.dirname(to))

		if (option === undefined) {
			option = {}
		}

		await sharp(from)
			.png()
			.resize(option)
			.toFile(to)
	}
}

module.exports = new Image()
