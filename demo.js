const express = require('express');
var pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const port = 3000;


var json = fs.readFileSync('./data.json', 'utf8');
var data = JSON.parse(json);
headerData = {
    name: 'Jane Doe',
    gender: 'Female',
    dob: '9 May, 1964',
    examDate: '10 june, 2019'
}


app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send("<a href='/report.pdf'>GET PDF FILE</a>"));



app.get('/report.pdf', (req, res) => {

    var html;
    ejs.renderFile('./views/home.ejs', { data, headerData }, function (err, result) {
        console.log(result);
        // render on success
        if (result) {
            html = result;
        }
    });

    var options = {
        "base": "file://",
        "height": "482mm",
        "width": "415mm",

        "header": {
            "height": "200px",

        },
        "footer": {
            "height": "75px",
            "contents": {
                default: '<p style="text-align:center;">Page&nbsp;{{page}}<span>&nbsp;of&nbsp;</span>{{pages}}</p>', // fallback value

            }
        },
        "border": {
            "top": "20px",
            "right": "40px",
            "bottom": "20px",
            "left": "40px"
        },
    }
    // pdf.create(html, options).toFile('/home/zadmin/Desktop/demonode1.pdf', function (err, res) {
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    // });

    pdf.create(html, options).toStream(function (err, stream) {
        if (err) return res.send(err);
        res.type('pdf');
        stream.pipe(res);

    });



})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));




