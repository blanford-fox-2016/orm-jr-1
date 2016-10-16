'use strict'
const repl = require('repl')
const sqlite = require('sqlite3')

var file = 'data.db'
var db = new sqlite.Database(file)

class Person {
  constructor(firstname,lastname) {
    this.firstname = firstname
    this.lastname = lastname
  }

//var person = new Person('toni','chen')
static runPerson(idPerson){
  db.run(`update students set firstname='budi' where id = ${idPerson}`,function(err){
    if(err)console.log(err);
    else console.log(`data inserted!`);
    })
  }

  static list(){
      db.serialize(function(){
    db.all(`select * from students`,function(data,err){
      if(err)console.log(err);
      else console.log(data);
      })
    }
  )}
}

Person.list()
