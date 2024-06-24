const http = require('http');
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const base = require('./base.json')
const path = require('path');
const app = express()
const port = 3000


function add(params) {
    task.push({
        id: task.length,
        task: params,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    })

    let json = JSON.stringify(task);
    fs.writeFile('./base.json', json, () => { })
}


// const connection = mysql.createConnection(

// )
let task = base

const creatPath = (page) => path.resolve(__dirname, 'ejs-view', `${page}.ejs`)

app.set('view_engine', 'ejs')

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log(req.body);
    res.render(creatPath('index'), { task })
})

app.post('/', (req, res) => {
    if (req.body.addTask) add(req.body.addTask)
    if (req.body.trash) add(req.body.trash)

    res.redirect('/')
})

app.delete('/delete-item', (req, res) => {
    const itemId = req.body.id;
    console.log(itemId);
    fs.readFile('base.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        let items = JSON.parse(data);
        items = items.filter(item => item.id != itemId);


        fs.writeFile('base.json', JSON.stringify(items, null, 2), () => {})
    });
});


