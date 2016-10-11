"use strict"

// import Student from "./student.js";
import DBModel from './db_model.js';

class Cohort {
  constructor(property){
    this.name = property['name']
  }

  static create(connection, object){
    let INSERT_DATA = connection.prepare(`INSERT INTO cohorts VALUES (null, ?)`);
    INSERT_DATA.run(object.name, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data inserted`);
      }
    });
    INSERT_DATA.finalize();
  }

  static all(connection) {
    let READ_ALL = `SELECT * FROM cohorts`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.name} `);
      }
    });
  }

  static cohort_students(connection, id) {
    let COHORT_STUDENTS = `SELECT students.firstname, students.lastname, cohorts.name FROM students JOIN cohorts ON students.cohort_id = cohorts.id WHERE students.cohort_id = '${id}'`;
    console.log("Nama siswa | Angkatan");
    connection.each(COHORT_STUDENTS, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.firstname} ${row.lastname} |  ${row.name} `);
      }
    });
  }

  static findById(connection, id, cb) {
    let FIND_ID = `SELECT * FROM cohorts WHERE id = '${id}'`;
    connection.each(FIND_ID, cb)
  }

  static findByName(connection, name, cb) {
    let FIND_NAME = `SELECT * FROM cohorts WHERE name LIKE '%${name}%'`;
    connection.each(FIND_NAME, cb)
  }

  static where(connection, condition) {
    let WHERE = `SELECT * FROM cohorts WHERE ${condition}`;
    connection.each(WHERE, cb)
  }

  static update(connection,col, val, id) {
    let UPDATE = connection.prepare(`UPDATE cohorts SET '${col}' = ? WHERE id = ?`);
    UPDATE.run(val, id, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data updated`);
      }
    });
    UPDATE.finalize();
  }

  static destroy(connection, condition) {
    let DESTROY_DATA = `DELETE FROM cohorts WHERE ${condition}`;
    connection.run(DESTROY_DATA, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data Deleted`);
      }
    })
  }

}

export default Cohort
