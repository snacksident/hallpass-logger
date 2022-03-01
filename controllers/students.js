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
    //grab all classrooms for this teacher
    const classroomList = await db.classroom.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    res.render('students/index.ejs',{studentList, classroomList})
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
    if(!created){
        console.log('student already exists')
    }else{
        res.redirect('students')
    }
})
//GET /students/new
router.get('/new', (req,res)=>{
    //render form for adding new student
    res.render('students/new.ejs')
})

//GET /students/:id
router.get('/:id', async (req,res)=>{
    const currentStudent = await db.student.findOne({
        where: {
            id: req.params.id
        }
    })
    const classroomList = await db.classroom.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    res.render('students/show.ejs',{currentStudent,classroomList})
})

//POST /students/:id
//?????
router.post('/addstudent', async(req,res)=>{
    //grab the classroom selected by the dropdown menu
    const selectedClassroom = await db.classroom.findOne({
        where: {
            id: req.body.classroomSelector
        }
    })
    console.log(selectedClassroom)
    //grab the student to add to a new classroom
    const currentStudent = await db.student.findOne({
        //where students id lines up with the page we're viewing (grab current student)
        where: {
            id: req.body.currentStudent
        }
    })
    //add currentStudent to selected classroom
    selectedClassroom.addStudent(currentStudent)
    res.redirect('/students')
})

//DELETE /students/:id
//??????
router.delete('/:id', (req,res)=>{
    res.redirect('students/index.ejs')
})

module.exports = router