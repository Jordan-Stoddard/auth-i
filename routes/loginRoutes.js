const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig')
const route = express.Router()

route.post('/', (req, res) => {
    // Take in username and password entered by user
    const creds = req.body
    db('users')
    // create a filter to pull up any username that matches the creds.username
    .where({username: creds.username}) 
    .first()
    .then(user => {
        // says if we have a user, and the password coming in from the post matches
        // the existing user's password then success, else fail.
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            req.session.username = user.username
            console.log(req.session)
            res.status(200).json(user.username)
        } else {
            res.status(401).json({message: 'Username or password is incorrect.'})
        }
    })
    .catch(err => res.json(err))
})




module.exports = route