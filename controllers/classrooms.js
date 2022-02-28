const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

// GET /classrooms
router.get('/',(req,res)=>{
    //load up classrooms index
    //populate with all created classrooms for this user
    res.render('classrooms/index.ejs')
})

//POST /classrooms
router.post('/',(req,res)=>{
    //grab form data
    //send to db
    //redirect to classrooms index
    res.redirect('classrooms/index.ejs')
})

// GET /classrooms/new
router.get('/new',(req,res)=>{
    res.render('classrooms/new.ejs')
})


module.exports = router