"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

//Create
Student.create(DBModel.connection, new Student("Rubi1", "Henjaya", 1));
Cohort.create(DBModel.connection, new Cohort("Sos"));

//DESTROY
Student.destroy(DBModel.connection, 24)

//UPDATE
Student.update(DBModel.connection, 'firstname', 'BOBY', 22, function(data, err){
 if(!err){
   for(var i=0; i < data.length; i++){
     console.log(data[i]);
   }
 }else{
   console.log('Error');
 }
});

//READ
Student.all(DBModel.connection, function(data, err){
 if(!err){
   for(var i=0; i < data.length; i++){
     console.log(data[i]);
   }
 }else{
   console.log('Error');
 }
})

//SEARCH
Cohort.where(DBModel.connection, 'cohort.id=1', function(data, err){
 if(!err){
   for(var i=0; i < data.length; i++){
     console.log(data[i]);
   }
 }else{
   console.log('Error');
 }
});
