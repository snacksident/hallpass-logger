# Hall Pass

[current version of hallpass hosted on heroku](https://hallpass-loggr.herokuapp.com/)

## Concept

* Teachers these days have enough on their plates - with managing in-class students, remote students, grading, curriculum... I could go on all day.  With this hallpass logging app, teachers will have one less thing to worry about!  Hallpass Loggr will provide at-a-glance information about which students are currently in the classroom and which are out on a break.  No more stressing about where a certain student is (in a lab, meeting with administration, on a bio break), just take a quick look at the app screen!

## User Stories

* As a teacher of many high school classes, I want to quickly glance at a page and know which students should be in class and which are on a hall pass.

* As a teacher of many classes, I want to be able to pick one student and look at their hall pass history

## Installation Instructions
- Fork and clone the code and run `npm i` 
  <details>
    <summary> NPM </summary>

    - axios
    - bcrypt
    - bootswatch
    - cookie-parser
    - crypto-js
    - dotenv
    - ejs 
    - express
    - express-ejs-layouts
    - method-override
    - pg
    - sequelize
    - sequelize-cli

  </details>

- Run `sequelize db:migrate` to create the tables

## ERDs

![an ERD of my project](./hallpassERD.drawio.png)

## Routes

| Method | Path                            | Purpose                                                     |
|--------|---------------------------------|-------------------------------------------------------------|
| GET    | `/`                             | Landing Page - Display landing and links to log in          |
| GET    | `/classrooms`                   | class page that lists all classes the user has access to    |
| POST   | `/classrooms`                   | creates new class, redirects to `GET /classes`              |
| GET    | `/classrooms/new`               | page that has form for creating new class                   |
| GET    | `/classrooms/:id`               | page that lists all students in a specific class            |
| DELETE | `/classrooms/remove-student`    | removes selected student from classroom                     |
| POST   | `/classrooms/create-student`    | creates a student in-line from /classrooms page             |
| POST   | `/classrooms/hallpass-checkout` | creates a new hallpass object with an empty 'return' column |
| PUT    | `/classrooms/hallpass-checkin`  | fills in empty 'return' column in hallpass                  |
| DELETE | `/classrooms/remove-classroom`  | removes classroom object from users show page               |
| GET    | `/students/:id`                 | page to view details on users hallpass log history          |
|        |                                 |                                                             |

## Wireframe

![first draft of wireframe](./wireframe.png)

## MVP Goals

* Create website where teachers can store a classroom of students

* User ability to create new classrooms

* User ability to create new students

* User ability to delete classrooms

* User ability to remove students from your own classrooms

* Ability to check students in and out of classroom with a "hallpass"

* View each students hall pass usage



## Stretch Goals

* View details of students hall pass usage 

* Neat and clean styling 

* Add notes for each hallpass usage

* Quick display of most recent hallpass logs for each student

* Ability for user to arrange students on `/classes/:id` page



## Technologies Used

* Node.js

* Express and express ejs layouts

* Axios for api requests

* Crypto-js / bcrypt for encryption

* Bootstrap components

* Sequelize for database interaction

* Bootswatch theme for hand-drawn look

* zenquote.io api to provide daily inspirational quote

* App hosting on Heroku

## Post Project Reflections

* Planning is EXTREMELY important and helpful - after a lot of tweaking and changes in the middle of development, I've learned the importance of a well-planned app.

* Importance of focus:  I often found myself trying to tackle 3-4 steps of the project at once, but found the most success when I was able to lock down and get one piece of functionality done before moving onto the next.  It was tricky during the early stages of development, but as things got completed it was easier to take a step back and do one piece at a time.

* I would love to re-shape this project into a general multi-purpose time tracker.  Rather than only having classrooms of students, I would like to simply have 'collections' of 'trackables' (log time spent at the gym, playing games, working on a certain task, etc) with the ability to add notes to reference on each 'log'

