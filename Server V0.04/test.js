/*
var util = require('util');

function MyStream() {
    this.c = 1000;
}
MyStream.prototype.write = function(data) {
    console.log("mystream : " + data);
}
MyStream.prototype.hp = 100;

util.inherits(NewStream, MyStream);

function NewStream() {
    this.c = 10000;
}
NewStream.prototype.write = function(data) {
    console.log("newstream : " + data);
}

var stream = new NewStream();

console.log(stream instanceof MyStream);
console.log(NewStream.super_ === MyStream);

stream.write("YEAH!");

console.log(stream);
console.log(stream.hp);
console.log(stream.c);
stream.constructor.super_.prototype.write("YEAH!");
*/


var fs = require('fs');
var content = fs.readFileSync('/home/ila/Code/config/skill.js', 'utf8');
var DEFINE = {};
console.log(content.split("\n"));
var array = content.split("\n");
delete array[0];
content = array.join("\n");
DEFINE.skill = JSON.parse(content);

console.log(DEFINE.skill);

