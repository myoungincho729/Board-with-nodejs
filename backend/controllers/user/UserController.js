const UserModel = require("../../models/user/UserModel");
const bcrypt = require("bcrypt");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
};

module.exports.saveUser = async (req, res) => {
  const userInfo = req.body;
  // userName check
  const dupUser = await UserModel.findOne({ userName: userInfo.userName });
  console.log(dupUser);
  if (dupUser) {
    res.send("duplicate Username...");
    return;
  }

  // encrypt password
  const pw = userInfo.password;
  const hashedPw = await bcrypt.genSalt(10).then((salt) => {
    console.log(`salt: ${salt}`);
    return bcrypt.hash(pw, salt);
  });
  userInfo["password"] = hashedPw;
  const user = await UserModel.create(userInfo);
  console.log(user);
  res.send(user);
};

module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userInfo = req.body;

  // userName check
  const findUser = await UserModel.findById(userId);
  if (!findUser) {
    res.send("Username doesn't exist...");
    return;
  }

  // encrypt password
  const pw = userInfo.password;
  const hashedPw = await bcrypt.genSalt(10).then((salt) => {
    return bcrypt.hash(pw, salt);
  });
  userInfo["password"] = hashedPw;
  const updateUser = await UserModel.replaceOne(findUser, userInfo);
  console.log(updateUser);
  res.send(updateUser);
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  // userName check
  const findUser = await UserModel.findById(userId);
  if (!findUser) {
    res.send("Username doesn't exist...");
    return;
  }
  await UserModel.deleteOne(findUser);
  res.status(201);
};

module.exports.loginUser = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  const findUser = await UserModel.findOne({ userName: userName });
  if (!findUser) {
    res.send("Username doesn't exist...");
    return;
  }
  const checkResult = await bcrypt.compare(password, findUser.password);
  if (!checkResult) {
    res.send("Username or password doesn't exist...");
    return;
  }
  req.session.user = findUser;
  console.log(req.session);
  res.status(200).send("logined");
};

module.exports.logoutUser = async (req, res) => {
  const user = req.session.user;
  if (!user) {
    res.send("no session");
    return;
  }
  user = null;
  res.redirect("/");
};
