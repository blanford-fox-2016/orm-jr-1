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

  static all(dataModel, cb) {

    dataModel.all("SELECT student.id, student.firstname, student.lastname, cohort_table.cohort_name FROM student JOIN cohort_table ON student.cohort_id = cohort_table.id", function(err, row) {
    // console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.cohort_id);
        cb(row)
    });

  } // end all method

  static where(dataModel, where, view) {
    var test = []
    dataModel.all(`SELECT student.id, student.firstname, student.lastname, cohort_table.cohort_name FROM student JOIN cohort_table ON student.cohort_id = cohort_table.id WHERE student.id = ${where}`, function(err, rows) {
    //console.log(row.id + ": " + row.cohort_name);

      view(rows)
    });
  }

  static find(dataModel, id, cb) {
    // console.log("test");
    dataModel.serialize(function(){
      dataModel.each(`SELECT * FROM student WHERE id = ${id}`, function(err, row) {
      // console.log(row.id);
      cb(row.id)
      // return row.cohort_name

        });
    })
  }

  static update(dataModel, student, name) {
    dataModel.run(`UPDATE student SET firstname = '${name}' WHERE id = ${student}`, function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`Succes! UPDATE '${student}'`);
      }
    });
  }

}

export default Student
