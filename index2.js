const command = process.argv[2];
//const {to} = require('await-to-js');
var request = require('request');
let moment = require("moment");

async function getListOfContests(){
    request('https://clist.by/get/events/', function (error, response, body) {
            if (error) {
                console.log("Error from api", err);
            }

            let res = JSON.parse(body);
            let t = new Date();
            t = t.getTime();

            if (command == "past") {
                console.log(`########---PAST EVENTS---########`);
                res.forEach(ele => {
                    let s = new Date(ele.start);
                    let e = new Date(ele.end);
                    if (moment(s).isBefore(t) && moment(e).isBefore(t)) {
                        console.log(ele);
                    }

                });
            } else if (command == "running") {
                console.log(`########---RUNNING EVENTS---########`);
                res.forEach(ele => {
                    let s = new Date(ele.start);
                    let e = new Date(ele.end);
                    if (moment(s).isBefore(t) && moment(e).isAfter(t)) {
                        console.log(ele);
                    }

                });
            } else if (command == "upcoming") {
                console.log(`########---UPCOMING EVENTS---########`);
                res.forEach(ele => {
                    let s = new Date(ele.start);
                    let e = new Date(ele.end);
                    if (moment(s).isAfter(t) && moment(e).isAfter(t)) {

                        console.log(ele);
                    }
                });
            } else {
                console.log(
                    'Please enter any of the command, ("past","upcoming" or "running").'
                );
            }
        });
}

getListOfContests();