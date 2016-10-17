// Run this file one time only when you try to generate table

import DBModel from "./models/db_model.js";

let dbModel = new DBModel();

dbModel.createStudents();
dbModel.createCohorts();
