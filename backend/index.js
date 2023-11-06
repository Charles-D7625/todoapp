const express  = require('express');
const app = express();
const cors = require('cors');

const mysql = require('mysql');

const connetion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

let tasks = [
    {
        id: 'todo-0',
        name: '123',
        completed: false
    },
    {
        id: 'todo-1',
        name: 'qwerty',
        completed: true
    }
]

connetion.connect(function(err) {
    if(err) {
        console.log(err.code);
        console.log(err.fatal);
    }

    connetion.query("SELECT * FROM todolist", function(err, result, fields) {
        if (err) {
            console.log("Error");
            return;
        }

        tasks = result;
    })
});

function selectQuery() {
    connetion.query("SELECT * FROM todolist", function(err, result, fields) {
        if (err) {
            console.log("Error");
            return;
        }

        tasks = result;
    })
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    
})

app.get('/app/get', (req, res) => {
    res.send(tasks);
})

app.post('/app/post', (req, res) => {
    
    const newTask = [req.body.id, req.body.name, req.body.completed];

    connetion.query("INSERT INTO todolist (id, name, completed) VALUES (?,?,?)", newTask, function(err, result, fields) {
        if (err) {
            return console.error(err.message); 
        }

        console.log("INSERT SUCCESS");
        selectQuery();
    })
})

app.put('/app/putName/:id', (req, res) =>{

    connetion.query("UPDATE todolist SET name = " + mysql.escape(req.body.name) + " WHERE id = " + mysql.escape(req.params.id), function (err, result) {
        if (err) {
            return console.error(err.message); 
        }

        console.log("UPDATE SUCCESS");
        selectQuery();
    })
})

app.put('/app/putToggle/:id', (req, res) =>{

    connetion.query("UPDATE todolist SET completed = " + mysql.escape(req.body.completed) + " WHERE id = " + mysql.escape(req.params.id), function (err, result) {
        if (err) {
            return console.error(err.message); 
        }

        console.log("UPDATE SUCCESS");
        selectQuery();
    })
})

app.delete('/app/delete/:id', (req, res) => {
    connetion.query("DELETE FROM todolist WHERE id = " + mysql.escape(req.params.id), function (err, result) {
        if (err) {
            return console.error(err.message); 
        }

        console.log("DELETE SUCCESS");
        selectQuery();
    })
})


app.listen(3004, () => {
    console.log('Server is running');
})