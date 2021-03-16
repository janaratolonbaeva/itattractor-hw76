const fs = require('fs');
const {nanoid} = require('nanoid');
const filename = './db.json';
let data = [];
let errorItem = null;

module.exports = {
	init: function () {
		try {
			const fileContents = fs.readFileSync(filename);
			data = JSON.parse(fileContents);
		} catch (e) {
			data = [];
		}
	},
	getItems() {
		return data;
	},
	addItem(item) {
		item.id = nanoid();
		item.datetime = new Date().toISOString();
		data.push(item);
		this.save();
	},
	errorItemBack() {
		errorItem = {
			error: 'Author and must be present in the request'
		}
		return errorItem;
	},
	getItemByDate(date) {
		if (date) {
			const thisDate = data.find(item => item.datetime === date);
			const newData = data.slice(thisDate, data.length);
			return newData;
		}
	},
	save() {
		fs.writeFileSync(filename, JSON.stringify(data, null, 2));
	}
};