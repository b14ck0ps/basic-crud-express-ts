import express, { NextFunction } from "express";
const router = express.Router();
import userModel from "../model/User";

//get all the users data from databsae
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {}
});

//create user to the collection
router.post("/", async (req, res) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    res.status(201).json(await user.save());
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//update a user
router.patch("/:id", getUser, async (req: any, res: any) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    res.json(await res.user.save());
  } catch (error) {}
});

//get a user by id
router.get("/:id", getUser, async (req: any, res: any) => {
  try {
    res.send(res.user);
  } catch (error) {
    res.send("err");
  }
});

//delete a user

router.delete("/:id", getUser, async (req: any, res: any) => {
  try {
    res.send(await res.user.remove());
  } catch (error) {
    res.send("something wrong");
  }
});

//get user MIDDLEWARE
async function getUser(req: any, res: any, next: () => void) {
  try {
    var user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

export default router;
