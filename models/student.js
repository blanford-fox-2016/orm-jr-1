"use strict"

class Student {
  constructor(firstname,lastname,cohort_id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
  }



  static create(dataModel, param) {

    dataModel.serialize(function(){
    dataModel.run("CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INT, FOREIGN KEY(cohort_id) REFERENCES cohort(id))", function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table");
        dataModel.serialize(function(){
          dataModel.run(`INSERT INTO student VALUES (null, '${param.firstname}', '${param.lastname}', '${param.cohort_id}');`, function(err){
            if(err){
              console.log(err);
            }else{
              console.log("Succes! insert 1 row");
            }
          });
        });
      }
    });
  });
  }

  static all(dataModel) {
    
    dataModel.each("SELECT * FROM student", function(err, row) {
    console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.cohort_id);
      });

  } // end all method

}

export default Student
