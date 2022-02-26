# spring forward project 2

## Concept

After speaking with many teachers it seems that keeping track of which students are using the hallpass, and when each student is using a hallpass can quickly become a nightmare.  This HallPass app is here to help save some time and energy!  Each teacher will have access to each class they teach individually, as well as each student in those classes.  The teachers will be able to select a student in the class they're currently teaching to mark them as using the hall pass.  To help reward the student (as well as the teacher), when they return back with the hall pass, they will be given a quote or joke!



## ERDs

![an ERD of my project](./hallpassERD.drawio.png)

## Routes

| Method | Path           | Purpose                                                  |
|--------|----------------|----------------------------------------------------------|
| GET    | `/`            | Landing Page - Display landing and links to log in       |
| GET    | `/classes`     | class page that lists all classes the user has access to |
| POST   | `/classes`     | creates new class, redirects to `GET /classes`           |
| GET    | `/classes/new` | page that has form for creating new                      |
| GET    | `/classes/:id` | page that lists all students in a specific class         |
|        |                |                                                          |