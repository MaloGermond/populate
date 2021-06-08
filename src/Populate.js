const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')

const Font = require('../src/Font.js')
const Image = require('../src/Image.js')


class Populate {

	async build(source, root) {
		const properties = await fsx.readJson(source)
		if (root === undefined) root = "../"
		console.log("🎯  root export are: " + root)

		// await this.exportFont(properties.font, root)
		await this.buildFont(properties.buildFont, root)


		//
		//
		//
		// /*
		// 	 Here we convert svg to png or svgo
		// */
		//
		// properties.filter(el => path.extname(el.path) === '.svg').map(el => {
		// 	let name = path.basename(el.path, ".svg")
		//
		// 	if (el.rename) {
		// 		name = el.rename
		// 	}
		//
		// 	const output = path.join("build", el.folder, name)
		//
		// 	if (el.extension === 'png') {
		// 		if (el.format) {
		// 			el["format"].map(size => Image.SVGToPNG(el.path, output + "_" + size + "x" + size + ".png", size))
		// 		} else {
		// 			Image.SVGToPNG(el.path, output + ".png")
		// 		}
		// 	}
		//
		// 	if (el.extension === 'svg') {
		// 		fsx.copy(el.path, output+".svg")
		// 	}
		//
		// })

		return
	}

	/*
		 Here we convert and export font
	*/
	async exportFont(dictionary, root) {
		dictionary.map(el => {
			if (!fs.existsSync(el.path))
				throw new Error(`File does not exist: ${el.path}`)

			if (path.extname(el.path) != '.ttf')
				throw new Error(`Wrong file extension: ${el.path}. File needs to be .ttf`)

			if (el.extension === undefined)
				throw new Error(`extension field is missing: ${el.path}.`)

			const name = path.basename(el.path, '.ttf')
			const folder = el.output ? el.output : ""
			const output = path.join(root, folder, name)

			el["extension"].filter(ext => ext === "ttf").map(ext => {
				fsx.copy(el.path, output + ".ttf")
			})
			el["extension"].filter(ext => ext === "woff").map(ext => {
				Font.TTFToWOFF(el.path, output)
			})
			el["extension"].filter(ext => ext === "woff2").map(ext => {
				Font.TTFToWOFF2(el.path, output)
			})
		})
	}

	/*
	// 	 Here we create a font icons
	*/
	async buildFont(dictionary, root) {
		dictionary.map(el => {

			if (!fs.existsSync(el.path))
				throw new Error(`File does not exist: ${el.path}`)

			if (path.extname(el.path) != '')
				throw new Error(`Wrong path: ${el.path}. A folder is require`)

			const folder = el.output ? el.output : ""
			const output = path.join(root, folder)

			const option = {
				"fontTypes": el.fontTypes,
				"assetTypes": el.assetTypes
			}

			Font.SVGToTTF(el.path, output, option)
		})
	}

	async write(source) {

		const json = await this.build(source)
		fsx.writeJSON("debug-dictionary.json", json, {
			'spaces': '\t'
		})
	}


}

module.exports = new Populate();
