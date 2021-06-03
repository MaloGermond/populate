const fs = require('fs')
const Populate = require('./src/Populate.js')
const Font = require ('./src/Font.js')

Font.exportWOFF2("Roboto-Bold", "properties", "build")
Font.exportWOFF("Roboto-Bold", "properties", "build")
Font.exportTTF("Roboto-Bold", "properties", "build")
