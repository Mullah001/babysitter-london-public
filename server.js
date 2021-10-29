const express = require("express");
const app = express();

const dbService = require("./dbService");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createPost', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const formValues = req.body.formValues;

    console.log(req.body);

    const response = db.createPost(formValues);

    console.log(response);

    response
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.post('/disablePost', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const id = req.body.id;

    const response = db.disablePost(id);

    console.log(response);

    response
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.get('/', (req, res) => {
    res.send("Working");
});

app.get('/getPosts', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getPosts();

    result
        .then(data => {
            loggedUser = data;
            res.json(data);
        })
        .catch(err => console.log(err));
});

app.get('/quit', function (req, res) {
    res.send('closing..');
    server.close();
});

const ip = '199.192.19.29' | 'localhost';
const server = app.listen('3000', ip, () => {
    console.log(`Server Running at: ${ip}:3000`);
});

