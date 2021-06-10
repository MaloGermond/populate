const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')

const Font = require('../src/Font.js')
const Image = require('../src/Image.js')

class Populate {

	async build(source, root) {
		const properties = await fsx.readJson(source)
		if (root === undefined) root = "build"
		if (!fs.existsSync(root)) fsx.mkdirs(root)
		console.log("🎯  root export are: " + root)

		/*
			 Convert assets from an extension to an other than store them at the right place
		*/
		await this.buildFont(properties.buildFont, root)
		console.log("🏭️  Font has been successfully build")
		await this.exportFont(properties.font, root)
		console.log("⚒️  Font has been successfully converted")
		await this.exportImages(properties.image, root)
		console.log("🖼️  Images has been successfully converted")


	}

	/*
		 Here we convert and export font
	*/
	async exportFont(dictionary, root) {
		const temp = dictionary.map(async el => {
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
				return fsx.copy(el.path, output + ".ttf")
			})
			el["extension"].filter(ext => ext === "woff").map(ext => {
				return Font.TTFToWOFF(el.path, output)
			})
			el["extension"].filter(ext => ext === "woff2").map(ext => {
				return Font.TTFToWOFF2(el.path, output)
			})
		})

		await Promise.all(temp)
	}

	/*
	// 	 Here we create a font icons
	*/
	async buildFont(dictionary, root) {
		const temp = dictionary.map(async el => {
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

			return Font.SVGToTTF(el.path, output, option)
		})

		await Promise.all(temp)
	}

	/*
	// 	 Here we convert and copy images
	*/
	async exportImages(dictionary, root) {
		const temp = dictionary.map(async el => {
			if (!fs.existsSync(el.path))
				throw new Error(`File does not exist: ${el.path}`)

			if (path.extname(el.path) != '.svg')
				throw new Error(`Wrong path: ${el.path}. svg extension is require`)

			const name = el.rename ? el.rename : path.basename(el.path, ".svg")
			const output = path.join(root, el.folder, name)

			if (el.extension === 'png') {
				for (var option of el["option"]) {
					await Image.SVGToPNG(el.path, output, option)
				}
			}

			if (el.extension === 'svg') {
				Image.SVGToSVGO(el.path, output)
			}
		})

		await Promise.all(temp)
	}

	async minifyImages(dictionary, root){
		console.log(dictionary);
	}

	async write(source) {

		const json = await this.build(source)
		fsx.writeJSON("debug-dictionary.json", json, {
			'spaces': '\t'
		})
	}

}

module.exports = new Populate();
