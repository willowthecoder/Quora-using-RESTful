const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

let posts = [
  { name: "Willow", content: "It's a beautiful world ", id: uuidv4() },
  { name: "Arno", content: "Travel the world  ", id: uuidv4() },
  { name: "admin", content: "The account is active again", id: uuidv4() },
];
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`The app is listening to port${port}`);
});

app.get("/posts/new", (req, res) => {
  res.render("newpost.ejs");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.post("/posts", (req, res) => {
  let { name, content } = req.body;
  let id = uuidv4();
  posts.push({ name, content, id });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("detail.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  //res.send("patch request send");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id/delete", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  // res.send("Delete successful");
  res.redirect("/posts");
});
