//Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//Read comments from file
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        res.send(data);
    });
});
//Create new comment
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        const comments = JSON.parse(data);
        const newComment = req.body;
        newComment.id = comments.length + 1;
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Could not write comments file');
                return;
            }
            res.send('Comment added');
        });
    });
});
//Start server
app.listen(3000, () => {
    console.log('Server started');
});