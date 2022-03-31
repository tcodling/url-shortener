const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

let urls = [];
let short_urls = [];
let i = 0;

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
    if (isValidHttpUrl(req.body.url)) {
      const short_url = i
    i++
    short_urls.push(short_url)
    urls.push(req.body.url)
    res.json({
        original_url: req.body.url,
        short_url: short_url
    });
    } else {
      res.json({error: 'invalid url'})
    }
})

app.get('/api/shorturl/:id', (req, res) => {
    const redirectUrl = urls[req.params.id]
    res.redirect(redirectUrl)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});