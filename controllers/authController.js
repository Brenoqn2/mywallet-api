import db from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { user, email, password } = req.body;

  const alreadyUsedEmail = await db
    .collection("users")
    .findOne({ email: req.body.email });

  if (alreadyUsedEmail) {
    return res.sendStatus(409);
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await db.collection("users").insertOne({
      user: user,
      password: passwordHash,
      email: email,
    });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db
        .collection("sessions")
        .insertOne({ user: user.email, token: token, username: user.user });
      res.status(200).send({ token: token, username: user.user });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function logOut(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(422);
    await db.collection("sessions").deleteOne({ token: token });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
