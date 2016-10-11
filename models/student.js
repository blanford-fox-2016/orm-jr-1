"use strict"

class Student {
  constructor(firstname, lastname, cohort_id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
  }

  static create(dbModel, newData){
    dbModel.serialize(function(){
      dbModel.run(`CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname NOT NULL, lastname NOT NULL, cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohort(id))`, (err) => {
        if(err){
          console.log(err);
        }else{
          //console.log("Created Database, SUCCESS");
        }
      })

      dbModel.run(`INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${newData.firstname}', '${newData.lastname}', '${newData.cohort_id}')`, (err) => {
        if(err){
          console.log(err);
        }else{
          console.log("Insert Data to Database, SUCCESS");
        }
      })
    })
  }

  static all(dbModel, functionData){
    // console.log(functionData);
    dbModel.each(`SELECT * from student`, (err, row) => {
      // console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.cohort_id}`);
      functionData([row.id, row.firstname, row.lastname, row.cohort_id], err)
    })
  }
}

export default Student
