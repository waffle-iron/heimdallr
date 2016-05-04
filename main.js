var Discord = require('discord.js');
var request = require('request');
var heimdallr = new Discord.Client({
  autorecoonect: true
});

var config = require('config.json'); //TODO: make an example config.json

heimdallr.loginWithToken(config.token, (error) => {
  error(error);
});

heimdallr.on('serverNewMember', (server, user) => {
  console.log('Join-Event s:' + server.name + ' u:' + user.name);
  bot.sendMessage(user, '```xl\nWelcome to #{config.server}.\r\n Please see the channel description in <##{config.welcomeChannel}>');
});

var handleResponse = function (message, question) {
  if (new RegExp(config.answers[question].join('|')).test(message.cleanContent)) {
    //match answer to role.... dunno how to do this yet...
  } else {
    bot.sendMessage(user, buildAnswerPrompt(config.answers[question]));
  }
};

var buildAnswerPrompt = function (answers) {
  var answerPrompt = '```xl\nApologies, Operator, that response was invalid. Valid answers are:\r\n';
  answers.forEach(function (answer) {
    answerPrompt += '#{answer}\r\n';
  });
  answerPrompt += 'Please respond with a valid answer to complete enrollment in #{config.server}```';
  return answerPrompt;
};

var interrogate = function () {
  config.questions.forEach(function (question) {
    bot.sendMessage(user, '```xl\n#{question}');
    bot.on('message', handleResponse(message, question));
  });
};

var error = function (e) {
  console.error('process failure...\r\n');
  console.error(e.stack);
  process.exit(1);//when it's running
};
