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
    //get current user
    const currentUser = await db.user.findOne({
        where:{
            id: res.locals.user.id
        }
    })
    //get classrooms user has access to
    const usersClassrooms = await currentUser.getClassrooms()
    console.log(usersClassrooms)
    //get students within the classrooms
    const studentList = await db.student.findAll({})
    
    res.render('students/index.ejs',{studentList})
})

//POST /students - create new student - reroute to /students
router.post('/',async (req,res)=>{
    //grab form data
    const [newStudent, created] = await db.student.findOrCreate({
        where: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            has_pass: false
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
    const studentsClasses = await currentStudent.getClassrooms()
    const studentsHallpasses = await currentStudent.getHallpasses()
    res.render('students/show.ejs',{currentStudent,classroomList,studentsHallpasses,studentsClasses})
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

//DELETE /students/remove-student
router.delete('/remove-student', async (req,res)=>{
    const targetStudent = await db.student.findOne({
        where:{
            id: parseInt(req.body.currentStudent)
        }
    })
    // remove reference to student - stop from displaying on all pages
    console.log(targetStudent)
    res.redirect('students/')
})

module.exports = router