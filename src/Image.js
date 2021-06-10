const fs = require('fs')
const path = require('path');
const sharp = require("sharp")
const {
	optimize
} = require('svgo');

const Utils = require("../src/Utils");

class Image {
	async SVGToSVGO(from, to) {
		if (!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`)
		if (!fs.existsSync(path.dirname(to)))
			await Utils.createFolder(path.dirname(to))

		const output = to + ".svg"

		const svg = await fs.readFileSync(from, (err, data) => {
			if (err) console.error(err)
		})

		const svgo = await optimize(svg, {
			// optional but recommended field
			path: output,
			// all config fields are also available here
			multipass: true
		})

		await fs.writeFileSync(output, svgo.data)

	}

	async SVGToPNG(from, to, option) {
		if (!fs.existsSync(from))
			throw new Error(`File does not exist: ${from}`)
		if (!fs.existsSync(path.dirname(to)))
			await Utils.createFolder(path.dirname(to))

		let name = path.basename(to)
		let prefix
		let resize

		if (option === undefined) {
			option = {}
		}

		if (option.size != undefined) {
			prefix = option.size + "x" + option.size
			resize = {
				"width": option.size,
				"height": option.size
			}
		}

		if (option.width && option.height) {
			prefix = option.width + "x" + option.height
			resize = {
				"width": option.width,
				"height": option.height
			}
		}
		let output = to + name + "_" + prefix + ".png"

		await sharp(from)
			.png({
				"compressionLevel": 9,
				"quality": 100
			})
			.resize(resize)
			.toFile(output)
	}
}

module.exports = new Image()
