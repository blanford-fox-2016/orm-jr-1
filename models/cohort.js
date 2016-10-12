"use strict"

import Student from "./student.js";

class Cohort {
  constructor(cohort_name) {
    this.cohort_name = cohort_name
  }


  static create(dataModel, param) {
    dataModel.serialize(function(){
    dataModel.run("CREATE TABLE IF NOT EXISTS cohort_table (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT NOT NULL)", function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table cohort");
        dataModel.serialize(function(){

          dataModel.run(`INSERT INTO cohort_table VALUES (null, '${param.cohort_name}');`, function(err){
            if(err){
              console.log(err);
            }else{
              console.log(`Succes! insert 1 '${param.cohort_name}'`);
            }
          });

        });
      }
    });
  });
  }

  static where(dataModel, where, view) {
    var test = []
    dataModel.all(`SELECT * FROM cohort_table WHERE id = ${where}`, function(err, rows) {
    //console.log(row.id + ": " + row.cohort_name);

      view(rows)
    });


  } // end where method

  static find(dataModel, id, cb) {
    // console.log("test");
    dataModel.serialize(function(){
      dataModel.each(`SELECT * FROM cohort_table WHERE id = ${id}`, function(err, row) {
      // console.log(row.id);
      cb(row.id)
      // return row.cohort_name

        });
    })
  }

  static update(dataModel, cohort, name) {
    dataModel.run(`UPDATE cohort_table SET cohort_name = '${name}' WHERE id = ${cohort}`, function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`Succes! UPDATE '${cohort}'`);
      }
    });
  }

} // end class

export default Cohort
