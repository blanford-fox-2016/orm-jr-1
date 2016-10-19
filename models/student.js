"use strict"

import DBModel from './db_model.js'

class Student {
  constructor(firstname, lastname, cohort_id){
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
  }

  static create_table(connection){
    connection.serialize(() =>{
      connection.run("CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, cohort_id INTEGER);", (err) =>{
       if(err){
           console.log(err);
       }else{
         console.log("Table Student Created");
       }
     })
   })
  }

  static create(connection, obj){
      let INSERT = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', '${obj.cohort_id}');`
      //console.log(INSERT);
      connection.run(INSERT, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log('STUDENT ADDED');
        }
      })
  }

  static all(connection, cb){
    let READ_ALL = `SELECT * FROM student`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.cohort_id}`);
      }
    });
  }

  static destroy(connection, id){
    let DELETE = `DELETE FROM student WHERE id = ${id};`
    connection.run(DELETE, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${id} Deleted`);
      }
    })
  }

  static update(connection, param, val, id, cb){
    connection.run(`UPDATE student SET '${param}'='${val}' WHERE id=${id}`, (err)=>{
       if(err){
         console.log(err);
       }else{
         console.log("Ubah Data Success");
       }
     })
  }

}

// Student.create_table(DBModel.connection);
// var siswa = new Student("siswa","lama",1)
// siswa.create()
// siswa.all()

export default Student
