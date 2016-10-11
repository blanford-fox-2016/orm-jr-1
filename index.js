"use strict"

import DBMOdel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

var dbMOdel = new DBMOdel();
//dbMOdel.createStudent()
//console.log(dbMOdel.createStudent());
//udah create
// Student.create(dbMOdel.connection, new Student("Rubi","henjaya",1));
// Student.create(dbMOdel.connection, new Student("Riza","Fahmi",1));
// Student.create(dbMOdel.connection, new Student("toni","henjaya",2));
// Student.create(dbMOdel.connection, new Student("cen","itu",1));
// Student.create(dbMOdel.connection, new Student("elkan","ini",2));
// Student.create(dbMOdel.connection, new Student("aji","anda",1));
// Student.create(dbMOdel.connection, new Student("lantang","mereka",3));
// Student.create(dbMOdel.connection, new Student("budi","kita",1));
// Student.create(dbMOdel.connection, new Student("anduk","semua",3));
// Student.create(dbMOdel.connection, new Student("nah","sama",2));
// Cohort.create(dbMOdel.connection, new Cohort("Math"));
// Cohort.create(dbMOdel.connection, new Cohort("Yoga"));
// Cohort.create(dbMOdel.connection, new Cohort("Enginering emphaty"));
// //
// Student.all(dbMOdel.connection, function(data, err){
//   if(!err){
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   }else {
//     console.log('Error');
//   }
// })

Cohort.where(dbMOdel.connection, 'cohort_id = 2',
function (err, data){
  console.log(data);
  if(err){
      console.log('Error/remember cohort_id = (number)');
  }
});
// Cohort.create(dbMOdel.connection, new Cohort("Mysql"));
// Student.update(dbMOdel.connection,1,"wahyu","hidayat");
// Student.delete(dbMOdel.connection,10)
// let cohort
// Cohort.find(dbMOdel.connection,1,
//   function(data){
//     cohort = data;
//   }) ;

Cohort.update(dbMOdel.connection,cohort)
