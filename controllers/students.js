const express = require('express')
const app = new express()
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const { user } = require('pg/lib/defaults')

app.use(express.urlencoded({extended: false}))

//GET /students
router.get('/', async (req,res)=>{
    //TODO display all students that current user has access to
    const studentList = await db.student.findAll({})
    const classroomList = await db.classroom.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    //get all students that are associated with classroomList
    res.render('students/index.ejs',{studentList})
})

//POST /students - create new student - reroute to /students
router.post('/',async (req,res)=>{
    //grab form data
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

//POST /students/addstudent - adds student to classroom
router.post('/addstudent', async (req,res)=>{
    const selectedClassroom = await db.classroom.findOne({
        where: {
            id: req.body.classroomSelector
        }
    })
    console.log(selectedClassroom)
    const currentStudent = await db.student.findOne({
        where: {
            id: req.body.currentStudent
        }
    })
    selectedClassroom.addStudent(currentStudent)
    res.redirect('/students')
})

//DELETE /students/:id
//??????
router.delete('/remove-student', async (req,res)=>{
    const targetStudent = await db.student.findOne({
        where:{
            id: parseInt(req.body.currentStudent)
        }
    })
    // remove reference to student - stop from displaying on all pages
    console.log(targetStudent)
    res.redirect('students/index.ejs')
})

module.exports = router