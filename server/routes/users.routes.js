import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { User } from "../models/User.js";


const router = Router();


// Profil public
router.get("/:id", auth, async (req, res) => {
const user = await User.findById(req.params.id).select("-password").lean();
if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });
res.json(user);
});


// Follow
router.put("/:id/follow", auth, async (req, res) => {
const targetId = req.params.id;
const me = req.user.id;
if (me === targetId) return res.status(400).json({ error: "Action interdite" });
await User.findByIdAndUpdate(me, { $addToSet: { following: targetId } });
await User.findByIdAndUpdate(targetId, { $addToSet: { followers: me } });
res.json({ ok: true });
});


// Unfollow
router.put("/:id/unfollow", auth, async (req, res) => {
const targetId = req.params.id;
const me = req.user.id;
await User.findByIdAndUpdate(me, { $pull: { following: targetId } });
await User.findByIdAndUpdate(targetId, { $pull: { followers: me } });
res.json({ ok: true });
});


export default router;