const express = require('express')
const app = new express()

app.get('/', (req,res)=>{
    res.render('home.ejs')
})

app.listen(8000, ()=>{
    console.log('now hooked up to port 8000')
})