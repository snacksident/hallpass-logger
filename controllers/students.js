const express = require('express')
const app = new express()
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

app.use(express.urlencoded({extended: false}))

//GET /students
router.get('/', async (req,res)=>{
    //load up index page
    //display all students this teacher has access to
    const studentList = await db.student.findAll()
    // console.log(studentList)
    res.render('students/index.ejs',{studentList})
})

//POST /students - create new student - reroute to /students
router.post('/',async (req,res)=>{
    //grab form data
    console.log(req.body.first_name)
    const [newStudent, created] = await db.student.findOrCreate({
        where: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    })
    //send to db
    //redirect to students index
    res.redirect('students')
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