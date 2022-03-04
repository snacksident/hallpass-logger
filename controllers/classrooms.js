const express = require('express')
const app = new express()
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const { user } = require('pg/lib/defaults')
const axios = require('axios').default

//middleware
app.use(express.urlencoded({extended: false})) //body parser to make req.body work



// GET /classrooms
router.get('/', async (req,res)=>{
    classList = await res.locals.user.getClassrooms()
    res.render('classrooms/index.ejs',{classList})
})

//POST /classrooms
router.post('/newclassroom', async (req,res)=>{
    const [newClassroom, created] = await db.classroom.findOrCreate({
        where: {
            class_name: req.body.classroom_name
        }
    })
    if(!created){
        console.log('classroom already exists - try new name')
    }else{
        res.locals.user.addClassroom(newClassroom)
        res.redirect('/classrooms')
    }
})

// GET /classrooms/new
router.get('/new',(req,res)=>{
    res.render('classrooms/new.ejs')
})

// GET /classrooms/:id
router.get('/:id',async (req,res)=>{
    try {
        const currentClassroom = await db.classroom.findOne({
            where:{
                id: req.params.id
            }
        })
        const studentsInClass = await currentClassroom.getStudents()
        res.render('classrooms/show.ejs',{currentClassroom, studentsInClass})
    } catch (error) {
        console.log(error)
    }
})

//DELETE /classrooms/remove-student
router.delete('/remove-student', async (req,res)=>{

    const targetClassroom = await db.classroom.findOne({
        where:{
            id: req.body.thisClassroom
        }
    })
    const targetStudent = await db.student.findOne({
        where:{
            id: parseInt(req.body.currentStudent)
        }
    })
    await targetClassroom.removeStudent(targetStudent)
    res.redirect(`/classrooms/${req.body.thisClassroom}`)
})

//POST /classrooms/create-student
router.post('/create-student', async (req,res)=>{
    const [newStudent, created] = await db.student.findOrCreate({
        where: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    })
    const currentClassroom = await db.classroom.findOne({
        where:{
            id: req.body.thisClassroom
        }
    })
    currentClassroom.addStudent(newStudent)
    res.redirect(`/classrooms/${req.body.thisClassroom}`)
})

// POST /classrooms/hallpass-checkout
router.post('/hallpass-checkout', async (req,res)=>{
    //grab current student
    const hallpassStudent = await db.student.findByPk(req.body.currentStudent)
    //create new hallpass
    const newHallpass = await db.hallpass.create({
        //set hallpass time to now when created
        start_time: new Date()
    })
    //connect new student to hallpass
    await hallpassStudent.addHallpass(newHallpass)
    //change students has_pass status
    await hallpassStudent.update({has_pass: true})
    //go to show.ejs page, reflecting that a student is out on hallpass
    /**
     * TODO - change to either render or redirect - maybe stay on same page?
     */
    res.redirect(`/classrooms/${parseInt(req.body.thisClassroom)}`)
})

// PUT /classrooms/hallpass-checkin
router.put('/hallpass-checkin',async (req,res)=>{
    //grab current student
    const hallpassStudent = await db.student.findOne({
        where:{
            id: req.body.currentStudent
        }
    })
    //grab this users current hallpass
    const studentsHallpass = await db.hallpass.findOne({
        //find the one hallpass associated with the student that has a null end_time (incomplete hall pass)
        where:{
            studentId: req.body.currentStudent,
            end_time: null
        }
    })
    //set checkout time with new date in db
    await studentsHallpass.update({
        end_time: new Date()
    })
    //check hallpass back in - set students has_pass back to false
    await hallpassStudent.update({has_pass: false})

    //need to get student a joke for returning to class

    //reload current page
    res.redirect(`/classrooms/${parseInt(req.body.thisClassroom)}`)
})

//DELETE /classrooms/remove-classroom
router.delete('/remove-classroom', async(req,res)=>{
    const targetClassroom = await db.classroom.findOne({
        where:{
            id: req.body.thisClassroom
        }
    })
    res.locals.user.removeClassroom(targetClassroom)
    res.redirect('/classrooms')
})

module.exports = router