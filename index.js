"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";




// Student.create(DBModel.connection, new Student("Rubi", "Henjaya", 1))
// Student.create(DBModel.connection, new Student("Riza", "Fahri", 1))
// Cohort.create(DBModel.connection, new Cohort("Fisika"))


// Student.all(DBModel.connection, function(data, err){
//   if (err) {
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


let cohort
Cohort.find(DBModel.connection,1,
  function(data){
    cohort = data
    Cohort.update(DBModel.connection, cohort)
    // return cohort
    // console.log(data);
})
//console.log(cohort);
// Cohort.update(DBModel.connection, cohort)
// cohort.name = 'Best Cohort Ever'
// Cohort.update(DBModel.connection, cohort)
