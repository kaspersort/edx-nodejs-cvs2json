const path    = require('path')
const csv     = require('csvtojson')
const fs      = require('fs')

const outFile = path.join(__dirname, 'customer-data.json')
const csvFile = path.join(__dirname, 'customer-data.csv')

const csv2JSON = (inData) => { 
	let json = []

	csv()
	.fromFile(csvFile)

	.on('json',(jsonObj) => {
	    json.push(jsonObj)
	})

	.on('done',(error) => {
		fs.writeFile(outFile, JSON.stringify(json, null, 2), 'utf8', (error) => {
			if (error)  throw error
			console.log('File saved')
		})
	})
}

csv2JSON()
