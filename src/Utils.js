const fs = require('fs')

class Utils {

	/*
		 	Write an object as a json at the file root
	*/
	writeJSON(name, object, path) {
		if (path === undefined) {
			path = ""
		}
		fs.writeFile(path + name, JSON.stringify(object, null, "\t"), function(err) {
			if (err)
				throw err
			console.log('✅ ' + name + '.json created successfully!')
		})
	}

	/*
		 Copy file from one place to an other
		 Require to provide a path for both argument.
	*/

	copyFile(source, target) {
		fs.copyFileSync(source, target);
	}

	/*
		 Create a folder at specific path
		 1. check if the folder doesn't exists
		 2. create the folder
	*/

	createFolder(path) {
		if (!fs.existsSync(path)) {
			console.info("🔎 This folder: " + path + " doesn't exists")
			fs.mkdir(path, (err) => {
				if (err) {
					return console.error(err)
				}
				console.info("✅ This folder: " + path + " directory created successfully!")
			})
		}
	}

	/*
		 Removed all files inside a folder
	*/
	cleanFolder(path) {
		if (!fs.existsSync(path))
			throw new Error(`Folder does not exist: ${path}`)

		fs.rm(path)
	}
}

module.exports = new Utils();
