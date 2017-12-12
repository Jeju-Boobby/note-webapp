// console.log('my-note app.js');
// require
var FileSaver = require('file-saver');

//DOM
var memo = document.getElementById('memo');
var btn_savenote = document.getElementById('btn-savenote');

var saveNote = function () {
  // console.log(memo.value);
  var blob = new Blob([memo.value], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "MyNote.txt");
}

btn_savenote.addEventListener('click', saveNote);
