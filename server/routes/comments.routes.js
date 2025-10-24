import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { Comment } from "../models/Comment.js";


const router = Router();


router.get("/:postId", auth, async (req, res) => {
const items = await Comment.find({ post: req.params.postId })
.populate("author", "name avatar")
.sort({ createdAt: -1 })
.lean();
res.json(items);
});


router.post("/", auth, async (req, res) => {
const { postId, content } = req.body;
if (!content?.trim()) return res.status(400).json({ error: "Contenu requis" });
const c = await Comment.create({ post: postId, author: req.user.id, content });
const populated = await c.populate("author", "name avatar");
res.status(201).json(populated);
});


export default router;