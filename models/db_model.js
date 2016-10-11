"use strict"

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/init.sql');

class DBModel {
  constructor() {
    this.connection = db;
  }

  create() {
    this.connection.run("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, cohort_id INTEGER)");
  }
}

export default DBModel
