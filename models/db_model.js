"use strict"

const repl = require('repl'); // optional
//SQL statements
class DBMOdel {
constructor(){
  this.sqlite = require('sqlite3').verbose();
  this.connection = new this.sqlite.Database('./db/data.db');
  }

createStudent(){
  let task = ["CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL ,cohort_id INTEGER NOT NULL);",
  "CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);"];
      this.connection.run(task[0], function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table group");
        }
      });
      this.connection.run(task[1], function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table group");
        }
      });
  }
}

export default DBMOdel
