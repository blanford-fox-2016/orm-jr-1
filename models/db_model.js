"use strict"

let sqlite3 = require('sqlite3').verbose();
let file = new sqlite3.Database('db/init.sql');

class DBModel {
  constructor() {
    this.connection = file;
  }

  createStudents() {
    this.connection.run("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, cohort_id INTEGER)");
  }

  createCohorts() {
    this.connection.run("CREATE TABLE cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
  }
}

export default DBModel
