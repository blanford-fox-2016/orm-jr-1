const repl = require('repl');
var pilih = "";
pilih = 'sayhello';

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action: function(name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    console.log(`Hello, ${name}!`);

    switch (name) {
      case 'babi':
        console.log('llalalal');
        break;
      default:
      console.log("asasas");
      break
    }

    this.displayPrompt();
  }
}

);
replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});
