"use strict"

class DBModel {
  static get connection(){
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./db/init.sql');
    return db
  }

  create_table_students() {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));`
    DBModel.connection.run(CREATE_TABLE, (err) => {
      if (err){
        console.log(err);
      }else{
        console.log('TABLE students CREATED');
      }
    })
  }

  create_table_cohorts() {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
    DBModel.connection.run(CREATE_TABLE, (err) => {
      if (err){
        console.log(err);
      }else{
        console.log('TABLE cohorts CREATED');
      }
    })
  }


}


export default DBModel
// export default repl

// console.log(dbModel.connection);
// dbModel.create_table_cohorts();
