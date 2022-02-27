# Hall

## Concept

After speaking with many teachers it seems that keeping track of which students are using the hallpass, and when each student is using a hallpass can quickly become a nightmare.  This HallPass app is here to help save some time and energy!  Each teacher will have access to each class they teach individually, as well as each student in those classes.  The teachers will be able to select a student in the class they're currently teaching to mark them as using the hall pass.  To help reward the student (as well as the teacher), when they return back with the hall pass, they will be given a quote or joke!



## ERDs

![an ERD of my project](./hallpassERD.drawio.png)

## Routes

| Method | Path            | Purpose                                                             |
|--------|-----------------|---------------------------------------------------------------------|
| GET    | `/`             | Landing Page - Display landing and links to log in                  |
| GET    | `/classes`      | class page that lists all classes the user has access to            |
| POST   | `/classes`      | creates new class, redirects to `GET /classes`                      |
| GET    | `/classes/new`  | page that has form for creating new class                           |
| GET    | `/classes/:id`  | page that lists all students in a specific class                    |
| PATCH  | `/class/:id`    | page to update a pre-existing class, redirects to `get /class`      |
| GET    | `/students`     | page that lists all students                                        |
| POST   | `/students`     | creates new student, redirects to `GET /students`                   |
| GET    | `/students/new` | page that has form for creating new student                         |
| GET    | `/students/:id` | page to list details on specific student                            |
| PATCH  | `/students/:id` | page to update a pre-existing student, redirects to `GET /students` |
| DELETE | `/students/:id` | page to delete a specific student. redirects to `GET /students`     |
|        |                 |                                                                     |