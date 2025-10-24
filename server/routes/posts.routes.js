import { Router } from "express";
import multer from "multer";
import path from "path";
import { auth } from "../middleware/auth.js";
import { Post } from "../models/Post.js";


const router = Router();


// Storage local pour images
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, "uploads"),
filename: (req, file, cb) => {
const ext = path.extname(file.originalname);
cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
}
});
const upload = multer({ storage });


// Fil d'actualité (posts récents)
router.get("/", auth, async (req, res) => {
const posts = await Post.find()
.populate("author", "name avatar")
.sort({ createdAt: -1 })
.limit(50)
.lean();
res.json(posts);
});


// Créer un post
router.post("/", auth, upload.single("image"), async (req, res) => {
const { description } = req.body;
const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
const post = await Post.create({ author: req.user.id, description, image: imagePath });
const populated = await post.populate("author", "name avatar");
res.status(201).json(populated);
});


// Like/Unlike
router.put("/:id/like", auth, async (req, res) => {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ error: "Post introuvable" });
const hasLiked = post.likes.some(u => u.toString() === req.user.id);
if (hasLiked) {
post.likes = post.likes.filter(u => u.toString() !== req.user.id);
} else {
post.likes.push(req.user.id);
}
await post.save();
res.json({ likes: post.likes.length });
});


// Posts d'un utilisateur
router.get("/by/:userId", auth, async (req, res) => {
const posts = await Post.find({ author: req.params.userId })
.populate("author", "name avatar")
.sort({ createdAt: -1 })
.lean();
res.json(posts);
});


export default router;