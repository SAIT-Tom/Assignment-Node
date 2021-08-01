var mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator");

// Set up a mongoose connection
var mongoDB = "mongodb+srv://Rewu1234:Rewu1234@cluster0.ynufx.mongodb.net/customer_request?retryWrites=true&w=majority";


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("Connected to db.")
});


// new mongoose.Schema 

const postSchema = new mongoose.Schema({
    customer_name: { 
        type: String,
        required: "Please enter your name.",
        trim: true
    },

    customer_email: {   
        type: String,
        required: "Please enter your e-mail.",
        trim: true,
        validate: {
          validator: function (v) {
            return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
          },
          message: (props) => `${props.value} is not a valid Email address.`,
        },
      },

    request_title: { 
        type: String,
        required: "Please write a title.",
        trim: true
    },

    request_body: {
        type: String,
        required: "Please write a message.",
        trim: true,
        validate: {          
            validator: function (v) {
                return v.length > 5;
            },
            message: props => `${props.value} is message is too short. Minimum 5 characters `
        },

    },
    request_date: {
        type: String,
        default: new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate(),
        trim: true
    },
});

module.exports.Contact_request = mongoose.model('Contact_request', postSchema);