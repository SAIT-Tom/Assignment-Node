var express = require('express');
var router = express.Router();


// List of greatings  
var greatings_list=["Hallo","Mirë dita","مرحبا","Kaixo","Hola","Moni",
"Bonghjornu","Bok","سلام","Saluton","Bonjour","שלום","नमस्ते","Ciao",
"안녕","你好","سلام","Olá","Hola"];

// Fun generate random int number from range [min , max]
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

var greatings = greatings_list[getRndInteger(0,greatings_list.length-1)];


/* Home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    
    random_greatings: greatings,  
    
  });

});

/* About page. */
router.get('/about', function (req, res) {
  res.render('about')
});

module.exports = router;

















module.exports = router;
