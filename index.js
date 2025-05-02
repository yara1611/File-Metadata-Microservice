var express = require('express');
var cors = require('cors');
const multer = require('multer')
const upload = multer({dest:"uploads/"})
const bodyParser = require('body-parser')


require('dotenv').config()

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//{"name":"4_17SMS.png","type":"image/png","size":379403}
app.post('/api/fileanalyse',upload.single('upfile'),function(req,res){
    const file = req.file
    return res.json({
      name: file.originalname,
      type:file.mimetype,
      size:file.size
    })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
