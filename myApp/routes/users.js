var express = require('express');
var router = express.Router();

const items = ['Ananya', 'Aditi', 'Aarav', 'Aarvi', 'Rita'];
 

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.send(items);
});


module.exports = router;
