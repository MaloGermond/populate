const fs = require('fs')
const fsx = require('fs-extra')
const Pop = require('./src/Populate.js')
const Font = require('./src/Font.js')
const Utils = require('./src/Utils.js')
const Image = require('./src/Image.js')

try {
	Utils.cleanFolder("properties/.cache")
	Pop.build("properties/assets/website.json")
} catch (e) {
	console.error(e)
}
