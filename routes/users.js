var express = require('express');
var router = express.Router();

const Contact_request = require('../models/contactMdl').Contact_request;

var customer_name ='Dear customer'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Contact page 
router.get('/contact', function (req, res, next) {
  res.render('contact');
});

// Thank you page
router.get('/thanks', function (req, res, next) {
  res.render('thanks',{
    customer_name: customer_name
  });
  
});

// Received data from contact page
router.post('/contact', function (req, res, next) {
  
  const contact_request = new Contact_request(req.body);
  customer_name = req.body.customer_name;

 // save data from contact page to db
  contact_request.save(err => {
    // if(err) throw err;
    if (err) { 
      
      const errorArray = []; 
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      
      return res.render("contact", {
        request_data: req.body,
        errors: errorArray, 
      });
    }
    res.redirect("/users/thanks"); 
  });
});

module.exports = router;



