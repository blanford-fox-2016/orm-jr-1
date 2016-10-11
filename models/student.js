"use strict"
const sqlite3 = require('sqlite3').verbose();
var file = "data.db";

class Student {
  constructor(firstname,lastname,cohort_id){
    this._firstname = firstname;
    this._lastname = lastname;
    this._cohort_id = cohort_id;
    // this.connection = new sqlite3.Database('db/init.sql');
  }

  set firstname(value){
    this._firstname = value;
  }

  set lastname(value){
    this._lastname = value;
  }

  set cohort_id(value){
    this._cohort_id = value;
  }

  get firstname(){
    return this._firstname
  }

  get lastname(){
    return this._firstname
  }

  get cohort_id(){
    return this._cohort_id
  }

  static create(db,students){
    // console.log(students);
    db.run(`INSERT INTO students(firstname,lastname,cohort_id) VALUES ('${students._firstname}','${students._lastname}','${students._cohort_id}');`, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Insert students Success");
    }
  });
  }

  static all(dbModel, functionData){
    dbModel.each(`SELECT * from students`, (err, row) => {
    console.log("--------------data------------");
    functionData(["student id " +row.id , "first name "+row.firstname,"lastname " +row.lastname,"cohort id " + row.cohort_id], err)
    })
  }

  static update(dbModel,id,firstname,lastname){
    dbModel.run(`UPDATE students set firstname='${firstname}',lastname='${lastname}' where id='${id}';`,function(err){
      if (err) {
        console.log(err);
      }else {
          console.log("berhasil terupdate");
      }
    })
  }

    static delete(dbModel,id){
      dbModel.run(`DELETE FROM students where id ='${id}';`,function(err){
        if (err) {
          console.log(err);
        }else {
            console.log("berhasil delete");
        }
      })
    }





}

export default Student
