const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const { marked } = require("marked");
// const altXSRF = require("alt-xsrf");
const csrf = require("csurf");
const app = express();
const mongoose = require("./db");
const sanitizeHTML = require("sanitize-html");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./router-api"));

let sessionOptions = session({
  secret: "nithyananthan is great",
  store: MongoStore.create({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});
app.use(sessionOptions);
app.use(flash());

app.use(function (req, res, next) {
  //make our markdon function available from within ejs templates
  res.locals.filterUserHTML = function (content) {
    return sanitizeHTML(marked(content), {
      allowedTags: [
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "strong",
        "bold",
        "i",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      allowedAttributes: {},
    });
  };
  //make all error and sucess flash messages available from all tempaltes
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  //make current user id available  on the req object
  if (req.session.user) {
    req.visitorId = req.session.user._id;
  } else {
    req.visitorId = 0;
  }
  //make user session data available from within view tempalts
  res.locals.user = req.session.user;
  next();
});

const router = require("./router");

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use(csrf());

app.use(function (req, res, next) {
  console.log("Generated CSRF token:", req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  console.log(res.locals.csrfToken);
  next();
});

app.use("/", router);

app.use(function (err, req, res, next) {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      req.flash("errors", "cross site request forgery detected");
      req.session.save(() => res.redirect("/"));
    } else {
      res.render("404");
    }
  }
});

const server = require("http").createServer(app);

const io = require("socket.io")(server);

io.use(function (socket, next) {
  sessionOptions(socket.request, {}, next);
});

io.on("connection", function (socket) {
  if (socket.request.session.user) {
    let user = socket.request.session.user;
    socket.emit("welcome", { username: user.username, avatar: user.avatar });
    socket.on("chatMessageFromBrowser", function (data) {
      socket.broadcast.emit("chatMessageFromServer", {
        message: sanitizeHTML(data.message, {
          allowedTags: [],
          allowedAttributes: [],
        }),
        username: user.username,
        avatar: user.avatar,
      });
    });
  }
});

module.exports = server;
