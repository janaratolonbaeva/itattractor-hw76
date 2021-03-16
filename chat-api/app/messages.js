const express = require('express');
const router = express.Router();
const fileDb = require('../fileDb');

router.get('/', (req, res) => {
	const messages = fileDb.getItems();
	res.send(messages);
});

router.get('/:datetime', (req, res) => {
	const date = req.params.datetime;
	const messages = fileDb.getItemByDate(date);
	res.send(messages);
});

router.post('/', (req, res) => {
	try {
		if (!req.body.text || !req.body.author) {
			return res.status(400).send(fileDb.errorItemBack());
		}
		fileDb.addItem(req.body);
		res.send(
			{message: 'Message saved'}
		)
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;