//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const mysql = require("mysql");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jiromt"
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.listen('4000', () => {
  console.log('Server started on port 4000');
});

app.get("/", (req, res) => {
      let sql = "SELECT *, DATE(created_at) as date_created_at FROM effort WHERE DATE(created_at) = DATE(now()) ORDER BY created_at DESC";
      let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.render("list", {listTitle: 'the moment', newListItems: results});
        console.log(results);
        //res.send("YOLO...");
      });
});

app.post("/", function(req, res){

  const description = req.body.newItem;
  // const listName = req.body.list;
  var d = Date();
  var str = d.toString();
  var str1 = str.substring(0, str.indexOf(":"));
  var str2 = str1.substring(str1.lastIndexOf(" "));
  var hr = Number(str2);

  var post = {hour: hr, description: description};
  var sql ='INSERT INTO effort SET ?';
  var query = db.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
    res.redirect("/");
  });
});

//
// mongoose.connect("mongodb+srv://dthink:test123@cluster0-dgosb.mongodb.net/test?retryWrites=true/todolistDB", {useNewUrlParser: true});
//
// const itemsSchema = {
//   name: String
// };
//
// const Item = mongoose.model("Item", itemsSchema);
//
//
// const item1 = new Item({
//   name: "Algorithm Practice"
// });
//
// const item2 = new Item({
//   name: "Math Practice"
// });
//
// const item3 = new Item({
//   name: "Web DevDesign Practice"
// });
//
// const defaultItems = [item1, item2, item3];
//
// const listSchema = {
//   name: String,
//   items: [itemsSchema]
// };
//
// // const List = mongoose.model("List", listSchema);
//
//
// app.get("/", function(req, res) {
//
//   Item.find({}, function(err, foundItems){
//
//     if (foundItems.length === 0) {
//       Item.insertMany(defaultItems, function(err){
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Successfully savevd default items to DB.");
//         }
//       });
//       res.redirect("/");
//     } else {
//       res.render("list", {listTitle: "Today", newListItems: foundItems});
//     }
//   });
//
// });
//
// app.get("/:customListName", function(req, res){
//   const customListName = _.capitalize(req.params.customListName);
//
//   List.findOne({name: customListName}, function(err, foundList){
//     if (!err){
//       if (!foundList){
//         //Create a new list
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });
//         list.save();
//         res.redirect("/" + customListName);
//       } else {
//         //Show an existing list
//
//         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//       }
//     }
//   });
//
//
//
// });
//
// app.post("/", function(req, res){
//
//   const itemName = req.body.newItem;
//   const listName = req.body.list;
//
//   const item = new Item({
//     name: itemName
//   });
//
//   if (listName === "Today"){
//     item.save();
//     res.redirect("/");
//   } else {
//     List.findOne({name: listName}, function(err, foundList){
//       foundList.items.push(item);
//       foundList.save();
//       res.redirect("/" + listName);
//     });
//   }
// });
//
// app.post("/delete", function(req, res){
//   const checkedItemId = req.body.checkbox;
//   const listName = req.body.listName;
//
//   if (listName === "Today") {
//     Item.findByIdAndRemove(checkedItemId, function(err){
//       if (!err) {
//         console.log("Successfully deleted checked item.");
//         res.redirect("/");
//       }
//     });
//   } else {
//     List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
//       if (!err){
//         res.redirect("/" + listName);
//       }
//     });
//   }
//
//
// });
//
// app.get("/about", function(req, res){
//   res.render("about");
// });
//
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
//
//
// app.listen(port, function() {
//   console.log("Server started on port 3000");
// });
