"use strict"
let sqlite3 = require('sqlite3')

class DBModel {
  constructor(){
    this.connection = new sqlite3.Database('./db/data.db')
  }

}

export default DBModel
