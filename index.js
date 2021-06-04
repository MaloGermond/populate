const fs = require('fs')
const fsx = require('fs-extra')
const Populate = require('./src/Populate.js')
const Font = require('./src/Font.js')
const Utils = require('./src/Utils.js')

// Utils.cleanFolder("build")


try {
	Font.TTFToWOFF2("properties", "build/font", "Roboto-Bold")
	Font.TTFToWOFF("properties", "build/font", "Roboto-Bold")
	fsx.copy("properties/Roboto-Bold.ttf", "build/font/Roboto-Bold.ttf")
	Font.SVGToTTF("properties/icons", "build/icons")
	fsx.copy("properties/logo_colored.svg", "build/images/logo_colored.svg")
	Images.SVGToSVGO()
	fsx.copy("properties/logotype_colored.svg", "build/images/logotype_colored.svg")
} catch (e) {
	console.error(e)
}

/*
	 REMINDER: Use the map() for managing dictionary
*/
