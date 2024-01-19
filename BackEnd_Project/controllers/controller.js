//connect to mongoclusetr
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const url = process.env.URL;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const users = require("../models/users");
const users_messages = require("../models/users_messages");
const bcrypt = require("bcryptjs");
const groups = require("../models/groups");
const groups_messages = require("../models/groups_messages");

const createToken = (id) => {
  return jwt.sign({ userid: id }, "tetfvgdsvcs", {
    expiresIn: "15h",
  });
};
// register
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const data = new users({
      username,
      email,
      password: hashedPassword,
      actif: false,
      img: "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
      phone,
      invitations: [],
      friendsList: [],
      messages: [],
    });
    await data.save();
    return res.status(200).json({
      user: data,
      success: true,
      message: "User has been added successfully !",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
const login = async (req, res) => {
  // validate if user already exists in the database
  try {
    const user = await users.findOne({
      email: req.body.email,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not Found  " });
    }

    // verification de la similarite des mots de passes
    const passwordHush = await bcrypt.compare(req.body.password, user.password);
    if (!passwordHush) {
      return res.status(404).json({ error: "Password incorrect" });
    }
    if (passwordHush && user) {
      // creation de token
      const token = createToken(user._id);
      // envoie de token au client
      res.status(200).json({ success: true, token: token, user: user });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getusers = async (req, res, next) => {
  try {
    const data = await users.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getconnecteduser = async (req, res) => {
  const id = req.body.userid;
  try {
    const user = await users.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};
const getusermessages = async (req, res) => {
  try {
    const messages = await users_messages.find();
    res.send(messages);
  } catch (err) {
    console.log(err);
  }
};
const deletemessage = async (req, res) => {
  try {
    const { idd } = req.params;
    const data = await users_messages.findByIdAndDelete(idd);
    res.send(data._id);
    console.log(data._id);
  } catch (err) {
    res.send(err);
  }
};

const addmessage = async (req, res) => {
  const message = req.body.message;
  const id_sender = req.body.iduse;
  const id_receiver = req.body.id_receiver;
  try {
    const data = new users_messages({
      message: message,
      id_sender: id_sender,
      id_receiver: id_receiver,
      vue: false,
    });
    res.send(data);
    console.log(data);
    await data.save();
  } catch (err) {
    res.send(err);
  }
};

// Groups
const addgroup = async (req, res) => {
  const groupname = req.body.groupname;

  try {
    const data = await new groups({
      name: groupname,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
      members: [],
      messages: [],
    });
    res.send(data);
    await data.save();
  } catch (err) {
    console.log(err);
  }
};
const getgroups = async (req, res) => {
  try {
    const data = await groups.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getmsggroup = async (req, res) => {
  try {
    const listgroups = await groups_messages.find();
    res.send(listgroups);
  } catch (err) {
    console.log(err);
  }
};
const joingroup = async (req, res) => {
  const iduser = req.body.iduse;
  const idgroup = req.body.idgroup;

  try {
    const newgroups = await groups.findByIdAndUpdate(
      idgroup,
      {
        $push: {
          members: { iduser: iduser },
        },
      },
      { new: true }
    );
    res.send(newgroups);
  } catch (err) {
    res.send(err);
  }
};
const addmessagetogroup = async (req, res) => {
  const iduse = req.body.iduse;
  const idgroup = req.body.idgroup;
  const message = req.body.message;
  try {
    const data = new groups_messages({
      message: message,
      id_sender: iduse,
      id_group: idgroup,
    });
    res.send(data);
    await data.save();
  } catch (err) {
    console.log(err);
  }
};
const updateuserinfo = async (req, res) => {
  const userid = req.body.iduse;
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  try {
    const updatedusers = await users.findByIdAndUpdate(
      userid,
      {
        username: username,
        email: email,
        phone: phone,
      },
      { new: true }
    );

    res.send({
      user: updatedusers,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};
const editpassword = async (req, res) => {
  try {
    const { userid, lastpassword, password } = req.body;
    const user = await users.findById(userid);
    const passwordHush = await bcrypt.compare(lastpassword, user.password);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (passwordHush) {
      const newuser = await users.findByIdAndUpdate(
        userid,
        {
          password: hashedPassword,
        },
        { new: true }
      );
      res.send({
        success: true,
        message: "Password updated successfully",
        user: newuser,
      });
    } else {
      res.status(400).json({ error: "Last Password incorrect" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
const addfriend = async (req, res) => {
  const iduser = req.body.iduse;
  const idfriend = req.body.idfriend;
  try {
    await users.findByIdAndUpdate(idfriend, {
      $push: {
        invitations: { idfriend: iduser, accepted: false },
      },
    });

    res.send(idfriend, iduser);
    console.log("invitation sent ");
  } catch (err) {
    console.log(err);
  }
};
const acceptinvit = async (req, res) => {
  const userid = req.body.iduse;
  const idfriend = req.body.idfriend;
  console.log(req.body);
  try {
    await users.findByIdAndUpdate(userid, {
      $set: {
        invitations: { idfriend: idfriend, accepted: true },
      },
    });
    await users.findByIdAndUpdate(userid, {
      $push: {
        friendsList: { idfriend: idfriend },
      },
    });

    await users.findByIdAndUpdate(idfriend, {
      $push: {
        friendsList: { idfriend: userid },
      },
    });
    const newuser = await users.find({ _id: userid });

    res.send({ idfriend, userid, user: newuser[0], success: true });
  } catch (err) {
    console.log(err);
  }
};

const acceptinvit2 = async (req, res) => {
  const userid = req.body.iduse;
  const idfriend = req.body.idfriend;
  console.log(req.body);
  try {
    const users2 = await users.findByIdAndUpdate(idfriend, {
      $push: {
        friendsList: { idfriend: userid },
      },
    });
    res.send(users2);
  } catch (err) {
    console.log(err);
  }
};
const removefriend = async (req, res) => {
  const iduser = req.body.iduser;
  const idfriend = req.body.idfriend;
  console.log(iduser, idfriend);
  try {
    const user = await users.findByIdAndUpdate(iduser, {
      $pull: {
        friendsList: { idfriend: idfriend },
      },
    });
    await users.findByIdAndUpdate(idfriend, {
      $pull: {
        friendsList: { idfriend: iduser },
      },
    });
    res.send({ iduser, idfriend, user });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await users.findById(id);

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (comparePassword) {
      await users.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Password incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};
const setmessagetoviewed = async (req, res) => {
  const iduser = req.body.iduser1;
  const iduser2 = req.body.iduser2;
  console.log(iduser, iduser2);
  try {
    const newmessages = await users_messages.updateMany(
      {
        id_receiver: iduser,
        id_sender: iduser2,
      },
      { $set: { vue: true } },
      { new: true }
    );

    res.status(200).send({ iduser, iduser2 });
  } catch (err) {
    console.log(err);
  }
};
const editPicture = async (req, res) => {
  const userid = req.body.iduse;
  const url = req.body.url;
  console.log("urll" + url);
  try {
    const newusers = await users.findByIdAndUpdate(userid, {
      img: url,
    });
    res.send(newusers);
  } catch (err) {
    console.log;
  }
};
const leavegroup = async (req, res) => {
  const groupid = req.body.idgroup;
  const userid = req.body.iduse;
  const newgroups = await groups.findByIdAndUpdate(
    groupid,
    {
      $pull: { members: { iduser: userid } },
    },
    { new: true }
  );
  res.send(newgroups);
  console.log("leaved");
  console.log(newgroups);
};

const getInvitations = async (req, res) => {
  try {
    const usersWithInvitations = await users.find({
      invitations: { $exists: true, $ne: [] },
    });
    const invitations = usersWithInvitations.map((user) => ({
      userid: user._id,
      invitations: user.invitations,
    }));
    return res.status(200).send(invitations);
  } catch (error) {}
};

module.exports = {
  deleteUser,
  getInvitations,
  getusers,
  getusermessages,
  deletemessage,
  login,
  addmessage,
  getconnecteduser,
  register,
  addgroup,
  getgroups,
  joingroup,
  addmessagetogroup,
  getmsggroup,
  updateuserinfo,
  editpassword,
  addfriend,
  acceptinvit,
  removefriend,
  acceptinvit2,
  setmessagetoviewed,
  editPicture,
  leavegroup,
};
