"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require('repl');



// Student.create(DBModel.connection, new Student("Rubi", "Henjaya", 1))
// Student.create(DBModel.connection, new Student("Riza", "Fahri", 1))
// Cohort.create(DBModel.connection, new Cohort("Fisika"))


// Student.all(DBModel.connection, function(data, err){
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
// })


//
//
//
// Cohort.where(DBModel.connection, 1 , function(data, err){
//   // console.log(data.length);
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
//   //console.log(data);
// })


// let cohort = {}
// Cohort.find(DBModel.connection, 1, function(data){
//     cohort.data = data
//     cohort.name = 'Best Cohort Ever Ever'
//     Cohort.update(DBModel.connection, cohort.data, cohort.name)
// })




var pilih = "";
pilih = 'sayhello';

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('orm', {
  help: 'orm add <student> <nama_depan> <nama_belakang> <student_id>\n        '+
  'orm add <cohort> <nama_cohort>\n        '+
  'orm show student\n        '+
  'orm show cohort\n        '+
  'orm where student <student_id>\n        '+
  'orm where cohort <cohort_id>\n        '+
  'orm update student <student_id> <new_student_name>\n        '+
  'orm update cohort <cohort_id> <new_cohort_name>\n        ',
  action: function(option) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    var temp = option.split(" ")
    switch (temp[0]) {
      // case add untuk menambah
      case 'add':
        if(temp[1] == 'student') {
          Student.create(DBModel.connection, new Student(temp[2], temp[3], temp[4]))
        }
        else if (temp[1] == 'cohort') {
          Cohort.create(DBModel.connection, new Cohort(temp[2]))
        }
        break;
        // case show untuk melihat semua
      case 'show':
        if (temp[1] == "student") {
          Student.all(DBModel.connection, function(data, err){
            if (!err) {
              for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
              }
            } else {
              console.log("Error");
            }
          })
        }
        else if (temp[1] == 'cohort') {
          Cohort.all(DBModel.connection, function(data, err){
            if (!err) {
              for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
              }
            } else {
              console.log("Error");
            }
          })
        }
        break;
        // case ware untuk mencari by id
        case 'where':
          if (temp[1] == "student") {
            Student.where(DBModel.connection, temp[2], function(data, err){
              if (!err) {
                for (var i = 0; i < data.length; i++) {
                  console.log(data[i]);
                }
              } else {
                console.log("Error");
              }
            })
          }
          else if (temp[1] == 'cohort') {
            Cohort.where(DBModel.connection, temp[2], function(data, err){
              if (!err) {
                for (var i = 0; i < data.length; i++) {
                  console.log(data[i]);
                }
              } else {
                console.log("Error");
              }
            })
          }
          break;
        // case update
        case 'update':
          if (temp[1] == "student") {
            let student_name = {}
            Student.find(DBModel.connection, 1, function(id){
                student_name.id = temp[2]
                student_name.name = temp[3]
                Student.update(DBModel.connection, student_name.id, student_name.name)
            })
          }
          else if (temp[1] == 'cohort') {
            let cohort = {}
            Cohort.find(DBModel.connection, 1, function(id){
                cohort.id = temp[2]
                cohort.name = temp[3]
                Cohort.update(DBModel.connection, cohort.id, cohort.name)
            })
          }
          break;
        // case default
        default:
          console.log("tidak ada");
          break
    }

    this.displayPrompt();
  }
}

);
replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});
