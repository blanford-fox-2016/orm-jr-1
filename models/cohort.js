"use strict"

import Student from "./student.js";
// var stmt = db.prepare("INSERT INTO students VALUES (?,?,?,?)")
class Cohort {
constructor(name){
  this.name = name;
}

static create(db,cohort){
  db.run(`INSERT INTO cohort (name) VALUES ('${cohort.name}');`, (err)=>{
  if(err){
  console.log(err);
    }else{
    console.log("Insert cohort Success");
    }
  });
  }

static where(dbModel,  condition,cb){
  dbModel.each(`SELECT * FROM students WHERE ${condition};`, cb);
}

static list(dbModel){
  dbModel.all(`SELECT * FROM cohort;`,function(err,result){
    if(err){
    console.log(err);}
    else{
      console.log(result);
    }
  })
}

static find(dbModel,id_number,cb){
  dbModel.run(`SELECT * FROM cohort WHERE id ='${id_number}';`, function(err,data){
    if(err){
      console.log(err);
    }else {
      console.log(data);
    }
  }, cb);
}

  static all(dbModel, functionData){
    dbModel.each(`SELECT * from cohort`, (err, row) => {
    console.log("--------------data------------");
    functionData(["student id " +row.id , "first name "+row.firstname,"lastname " +row.lastname,"cohort id " + row.cohort_id], err)
    })
  }

  static update(dbModel,name){
    dbModel.run(`UPDATE cohort set name='${name}' where name='${name}';`,function(err){
      if (err) {
        console.log(err);
      }else {
          console.log("berhasil terupdate");
      }
    })
  }

  static delete(dbModel,id){
    dbModel.run(`DELETE FROM cohort where id ='${id}';`,function(err){
      if (err) {
        console.log(err);
      }else {
          console.log("berhasil delete");
      }
    })
  }


}

export default Cohort
