"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.id = id || null
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

  static where(dbModel,where_clause,newData){
      dbModel.each(`SELECT * FROM student WHERE ${where_clause}`,(err, row)=>{
        newData([row.id, row.firstname, row.lastname],err)
      })
  }

  static find(dbModel, id, functionData, cb){
    let newStudent
    dbModel.each(`SELECT * FROM student WHERE id = ${id}`, (err, row) => {
      // console.log(row.name);
      // console.log(row);
      newStudent = new Student(row.firstname, row.lastname, row.cohort_id, row.id)
      functionData(newStudent)
      cb != null ? cb(newStudent) : ''
    })
  }

  static update(dbModel, student){
    // console.log(student);
    dbModel.run(`UPDATE student set firstname = '${student.firstname}', lastname = '${student.lastname}', cohort_id = '${student.cohort_id}' WHERE id = '${student.id}'`, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`Updated`);
      }
    })
  }

}

export default Student
