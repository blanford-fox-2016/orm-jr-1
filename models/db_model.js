"use strict"



class DBModel {
  constructor() {

  }

  static get connection() {
    const repl = require('repl');
    const db_Model = require('sqlite3').verbose();
    // write your code here
    var file = 'db_model.db';
    var db = new db_Model.Database(file);
    return db
  }

}


export default DBModel
