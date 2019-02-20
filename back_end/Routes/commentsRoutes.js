const express = require('express');
const router = express.Router();
const knex = require("knex")
const dbConfig = require('../knexfile')
const db = require("../config.js")

//Create
//create a new comment
//-------------------------------------------
router.post('', (req, res) => {
	const { id } = req.params;
	const {content, date, author } = req.body;

	//add comment to database
	db.insert({content, date, author, event_id: id }).into('comments')
		.then(res1 => {
			
			//see the current comment count for event
			db('events')
			.where({id})
			.first()
			.then(res2 => {

				//take current comment count and add 1 to it
				let num = res1.total_comments
				num = num + 1

				db('events')
				.where({id})
				.update({total_comments: num})
				.then(res3 => {
					return res.status(200).json(res2)
				})
				.catch(err3 => { //catch for updating event
					console.log(error)
					return res.status(500).json(err3)
				})
			})
			.catch(err2 => { //catch for looking up event
				console.log(error)
				return res.status(500).json(err2)
			})
		})
		.catch(err1 => { //catch for inserting comment
			console.log(err1)
			res.status(500).json(err1)
		})

})

// Delete
// delete a comment
// -------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('projects')
	.where({id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})


module.exports = router;