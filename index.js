"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";


let dbModel = new DBModel();



Student.create(dbModel.connection, new Student("Ruby", "Henjaya", 1));
Student.create(dbModel.connection, new Student("Fahmi", "Riza", 1));
Student.create(dbModel.connection, new Student("juang", "wiantoro", 1));
Student.delete(dbModel.connection, 2);
Student.update(dbModel.connection, 3, "Bagus");
Student.showAll(dbModel.connection);
Cohort.create(dbModel.connection, new Cohort("America"));
