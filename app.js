const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 80;

// Express related Stuff
app.use(express.json())

// getting-started.js mongo database
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contact',{useNewUrlParser: true, useUnifiedTopology: true});  
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

// Define mongoose schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    email: String,
    phone: String,
    address: String,
  });

//Defining a Model
const Kitten = mongoose.model('contact', ContactSchema);

// Serving the contact.html;
app.get('/',(req,res) => {
    res.sendFile(__dirname+"/contact.html");
})

// MY METHOD

app.post('/contact' , async(req,res) => {
      var myData = new Kitten(req.body);
      await myData.save((err,myData) => {
        if (err) return res.status(400).send("Item was not saved to the database");
        res.send('Your item is saved to the Data base');
        
      }); 
})

// HARRY METHOD

// app.post('/contact' , (req,res) => {
//       var myData = new Kitten(req.body);
//        myData.save().then(() => {
//         res.send('Your item is saved to the Data base');
//       }).catch(() => {
//         res.send(400).send("Item was not saved to the database");
//       });
// })


// Start the server
app.listen(port,hostname,() => {
    console.log(`server is running at http://${hostname}:${port}/`);
})