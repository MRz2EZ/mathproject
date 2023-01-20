const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use('*/js', express.static(path.join(__dirname, 'public/js')));
app.use('*/assets', express.static(path.join(__dirname, 'public/assets')));

app.use((req, res , next) => {
    console.log(`${res.statusCode} ${req.method}: ${req.originalUrl}, IP Socket: ${req.socket.remoteAddress}`);
    next();
});

app.get('/', (req, res, next) => {
    res.render('index');
    res.status(300);
});

const rate_info = [
    { name: "bbl", rate: {
        qy: 0.375,
        hy: 0.5,
        fy: 0.5,
    }},
    { name: "ktb", rate: {
        qy: 0.32,
        hy: 0.4,
        fy: 0.45,
    }},
    { name: "kbank", rate: {
        qy: 0.32,
        hy: 0.4,
        fy: 0.4,
    }},
    { name : "scb", rate: {
        qy: 0.32,
        hy: 0.4,
        fy: 0.4,
    }},
    { name: "gsb", rate: {
        qy: 0.375,
        hy: 0.5,
        fy: 0.5,
    }},
    { name: "bay", rate: {
        qy: 0.32,
        hy: 0.4,
        fy: 0.4,
    }},
];

app.post('/', (req, res, next) => {
    let info = {
        bank: req.body.bank,
        amount: Number(req.body.amount),
        time: Number(req.body.time),
    };
    info.time = (info.time > 12) ? 12 : (info.time < 1) ? 1 : info.time;
    info.amount = Math.abs(info.amount);
    let __cur__rate = 0;
    for(let i = 0; i<rate_info.length; i++) {
        if(info.bank === rate_info[i].name) {
            if(info.time <= 3) {
                __cur__rate = rate_info[i].rate.qy;
            } else if(info.time <= 6) {
                __cur__rate = rate_info[i].rate.hy;
            } else __cur__rate = rate_info[i].rate.fy;
        };
    };
    let interest_cal = Math.pow(1 + (__cur__rate/100), 0.0833333 * info.time);
    interest_cal = Number(interest_cal).toFixed(6);
    let mon_acc = Number(Number(info.amount) * Number(interest_cal));
    res.json({bank: info.bank, rate: __cur__rate, amount: info.amount, time: info.time, interest_recieved: Number(Number(mon_acc) - Number(info.amount)).toFixed(6), money_recieved: mon_acc.toFixed(6)});
    res.status(300);
});

app.use((req, res, next) => {
    res.send("Not Found!");
    res.status(404);
});

app.listen(port, () => {
    console.log(`Listening at ${port}!`);
});



/*
 _______  _______  ______   _______    ______              _        _______           _______           _______ 
(       )(  ___  )(  __  \ (  ____ \  (  ___ \ |\     /|  ( \      (  ___  )|\     /|(  ____ \|\     /|(  ___  )
| () () || (   ) || (  \  )| (    \/  | (   ) )( \   / )  | (      | (   ) |( \   / )| (    \/| )   ( || (   ) |
| || || || (___) || |   ) || (__      | (__/ /  \ (_) /   | |      | (___) | \ (_) / | |      | (___) || |   | |
| |(_)| ||  ___  || |   | ||  __)     |  __ (    \   /    | |      |  ___  |  \   /  | |      |  ___  || |   | |
| |   | || (   ) || |   ) || (        | (  \ \    ) (     | |      | (   ) |   ) (   | |      | (   ) || |   | |
| )   ( || )   ( || (__/  )| (____/\  | )___) )   | |     | (____/\| )   ( |   | |   | (____/\| )   ( || (___) |
|/     \||/     \|(______/ (_______/  |/ \___/    \_/     (_______/|/     \|   \_/   (_______/|/     \|(_______)
                                                                                                                
*/