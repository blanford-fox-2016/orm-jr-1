"use strict"
 class Student {
    constructor(firstname,lastname,groupID)
    {
      this.firstname = firstname
      this.lastname = lastname
      this.groupID = groupID
    }

    static create(dbModel,students)
    {
          dbModel.serialize(function(){
          // dbModel.run(`CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NOT NULL, lastname TEXT, groupID INTEGER , FOREIGN KEY(groupID) REFERENCES groups(id))`,function(err){
          //   if(err)console.log(err);
          //   else console.log(` table created!`);
          // }),
            dbModel.run(`insert into students(firstname,lastname,groupID) values ('${students.firstname}','${students.lastname}','${students.groupID}')`,function(err){
              if(err)console.log(err);
              else console.log(`data inserted!`);
        })
    })
  }

  static all(dbModel,callback)
  {
      dbModel.all(`select * from students`,function(err,row) {
        callback(row, err)
      })
  }

  static find(dbModel,studentID,callback)
  {
    dbModel.all(`select * from students where id = ${studentID}`,function(err,row){
      callback(row,err)
    })
  }

  static update(dbModel,firstname,lastname,studentID)
  {
    //console.log(groupID);
    dbModel.run(`update students set firstname = '${firstname}',lastname = '${lastname}' WHERE id = ${studentID[0].id};`)
  }

  static Destroy(dbModel, studentID)
  {
      dbModel.run(`delete from students where id = ${studentID}`)
  }

}
export default Student
