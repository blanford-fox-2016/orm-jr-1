"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name, id){
    this.id = id || null
    this.name = name
  }

  static set name(value){
    this.name = value
  }

  // static get name(){
  //   return this.name
  // }

  static create(dbModel, newData){
    dbModel.serialize(function(){
      dbModel.run(`CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL)`, (err) => {
        if(err){
          console.log(err);
        }else{
          // console.log("Created Database, SUCCESS");
        }
      })
      dbModel.run(`INSERT INTO cohort (name) VALUES ('${newData.name}')`, (err) => {
          if(err){
            console.log(err);
          }else{
            console.log("Insert Data to Database, SUCCESS");
          }
        })
    })
  }

  static where(dbModel,where_clause,newData){
      dbModel.each(`SELECT * FROM cohort WHERE ${where_clause}`,(err, row)=>{
        newData([row.id, row.name],err)
      })
  }

  static find(dbModel, id, functionData){
    dbModel.each(`SELECT * FROM cohort WHERE id = ${id}`, (err, row) => {
      functionData(new Cohort(row.name, row.id))
    })
  }

  static update(dbModel, cohort){
    // console.log(cohort);
    dbModel.run(`UPDATE cohort set name = '${cohort.name}' WHERE id = '${cohort.id}'`, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`Updated`);
      }
    })
  }
}



export default Cohort
