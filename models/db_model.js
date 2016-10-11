"use strict"

class DBModel {
  constructor(){

  }
  static get connection(){
    let sqlite = require('sqlite3').verbose();
    let db = new sqlite.Database('./db/init.db')
    return db
  }
}

export default DBModel
