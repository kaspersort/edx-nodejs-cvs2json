const request = require('request')
const path    = require('path')
const csv     = require('csvtojson')
const fs      = require('fs')

const outFile = 'customer-data.json'
const csvFile = 'customer-data.csv'

const csv2JSON = (inData) => { 
	let json = []

	csv()
	.fromStream(request.get(inData))

	.on('json',(jsonObj) => {
	    json.push(jsonObj)
	})

	.on('done',(error) => {
		fs.writeFile(path.join(__dirname, outFile), JSON.stringify(json, null, 2), 'utf8', (error) => {
			if (error)  throw error
			console.log('File saved')
		})
	})
}

csv2JSON(process.argv[2])

//URL: 'https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+2T2017+type@asset+block/customer-data.csv'