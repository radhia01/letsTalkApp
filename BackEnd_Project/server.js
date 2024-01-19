var express = require("express");
var app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(
  cors({
    // origin: "https://let-s-talk-frontend-five.vercel.app",
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
// const group = require("./routes/groups");
const users = require("./routes/users");
const user_messages = require("./routes/user_messages");
const deletemessage = require("./routes/deletemessage");
const addmessage = require("./routes/sendmessage");
const login = require("./routes/login");
const user = require("./routes/connecteduser");
const register = require("./routes/register");
const addgp = require("./routes/addgroup");
const groups = require("./routes/groups");
const joingroup = require("./routes/joingroup");
const addmessagetogroup = require("./routes/addmessagetogroup");
const groupsmsg = require("./routes/groupsmessages");
const updateuserprofile = require("./routes/updateuser");
const editpass = require("./routes/editpassword");
const addfriend = require("./routes/addfriend");
const acceptinvit = require("./routes/acceptinvitation");
const removefriend = require("./routes/deletefriend");
const acceptinvit2 = require("./routes/acceptinvit2");
const settoview = require("./routes/setmessageviewed");
const editpicture = require("./routes/editpicture");
const leavegroup = require("./routes/leavegrp");
const deleteUser = require("./routes/deleteuser");
const updateimage = require("./routes/updateimage");
const invitations = require("./routes/invitations");
// app.use("/list", group);
app.use("/users", users);
app.use("/messages", user_messages);
app.use("/deletemessage", deletemessage);
app.use("/addmessage", addmessage);
app.use("/login", login);
app.use("/user", user);
app.use("/register", register);
app.use("/addgroup", addgp);
app.use("/groups", groups);
app.use("/joingroup", joingroup);
app.use("/addmsgroup", addmessagetogroup);
app.use("/groupsmsg", groupsmsg);
app.use("/updateuser", updateuserprofile);
app.use("/updatepassword", editpass);
app.use("/sentinvit", addfriend);
app.use("/acceptinvit", acceptinvit);
app.use("/removefriend", removefriend);
app.use("/acceptinvit2", acceptinvit2);
app.use("/setviewed", settoview);
app.use("/editpic", editpicture);
app.use("/leavegroup", leavegroup);
app.use("/deleteuser", deleteUser);
app.use("/", updateimage);
app.use("/", invitations);
