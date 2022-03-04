/* jshint node:true */
// var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  message: "Release %@",
  publish: true,
  afterPublish: function (project, versions) {
    runCommand('ember github-pages:commit --message "Released ' + versions.next + '"');
    runCommand('git push origin gh-pages:gh-pages');
  },
};

function runCommand(command) {
  console.log('Running: ' + command);
  var output = execSync(command, {encoding: 'utf8'});
  console.log(output);
}