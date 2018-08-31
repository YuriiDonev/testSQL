
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const SELECT_ALL_CARS = 'SELECT * FROM newCars';

const sql = require("mssql/msnodesqlv8");
const conn = new sql.ConnectionPool({
  database: "TEST_SQL",
  server: "A050413",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
});

app.use(function(req,res,next){
 var _send = res.send;
  var sent = false;
  res.send = function(data){
      if(sent) return;
      _send.bind(res)(data);
      sent = true;
  };
  next();
});

app.get('/', (req, res)=> {
  res.send('go to /cars');
});

app.get('/cars', (req, res) => {
  conn.connect().then(() => {
    conn.request().query(SELECT_ALL_CARS, (err, result) => {
      if (err) res.send(err);
      res.json({data: result});
      conn.close();
    });
  });
});

app.post('/cars/add', (req, res) => {
  // console.log('req.body ', req.body);
  conn.connect().then(() => {
    conn.request().query(req.body.query, (err, result) => {
      if (err) {
        res.json({err});
      }
      res.json({data: result});
      conn.close();
    });
  });
});

app.listen(4000, () => {
  console.log('Cars server listening on 4000');
});
