const { Router } = require("express");
const {
  saveUser,
  updateUser,
  deleteUser,
  getUsers,
  loginUser,
  logoutUser,
} = require("../controllers/user/UserController");

const router = Router();

router.post("/", saveUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
