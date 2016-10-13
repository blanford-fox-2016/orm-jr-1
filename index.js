"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const faker = require('faker')
const repl = require('repl')
let dbModel = new DBModel();

let makeTable = () => {
  dbModel.create_table_students(
    (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("students TABLE CREATED");
        dbModel.create_table_cohorts(
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("cohorts TABLE CREATED");
            }
          }
        )
      }
    }
  )
}

let insertStudent = () => {

  //Insert random data to table students
  for (var i = 0; i < 200; i++) {
    Student.create(dbModel.connection, new Student({firstname: faker.name.firstName(), lastname: faker.name.lastName(), cohort_id: Math.ceil(Math.random()*3)}), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New student added!");
      }
    })
  }
}

let insertCohort = () => { //CALLBACK HELL
  Cohort.create(dbModel.connection, new Cohort({name : "Artic Fox"}), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data inserted!");
      Cohort.create(dbModel.connection, new Cohort({name : "Blanford Fox"}), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data inserted!");
          Cohort.create(dbModel.connection, new Cohort({name : "Cross Fox"}), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Data inserted!");
            }
          })
        }
      })
    }
  })
}

let allStudents = () => {
  Student.all(dbModel.connection, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("That's all!");
    }
  })
}

let allCohorts = () => {
  Cohort.all(dbModel.connection, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Thats all!");
    }
  })
}

let foxes = (param) => {
    //Blanford fox
    Cohort.cohort_students(dbModel.connection, param);
}


let editName = () => {
  Student.findById(dbModel.connection, 199, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Data asli : ${row.firstname}`);
      Student.update(dbModel.connection, 'firstname', "Ahyana", row.id);
    }
  })

  Student.findById(dbModel.connection, 200, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Data asli : ${row.firstname}`);
      Student.update(dbModel.connection, 'firstname', "Tama", row.id);
    }
  })
}

let killStudent = () => {
  Student.findById(dbModel.connection, 200, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${row.firstname} will be killed!`);
      Student.destroy(dbModel.connection, `id = ${row.id}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Killed!');
        }
      });
    }
  })
}


var r = repl.start({prompt: '>'});
r.context.makeTable = makeTable
r.context.insertNewStudent = insertStudent
r.context.insertNewCohort = insertCohort
r.context.viewAllStudents = allStudents
r.context.viewAllCohorts = allCohorts
r.context.foxes = foxes  // foxes(cohort_id)
r.context.deleteStudent = killStudent
r.context.editName = editName
