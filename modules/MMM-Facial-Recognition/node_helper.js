'use strict';
const NodeHelper = require('node_helper');

const {PythonShell} = require('python-shell');
var pythonStarted = false

module.exports = NodeHelper.create({
  
  python_start: function () {
    const self = this;
    // const pyshell = new PythonShell('modules/' + this.name + '/facerecognition/facerecognition.py', { mode: 'json', args: [JSON.stringify(this.config)]});
    const pyshell = new PythonShell('modules/' + this.name + '/facerecognition/face_reco_from_camera.py', { mode: 'json'});



    pyshell.on('message', function (message) {
      
      if (message.hasOwnProperty('login')){
        console.log("User " + message.login.user + " logged in.");
        // self.sendSocketNotification('user', {action: "login", user: message.login.user - 1, confidence: message.login.confidence});
        self.sendSocketNotification('user', {action: "login", user: message.login.user});     
      }
      if (message.hasOwnProperty('logout')){
        console.log("User logged out.");
        self.sendSocketNotification('user', {action: "logout", user: message.logout.user});
      }
    });

    pyshell.end(function (err) {
      if (err) throw err;
      console.log("[" + self.name + "] " + 'finished running...');
    });
  },
  
  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'CONFIG') {
      this.config = payload
      if(!pythonStarted) {
        pythonStarted = true;
        this.python_start();
        };
    };
  }
  
});