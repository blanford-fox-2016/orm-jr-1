"use strict"

class Cohort {
    constructor(cohortName)
    {
      this.cohortName = cohortName
    }
    static create(dbModel,cohort)
    {
          dbModel.serialize(function(){
          // dbModel.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL)`,function(err){
          //   if(err)console.log(err);
          //   else console.log(` table created!`);
          // }),
            dbModel.run(`insert into groups(groupname) values ('${cohort.cohortName}')`,function(err){
              if(err)console.log(err);
              else console.log(`data inserted!`);
        })
    })
  }

  static where(dbModel,groupID,callback)
  {
      dbModel.all(`select * from groups where id = ${groupID.split('=')[1]}`,function(err,row) {
        callback(row, err)
      })
  }

  static find(dbModel,groupID,callback)
  {
    dbModel.all(`select * from groups where id = ${groupID}`,function(err,row){
      callback(row,err)
    })
  }

  static update(dbModel,newGroup,groupID)
  {
    //console.log(groupID);
    dbModel.run(`update groups set groupname = '${newGroup}' WHERE id = ${groupID[0].id};`)
  }

  static Destroy(dbModel, groupID)
  {
      dbModel.run(`delete from groups where id = ${groupID}`)
  }

  static all(dbModel,callback)
  {
      dbModel.all(`select * from groups`,function(err,row) {
        callback(row, err)
      })
  }
}
export default Cohort
