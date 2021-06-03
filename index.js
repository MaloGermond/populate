const fs = require('fs')
const Populate = require('./src/Populate.js')
const Font = require ('./src/Font.js')



Font.exportWOFF2("properties", "build", "Roboto-Bold")
Font.exportWOFF("properties", "build", "Roboto-Bold")
Font.exportTTF("properties", "build", "Roboto-Bold")
Font.SVGToTTF("properties/icons", "build")
