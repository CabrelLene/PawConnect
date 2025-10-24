import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


const router = Router();


router.post("/register", async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: "Champs requis" });
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ error: "Email déjà utilisé" });
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hash });
const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.status(201).json({
token,
user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio }
});
} catch (e) {
res.status(500).json({ error: "Erreur serveur" });
}
});


router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: "Identifiants invalides" });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ error: "Identifiants invalides" });
const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.json({
token,
user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio }
});
} catch (e) {
res.status(500).json({ error: "Erreur serveur" });
}
});


export default router;