const express = require("express");
const path = require("path");
const bodyParser= require("body-parser"); 
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // Middleware1
// app.use(function(request, response, next){
//   console.log("Middleware 1");
//   next();
// });

// // Middleware1
// app.use(function(request, response, next){
//   console.log("Middleware 2");
//   next();
// });

var contactList= [
  {
    name: " Captain America",
    phone: "1112342154"
  },
  {
    name: "Iron Man",
    phone: "2345167821"
  },
  {
    name: "Tony Stark",
    phone: "1247850321"
  }
];

// Sending contact lists to server
app.get("/", function (request, response) {
  return response.render("home", {
    title: "Contact List",
    contact_List: contactList
  });
});

// Adding contacts
app.post("/add-contact", function(request, response){
  // contactList.push({
  //   name: request.body.name,
  //   phone: request.body.phone
  // });
  contactList.push(request.body);
  // return response.redirect('/');
  return response.redirect('back');
});


// Delete contact
app.get('/delete-contact', function(request, response){
  console.log(request.query);
  let phone= request.query.phone;

  let contactIndex= contactList.findIndex(contact => contact.phone == phone);
  if(contactIndex != -1)
  {
    contactList.splice(contactList, 1);
  }

  // let phone= request.params.phone;
  return response.redirect('back');
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error we are getting", err);
  }
  console.log("Yeah we did it");
});
