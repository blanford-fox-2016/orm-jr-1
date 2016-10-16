"use strict"
//
const repl = require('repl');
import DBModel from './models/db_model.js'
import Cohort from './models/cohort.js'
import Student from './models/student.js'

var dbModel = new DBModel()
//var cohort = new Cohort()
// Student.create(dbModel.connection, new Student("Riza","Fahmi",1))
// Student.create(dbModel.connection, new Student("Rubi","Henjaya",1))
//Cohort.create(dbModel.connection,new Cohort("Math"))



// Student.all(dbModel.connection,function(data,err){
//   if(!err){
//     for(var i=0;i<data.length;i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// })
//
// Cohort.where(dbModel.connection,'groups.id=1',function(data,err){
//   if(!err){
//     for(var i=0;i<data.length;i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// })

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('command', {
  help: '\n\n============= Students ==============\n\naddStudent(firstname,lastname,groupID)\nlistStudent\nupdateStudent (student_id,firstname,lastname)\ndestroyStudent(studentID)\n\n============= Groups ==============\n\naddGroup (groupName)\nlistGroup\nupdateGroup (group_id,group_name)\ndestroyGroup(groupID)\n',
  action: function(name) {
var splitName = name.split(' ')
    switch (splitName[0]) {
      case 'addStudent':
        Student.create(dbModel.connection, new Student(splitName[1],splitName[2],splitName[3]))
      break;

      case 'listStudent':
      Student.all(dbModel.connection,function(data,err){
        if(!err){
          for(var i=0;i<data.length;i++){
            console.log(data[i]);
          }
        }else{
          console.log('Error');
        }
      })
      break;

      case 'updateStudent':
      Student.find(dbModel.connection,splitName[1],
          function(data){
          Student.update(dbModel.connection,splitName[2],splitName[3],data)
          console.log('Student name updated!');
      })
      break;
      case 'destroyStudent':
      Student.Destroy(dbModel.connection,splitName[1])
      break;

      case 'addGroup':
      var string = ''
      for(var i=1;i<splitName.length;i++)
      {
        string +=' '+splitName[i]
      }
      Cohort.create(dbModel.connection,new Cohort(string))
      break;
      case 'listGroup':
      Cohort.all(dbModel.connection,function(data,err){
        if(!err){
          for(var i=0;i<data.length;i++){
            console.log(data[i]);
          }
        }else{
          console.log('Error');
        }
      })
      break;
      case 'updateGroup':
      Cohort.find(dbModel.connection,splitName[1],
          function(data){
          var string = ''
          for(var i=2;i<splitName.length;i++)
          {
            string +=' '+splitName[i]
          }
          Cohort.update(dbModel.connection,string,data)
          console.log('Group name updated!');
      })
      break;
      case 'destroyGroup':
      Cohort.Destroy(dbModel.connection,splitName[1])
      break;
      default:
      console.log('error');
      break;
    }
    this.displayPrompt();
  }
});

replServer.defineCommand('Exit', function() {
  console.log('Goodbye!');
  this.close();
});
