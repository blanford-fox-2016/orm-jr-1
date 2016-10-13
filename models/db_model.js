"use strict"

class DBModel {
  constructor() {
    this.sqlite3 = require('sqlite3').verbose();
    this.connection = new this.sqlite3.Database('./db/init.sql');
  }

  create_table_students(cb) {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));`
    this.connection.run(CREATE_TABLE, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  create_table_cohorts(cb) {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
    this.connection.run(CREATE_TABLE, () => {
      if (cb != null) {
        cb();
      }
    })
  }


}


export default DBModel
// export default repl

// console.log(dbModel.connection);
// dbModel.create_table_cohorts();
