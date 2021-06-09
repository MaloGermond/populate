const fs = require('fs')
const fsx = require('fs-extra')
const Pop = require('./src/Populate.js')
const Font = require('./src/Font.js')
const Utils = require('./src/Utils.js')
const Image = require('./src/Image.js')

try {
	Utils.cleanFolder("properties/.cache")
	Pop.build("properties/assets/website.json", "build")

	// Font.TTFToWOFF2("properties/assets/fonts/Roboto-Bold.ttf", "build/font/Roboto-Bold")
	// Font.TTFToWOFF("properties/assets/fonts/Roboto-Bold.ttf", "build/font/Roboto-Bold")
	// fsx.copy("properties/assets/fonts/Roboto-Bold.ttf", "build/font/Roboto-Bold.ttf")
	// Font.SVGToTTF("properties/assets/icons", "build/icons")
	// Image.SVGToPNG("properties/assets/images/logotype_colored.svg", "build/images/logotype_colored.png", {
	// 	width: 1000,
	// 	height: 400
	// })
	// Image.SVGToPNG("properties/assets/images/logo_colored.svg", "build/images/logo_colored.png", {
	// 	size: 500
	// })

} catch (e) {
	console.error(e)
}

/*
	 REMINDER: Use the map() for managing dictionary
*/
