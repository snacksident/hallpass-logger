const express = require('express')
const app = new express()

const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const { user } = require('pg/lib/defaults')
require('dotenv').config()

//middleware
app.use(express.urlencoded({extended: false})) //body parser to make req.body work



// GET /classrooms
router.get('/', async (req,res)=>{
    const classList = await db.classroom.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    res.render('classrooms/index.ejs',{classList})
})

//POST /classrooms
router.post('/', async (req,res)=>{
    const [newClassroom, created] = await db.classroom.findOrCreate({
        where: {
            class_name: req.body.classroom_name,
            userId: res.locals.user.id
        }
    })
    if(!created){
        console.log('classroom already exists')
    }else{
        res.redirect('/classrooms')
    }
})

// GET /classrooms/new
router.get('/new',(req,res)=>{
    res.render('classrooms/new.ejs')
})

// GET /classrooms/:id
router.get('/:id',async (req,res)=>{
    const currentClassroom = await db.classroom.findOne({
        where:{
            id: req.params.id
        }
    })
    const studentsInClass = await currentClassroom.getStudents()
    res.render('classrooms/show.ejs',{currentClassroom, studentsInClass})
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
    res.redirect('/classrooms')
})

module.exports = router