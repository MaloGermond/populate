const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')

const Font = require('../src/Font.js')
const Image = require('../src/Image.js')


class Populate {

	async build(source, repo) {
		const properties = await fsx.readJson(source)

		// console.log(properties.map( el => path.basename(el.path)));

		/*
			 Here we convert and export font
		*/

		properties.filter(el => path.extname(el.path) === '.ttf').map(el => {
			const name = path.basename(el.path, '.ttf')
			const output = path.join("build",el.folder, name)
			el["extension"].filter(ext => ext === "ttf").map(ext => {
				fsx.copy(el.path, output+".ttf")
			})
			el["extension"].filter(ext => ext === "woff").map(ext => {
				Font.TTFToWOFF(el.path, output)
			})
			el["extension"].filter(ext => ext === "woff2").map(ext => {
				Font.TTFToWOFF2(el.path, output)
			})
		})

		/*
			 Here we create a font icons
		*/

		properties.filter(el => path.extname(el.path) === '').map(el => {
			Font.SVGToTTF(el.path, path.join("build",el.folder))
		})

		/*
			 Here we convert svg to png or svgo
		*/

		properties.filter(el => path.extname(el.path) === '.svg').map(el => {
			let name = path.basename(el.path, ".svg")

			if (el.rename) {
				name = el.rename
			}

			const output = path.join("build", el.folder, name)

			if (el.extension === 'png') {
				if (el.format) {
					el["format"].map(size => Image.SVGToPNG(el.path, output + "_" + size + "x" + size + ".png", size))
				} else {
					Image.SVGToPNG(el.path, output + ".png")
				}
			}

			if (el.extension === 'svg') {
				fsx.copy(el.path, output+".svg")
			}

		})

		return
	}

	async write(source) {

		const json = await this.build(source)
		fsx.writeJSON("debug-dictionary.json", json, {
			'spaces': '\t'
		})
	}


}

module.exports = new Populate();
