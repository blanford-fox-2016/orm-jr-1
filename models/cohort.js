"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name) {
    this.identity = name;
  }

  static create(connection, object) {
    connection.run(`INSERT INTO cohorts (name) VALUES ('${object.name}');`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Row is created");
      }
    });
  }
}

export default Cohort
