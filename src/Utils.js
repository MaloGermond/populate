const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')

class Utils {

	/*
		 Create a folder at specific path
		 1. check if the folder doesn't exists
		 2. create the folder
	*/
	async createFolder(path) {
		if (!fs.existsSync(path)) {
			await fsx.mkdirs(path)
		}
	}

	/*
		 Removed all files inside a folder
	*/
	cleanFolder(path) {
		if (!fs.existsSync(path))
			throw new Error(`Folder does not exist: ${path}`)
		fsx.emptyDir(path)
	}

}

module.exports = new Utils();
