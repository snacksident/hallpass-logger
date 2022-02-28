const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

//GET /students
router.get('/', (req,res)=>{
    //load up index page
    //display all students this teacher has access to
    res.render('students/index.ejs')
})

//POST /students - create new student - reroute to /students
router.post('/',(req,res)=>{
    //grab form data
    //send to db
    //redirect to students index
    res.redirect('classrooms/index.ejs')
})
//GET /students/new
router.get('/new', (req,res)=>{
    //render form for adding new student
    res.render('students/new.ejs')
})

//GET /students/:id
router.get('/:id', (req,res)=>{
    //grab id from url
    //display info for the specific student who the ID matches with
    res.render('students/show.ejs')
})
//PATCH /students/:id
//?????


//DELETE /students/:id
//??????
router.delete('/:id', (req,res)=>{
    res.redirect('students/index.ejs')
})

module.exports = router