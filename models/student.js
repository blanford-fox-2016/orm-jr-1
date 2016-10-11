"use strict"
import DBModel from './db_model.js';


class Student {
  constructor(property){
    this.firstname = property['firstname']
    this.lastname = property['lastname']
    this.cohort_id = property['cohort_id']
  }

  static create(connection, object){
    let INSERT_DATA = connection.prepare(`INSERT INTO students VALUES (null, ?, ?, ?)`);
    INSERT_DATA.run(object.firstname, object.lastname, object.cohort_id, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data inserted`);
      }
    });
    INSERT_DATA.finalize();
  }

  static all(connection) {
    let READ_ALL = `SELECT * FROM students`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.cohort_id}`);
      }
    });
  }

  static findById(connection, id, cb) {
    let FIND_ID = `SELECT * FROM students WHERE id = '${id}'`;
    connection.each(FIND_ID, cb)
  }

  static findByName(connection, name, cb) {
    let FIND_NAME = `SELECT * FROM students WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`;
    connection.each(FIND_NAME, cb)
  }

  static where(connection, condition) {
    let WHERE = `SELECT * FROM students WHERE ${condition}`;
    connection.each(WHERE, cb)
  }

  static update(connection, col, val, id) {
    let UPDATE = connection.prepare(`UPDATE students SET '${col}' = ? WHERE id = ?`);
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
    let DESTROY_DATA = `DELETE FROM students WHERE ${condition}`;
    connection.run(DESTROY_DATA, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data Deleted`);
      }
    })
  }


}

export default Student

// Student.where(DBModel.connection, "firstname LIKE '%tama%' ");
// Student.destroy(DBModel.connection, "id=2")

// Student.create(DBModel.connection, new Student({firstname: 'Ahyana', lastname: 'Rizky', cohort_id: 2}));
// Student.all(DBModel.connection)
// Student.findByName(DBModel.connection, '')
