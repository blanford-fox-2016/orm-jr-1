"use strict"
class DBModel {
  constructor(){
    this.repl = require('repl')
    this.sqlite = require('sqlite3').verbose()
    this.file = './db/database.db'
    this.db = new this.sqlite.Database(this.file)
  }
  get connection()
  {
    return this.db
  }
}
export default DBModel
