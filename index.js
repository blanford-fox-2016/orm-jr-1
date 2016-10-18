"use strict"
// This index file you can test the connection
import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');
let dbModel = new DBModel();




var replServer = repl.start({prompt: '> '});

replServer.defineCommand('create', {
  help: 'type .create <first_name last_name cohort_id>',
  action: function(student) {
    let student = student.split(" ");
    Student.create(dbModel.connection, new Student(student[0], student[1], student[2]));
    this.displayPrompt();
  }
});

replServer.defineCommand('delete', {
  help: 'type .delete <id>',
  action: function(id) {
    Student.delete(dbModel.connection, id);
    this.displayPrompt();
  }
});

replServer.defineCommand('show', {
  help: 'type .show',
  action: function() {
    Student.showAll(dbModel.connection);
  }
});


replServer.defineCommand('quit', function() {
  console.log('Goodbye!');
  this.close();
});


// Student.create(dbModel.connection, new Student("Ruby", "Henjaya", 1));
// // Student.create(dbModel.connection, new Student("Fahmi", "Riza", 1));
// // Student.create(dbModel.connection, new Student("juang", "wiantoro", 1));
// // Student.delete(dbModel.connection, 2);
// Student.showAll(dbModel.connection);
// // Cohort.create(dbModel.connection, new Cohort("America"));
//
// let student = new Student("Bagus", "Juang", 1);
// // // //console.log(student.first_name);
// Student.update(dbModel.connection, 5, student);
