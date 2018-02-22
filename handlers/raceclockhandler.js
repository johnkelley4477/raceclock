'use strict';

const rch = {
	"normilizePayload":(payloaded)=>{
		const payload = JSON.stringify(payloaded);
        const values = payload.replace('{','').replace('}','');
        const strArray = values.split(',');
        let valuesArray = [];
        for(var i = 0;i < strArray.length;i+=3){
            var tempObject = {};
            var placeA = strArray[i].split(':"');
            var timeA = strArray[i+1].split(':"');
            var bibA = strArray[i+2].split(':"');
            tempObject["place"] = placeA[1].replace('"','');
            tempObject["time"] = timeA[1].replace('"','');
            tempObject["bib"] = bibA[1].replace('"','');
            valuesArray.push(tempObject);
        }
        return valuesArray;
	},
	"writeJSON":(data,callback)=>{
		const fs = require('fs');
		const payload = rch.normilizePayload(data);
		let obj = {};
		obj["raceData"] = payload;
		obj["datetime"] = new Date();
		let json = JSON.stringify(obj);
		fs.writeFile('raceReport.json',json,'utf8');
		fs.readFile('raceReport.json', 'utf8', function (err, data) {
			if (err) throw err;
			callback(null,JSON.parse(data));
		});
	}
}
exports.rch = rch;