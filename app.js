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