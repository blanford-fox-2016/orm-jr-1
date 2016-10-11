"use strict"
import DBModel from './db_model.js';


class Student {
  constructor(property){
    this.firstname = property['firstname']
    this.lastname = property['lastname']
    this.cohort_id = property['cohort_id']
  }

  static create(connection, object, cb){
    let INSERT_DATA = connection.prepare(`INSERT INTO students VALUES (null, ?, ?, ?)`);
    INSERT_DATA.run(object.firstname, object.lastname, object.cohort_id,
     () => {
      if (cb != null) {
        cb();
      }
    });
    INSERT_DATA.finalize();
  }

  static all(connection, cb) {
    let READ_ALL = `SELECT * FROM students`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.cohort_id}`);
      }
    }, () => {
      if (cb != null) {
        cb();
      }
    });
  }

  static findById(connection, id, cb) {
    let FIND_ID = `SELECT * FROM students WHERE id = '${id}'`;
    connection.each(FIND_ID, cb)
  }

  static findByName(connection, name, cb) {
    let FIND_NAME = `SELECT * FROM students WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`;
    connection.each(FIND_NAME, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  static where(connection, condition) {
    let WHERE = `SELECT * FROM students WHERE ${condition}`;
    connection.each(WHERE, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  static update(connection, col, val, id, cb) {
    let UPDATE = connection.prepare(`UPDATE students SET '${col}' = ? WHERE id = ?`);
    UPDATE.run(val, id, () => {
      if (cb != null) {
        cb();
      }
    });
    UPDATE.finalize();
  }

  static destroy(connection, condition, cb) {
    let DESTROY_DATA = `DELETE FROM students WHERE ${condition}`;
    connection.run(DESTROY_DATA, () => {
      if (cb != null) {
        cb();
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
