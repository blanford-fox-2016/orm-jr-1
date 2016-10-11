"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const faker = require('faker')
let dbModel = new DBModel();

let makeTable = () => {
  DBModel.connection.serialize( () =>{
    dbModel.create_table_students()
    dbModel.create_table_cohorts()
  })
}

let insertStudent = () => {
  DBModel.connection.serialize( () =>{
    //Insert random data to table students
    for (var i = 0; i < 50; i++) {
      Student.create(DBModel.connection, new Student({firstname: faker.name.firstName(), lastname: faker.name.lastName(), cohort_id: Math.ceil(Math.random()*3)}))
    }
  })
}

let insertCohort = () => {
  // DBModel.connection.serialize( () => {
    //Insert new cohort
    Cohort.create(DBModel.connection, new Cohort({name : "Artic Fox"}))
    Cohort.create(DBModel.connection, new Cohort({name : "Blanford Fox"}))
    Cohort.create(DBModel.connection, new Cohort({name : "Cross Fox"}))
  // })
}

let allStudents = () => {
  DBModel.connection.serialize( () => {
    //Show all students
    Student.all(DBModel.connection)
  })
}

let allCohorts = () => {
  DBModel.connection.serialize( () => {
    //Show all students
    Cohort.all(DBModel.connection)
  })
}

let foxes = () => {
  DBModel.connection.serialize( () => {
    //artic fox
    Cohort.cohort_students(DBModel.connection, 1);
    //Blanford fox
    Cohort.cohort_students(DBModel.connection, 2);
    //cross fox
    Cohort.cohort_students(DBModel.connection, 3);
  })
}


let editName = () => {
  DBModel.connection.serialize( () =>  {
    Student.findById(DBModel.connection, 3, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Nama asli : ${row.firstname}`);
        Student.update(DBModel.connection, firstname, "Ahyana", 3);
      }
    })

    Student.findById(DBModel.connection, 5, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Nama asli : ${row.firstname}`);
        Student.update(DBModel.connection, firstname, "Tama", 5);
      }
    })

  });
}

makeTable();
// insertStudent();
// insertCohort();
// allStudents();
// allCohorts();
// foxes();
// editName();
