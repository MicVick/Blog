const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "This is my Blogging Website. Blogger lets you safely store thousands of posts, photos, and more with Google. Join millions of others, Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here. Create your blog,";
const aboutContent = "I am currently pursuing BTech in Computer Science at SVNIT SURAT. I am a hard working person and passionate to learn new technologies. Backend Technologies includes Node/express Js, PHP and for Frontend HTML, ReactJs, CSS";
const contactContent = "Feel free to contact me for any Website Development related queries.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://MihirHemnani:Hop27418@cluster0.owonk.mongodb.net/?retryWrites=true&w=majority/test", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


    post.save(function(err){
    if (!err){
        res.render("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

port = process.env.PORT;

if(port == null || port == "") {
 port = 8000;
}

app.listen(port, function() {
  console.log("Server started..");
});
