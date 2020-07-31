const command = process.argv[2];
const axios  = require('axios');
const {to} = require('await-to-js');
let moment = require("moment");

async function getListOfContests() {
    let [err, res] = await to(axios.get('https://clist.by/get/events/'));
    if (err) {
        console.log("Error from api", err);
    }

    let t = new Date();
    t = t.getTime();
    switch (command) {
        case "past":
            console.log(`########---PAST EVENTS---########`);
            res.data.forEach(ele => {
                let s = new Date(ele.start);
                let e = new Date(ele.end);
                if (moment(s).isBefore(t) && moment(e).isBefore(t)) {
                    console.log(ele);
                }

            });
            break;
        case "running":
            console.log(`########---PRESENT EVENTS---########`);
            res.data.forEach(ele => {
                let s = new Date(ele.start);
                let e = new Date(ele.end);
                if (moment(s).isBefore(t) && moment(e).isAfter(t)) {
                    console.log(ele);
                }

            });
            break;
        case "future":
            console.log(`########---FUTURE EVENTS---########`);
            res.data.forEach(ele => {
                let s = new Date(ele.start);
                let e = new Date(ele.end);
                if (moment(s).isAfter(t) && moment(e).isAfter(t)) {

                    console.log(ele);
                }
            });
            break;
        default:
            console.log(
                'Please enter any of the command, ("past","upcoming" or "running").'
            );


    }
}
getListOfContests();