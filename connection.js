const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

/*CORS isn’t enabled on the server, this is due to security reasons by default,

so no one else but the webserver itself can make requests to the server.*/

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
   
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    next();
   
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Luodaan yhteys
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0408'
});

// Yhdista
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});



// Luo tietokanta
app.post('/teetietokanta', (req, res) => {
    let sql = 'CREATE DATABASE db';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

//Tietokannan käyttöönotto
app.get('/tietokannankayttoonotto', (req, res) => {
    let sql = 'USE db';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tietokanta kaytossa...');
    });
});

// Luodaan taulu
app.post('/createregistrationtable', (req, res) => {
    let sql = 'CREATE TABLE registration(id int not null PRIMARY KEY, first varchar(255) , last varchar(255), age int)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Registration table created...');
    });
});

//Asetetaan tiedot
app.post('/asetatiedot', (req, res) => {
    let sql = "INSERT INTO registration(id,first, last, age) VALUES(1,'Aku','Ankka',45);";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tiedot asetettu...');
    });
});


// Tietueen päivitys
app.put('/paivita/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE registration SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Paivitetty...');
    });
});



// Tietueen poisto
app.delete('/poista/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM registration WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Poistettu...');
    });
});



app.listen('3000', () => {
    console.log('Server started on port 3000');
});
