var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var querystring = require('querystring');



router.post ('/', function(req, res) {
    speedbar = req.body.speedbar;
    servos = req.body.servos;
    saveVariables(req,sqlInsert);
    commandID++;
    res.send('Command Sent');
});


router.get ('/', function(req, res) {
    if(req.query.conTest == 1){
        res.send('Success');
    }
    else{
        res.send('testFail');
    }
});



function saveVariables(req,callback){
    var address = req.connection.remoteAddress;
    var timeStart = Date();
    turnbar = req.body.turnbar;
    LED = req.body.LED;
    power = req.body.power;
    
    if(speedbar!=0){
        var servoTest = "";
        var subServo = servos.substring(12);
        servoTest += "155026265247"
        servoTest += subServo;
        servos = servoTest;
    }
    console.log(servos);
    callback(address,timeStart);
}

function sqlInsert(addr,time){
	/*
    var sql = "INSERT INTO thesistable (address, timestamp, speed, angle, power) VALUES ('"+addr+"','"+ time+"','" +speedbar+"','"+(turnbar*45)+"','"+power+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
	*/
}

module.exports = router;