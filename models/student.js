"use strict"

class Student {
  constructor(first_name, last_name, cohort_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.cohort_id = cohort_id;
  }

  static create(connection, object) {
    connection.run(`INSERT INTO students(first_name, last_name, cohort_id) VALUES ('${object.first_name}', '${object.last_name}', '${object.cohort_id}');`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Row is created");
      }
    });
  }

  static update(connection, id, first_name) {
    connection.run(`UPDATE students SET first_name = '${first_name}' WHERE id = '${id}'`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`First Name of your data is updated as '${first_name}'`);
      }
    });
  }

  static delete(connection, id) {

  }

  static showAll() {

  }

}

export default Student
