"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";


// setup environment

let dbModel = new DBModel();
//dbModel.create();

Student.create(dbModel.connection, new Student("Ruby", "Henjaya", 1));
Student.create(dbModel.connection, new Student("Juang", "Wiantoro", 1));
