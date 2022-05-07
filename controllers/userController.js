import db from "../config/db.js";

async function checkSession(req) {
  const { authorization, user } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return false;

  const session = await db.collection("sessions").findOne({ token: token });
  if (!session) return false;

  if (user !== session.user) return false;

  return session;
}

export async function getTransactions(req, res) {
  try {
    const session = await checkSession(req);
    if (!session) return res.sendStatus(401);

    const transactions = await db
      .collection("transactions")
      .find({ email: session.email })
      .toArray();

    res.send(transactions);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function postTransaction(req, res) {
  try {
    const session = await checkSession(req);
    if (!session) return res.sendStatus(401);

    const { description, date, amount, isIncome } = req.body;
    await db.collection("transactions").insertOne({
      user: req.headers.user,
      description: description,
      date: date,
      amount: amount,
      isIncome: isIncome,
    });

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
