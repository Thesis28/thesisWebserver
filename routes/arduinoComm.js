var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var querystring = require('querystring');
var mysql = require('mysql');
var url = require('url');
var crypto = require("crypto");

var key = new Buffer( '5B5A57676A56676E', 'hex' );
var iv = new Buffer(8);
iv.fill(0);
var outputData;





router.use(bodyParser.text({ type: 'text/html' }));

router.get ('/', function(req, res) {
  sqlInsert2(req,dataString);
  
  speedbar = 0;
  turnbar = 0;
  res.write(outputData);
  res.end();
});

function sqlInsert2(req,callback){
  /*
  if(commandID==lastCommand){
      var sql = "UPDATE thesistable SET encoder1='"+req.query.encoder1+"', cmdreceived=1 WHERE ID = '"+commandID+"'";
      con.query(sql, function (err, result) {
       if (err) throw err;
       //console.log("1 record inserted");
       lastCommand+=1;
      });
  }
  */
  callback(encryptDES);
}

function dataString(callback) { 
  var returnString = "?LED=";
  returnString += LED;
  returnString += "&speedbar=";
  returnString += speedbar;
  returnString += "&turnbar=";
  returnString += turnbar;
  returnString += "&power=";
  returnString += power;
  returnString += "&servos=";
  returnString += servos;
  returnString += " "; 
  
  var len = returnString.length;
  var padding = 64-len;
  for(var i = 0;i<padding;i++){
    returnString += " ";
  }
  callback(returnString);
} 

function encryptDES(plaintext){
    outputData="";
    for(var i = 0;i<64;i+=8){
        var subStr = plaintext.substring(i,i+8);
        var cipher = crypto.createCipheriv("des", key,iv);
        cipher.setAutoPadding(false);
        var c = cipher.update( subStr, 'binary', 'hex' );
        c+=cipher.final('hex' );
        outputData += c;
    }
}

module.exports = router;