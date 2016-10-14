"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl')
let dbModel = new DBModel()

//Create & Insert Data
// Student.create(dbModel.connection, new Student("Mangku", "Widodo", 1))
// Student.create(dbModel.connection, new Student("Ken", "Putra", 1))
// Student.create(dbModel.connection, new Student("Jokowow", "Widodo", 2))

// Cohort.create(dbModel.connection, new Cohort("Coding Bootcamp Hacktiv8"))
// Cohort.create(dbModel.connection,new Cohort("PPAP"))
// Cohort.create(dbModel.connection,new Cohort("BULOK"))
// Cohort.create(dbModel.connection,new Cohort("WIDODO.inc"))

// Cohort.create(dbModel.connection,new Cohort("Cohort Baru"))

//Read
// Student.all(dbModel.connection, function(data, err){
//   // console.log(data);
//   if(!err){
//     for(var i = 0 ; i < data.length; i++){
//       console.log(data[i].toString());
//     }
//     console.log(`--------------`);
//   }else{
//     console.log(`error`);
//     console.log(err);
//   }
// })

// Cohort.where(dbModel.connection,'cohort.id=1',function(data,err){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// });
// Student.where(dbModel.connection,'id=1',function(data,err){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// });

//update
let cohort
// let functionCB = (cohort) => {
//       // console.log(cohort);
//       // console.log(cohort.name);
//       // console.log(data[1]);
//       cohort.name = data[1]
//       Cohort.update(dbModel.connection, cohort)
//     }

//
// Cohort.find(dbModel.connection, 7, function(data){
//   // console.log(data.name);
//   cohort = data
//   // console.log(cohort.id);
//   cohort.name = "new Cohort"
//   // console.log(cohort.name);
//   // Cohort.update(dbModel.connection, cohort)
// }, functionCB)
//
// Cohort.find(dbModel.connection, 7, function(data){
//   console.log(data.name);
// })
//

let student

// let functionCB = (student) => {
//   student.firstname = "namadepanbaru"
//   student.lastname = "namabelakangbaru"
//   student.cohort_id = 2
//   Student.update(dbModel.connection, student)
// }

// Student.find(dbModel.connection, 1, function(data){
//   student = data
// }, functionCB)

// Student.find(dbModel.connection, 1, function(data){
//   console.log(`Firstname : ${data.firstname} Lastname : ${data.lastname} Cohort ID : ${data.cohort_id}`);
// })

// repl.start({prompt: '> ', eval: Cohort.find})
// repl.start({prompt: '> ', eval: Cohort.where})
// repl.start({prompt: '> ', eval: Student.all})

var replServer = repl.start({prompt: '> '});

replServer.defineCommand('readData', {
  help: 'type .readData',
  action: function() {
    Student.all(dbModel.connection, function(data, err){
      // console.log(data);
      if(!err){
        for(var i = 0 ; i < data.length; i++){
          console.log(data[i].toString());
        }
        console.log(`--------------`);
      }else{
        console.log(`error`);
        console.log(err);
      }
    })
  }
});


replServer.defineCommand('create', {
  help: 'type .create <firstname lastname cohortId>',
  action: function(data) {
    data = data.split(" ")
    // console.log(data);
    Student.create(dbModel.connection, new Student(data[0], data[1], data[2]))
  }
});

replServer.defineCommand('find', {
  help: 'type .find <id>',
  action: function(id) {
    Cohort.find(dbModel.connection, id, function(data){
      console.log(`Data : ${data.name}`);
    })
  }
});

replServer.defineCommand('update', {
  help: 'type .find <id_newData>',
  action: function(data) {
    data = data.split(" ")

    let functionCB = (cohort) => {
      // console.log(cohort);
      // console.log(cohort.name);
      // console.log(data[1]);
      cohort.name = data[1]
      Cohort.update(dbModel.connection, cohort)
    }
    Cohort.find(dbModel.connection, data[0], function(data){
      // console.log(data.name);
      cohort = data
      // console.log(data[0]);
      // console.log(cohort.id);
      // cohort.name = "data Baru"
      // console.log(cohort.name);
      // Cohort.update(dbModel.connection, cohort)
    }, functionCB)
  }
});

replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});


// const r = repl.start({prompt: '>', eval: myEval, writer: myWriter});
//
// function myEval(cmd, context, filename, callback) {
//   console.log(filename);
//   callback(null,cmd);
// }
//
// function myWriter(output) {
//   return output.toUpperCase();
// }
