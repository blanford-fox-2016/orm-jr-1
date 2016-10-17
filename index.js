"use strict"

import DBMOdel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
const repl = require('repl')
var dbMOdel = new DBMOdel();
//
//create_table
let create = ()=>{
  dbMOdel.createStudent();
}
//create data
// function input()
let input = () => {
  Student.create(dbMOdel.connection, new Student("Rubi","henjaya",1));
  Student.create(dbMOdel.connection, new Student("Riza","Fahmi",1));
  Student.create(dbMOdel.connection, new Student("toni","henjaya",2));
  Student.create(dbMOdel.connection, new Student("cen","itu",1));
  Student.create(dbMOdel.connection, new Student("elkan","ini",2));
  Student.create(dbMOdel.connection, new Student("aji","anda",1));
  Student.create(dbMOdel.connection, new Student("lantang","mereka",3));
  Student.create(dbMOdel.connection, new Student("budi","kita",1));
  Student.create(dbMOdel.connection, new Student("anduk","semua",3));
  Student.create(dbMOdel.connection, new Student("nah","sama",2));
}
//udah create
//cohort function
let cohort = () =>{
  Cohort.create(dbMOdel.connection, new Cohort("Math"));
  Cohort.create(dbMOdel.connection, new Cohort("Yoga"));
  Cohort.create(dbMOdel.connection, new Cohort("Enginering emphaty"));
  Cohort.create(dbMOdel.connection, new Cohort("Mysql"));
}
//seeall
let seeAll = () =>{
  Student.all(dbMOdel.connection, function(data, err){
    if(!err){
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    }else {
      console.log('Error');
    }
  })
}
//seebyid
let kohort = (id) => {
  Cohort.where(dbMOdel.connection, `cohort_id = '${id}'`,
  function (err, data){
    console.log(data);
    if(err){
        console.log('Error/remember cohort_id = (number)');
    }
  });
}
//create cohort
let studenUpdate = (id,namadepan,namabelakang) => {
   Student.update(dbMOdel.connection,id,namadepan,namabelakang);
}

//deleteStudent
let hapus = (id) => {
  Student.delete(dbMOdel.connection,id)
}
// //
let updateCohort = (pelajaran) => {
  Cohort.update(dbMOdel.connection,pelajaran)
}
// let cohortByid search by id
let cohortByid = (id) => {
  Cohort.find(dbMOdel.connection,id,
    function(data){
      cohort = data;
      console.log(cohort);
    }) ;
}


var r = repl.start({prompt: 'isi perintah >'});
r.context.create = create//create
r.context.input = input//input(namadepan,namabelakang,jumlah)
r.context.cohort = cohort//cohort
r.context.seeAll = seeAll//seeAll
r.context.kohort = kohort//kohort(id) 
r.context.studenUpdate = studenUpdate // studenUpdate (student_id,namadepan,namabelakang)
r.context.hapus = hapus // delete(id)
r.context.updateCohort = updateCohort //updateCohort (pelajaran)
r.context.cohortByid = cohortByid//cohortByid(id)
