
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const base = require('./base.json')
const path = require('path');
const app = express()
const port = 3000
const server = createServer(app);
const io = new Server(server);


let task = base

let id = 1




function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}
function addTask(params) {

    let arr = []
    fs.readFile('base.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        task.forEach(element => {
            // console.log(element);
            arr.push(element.id)

        });
        if (task.length) {
            id = getMaxOfArray(arr) + 1
            
        } else {
            id = 1
        }


        task.push({
            id: id,
            task: params,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        })



        let json = JSON.stringify(task);
        fs.writeFile('./base.json', json, () => { })
    });




}


// const connection = mysql.createConnection(

// )

const creatPath = (page) => path.resolve(__dirname, 'ejs-view', `${page}.ejs`)

app.set('view_engine', 'ejs')
server.listen(port, () => {
    console.log('server running at http://localhost:3000');
});
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get('/', (req, res) => {
    // console.log(req.body);
    res.render(creatPath('index'), { task })
})

app.post('/', (req, res) => {
    if (req.body.addTask) addTask(req.body.addTask)
    if (req.body.trash) addTask(req.body.trash)
    if (req.body.del) delTask(req.body.del)

    res.redirect('/')
})

function delTask(itemId) {


    fs.readFile('base.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        let items = JSON.parse(data);
        items = items.filter(item => item.id != itemId);


        fs.writeFile('base.json', JSON.stringify(items, null, 2), () => { })
        task = items


    });


};


// io.on('connection', (socket) => {


// });
