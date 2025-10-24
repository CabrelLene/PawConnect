import jwt from "jsonwebtoken";


export function auth(req, res, next) {
const token = req.header("Authorization")?.split(" ")[1];
if (!token) return res.status(401).json({ error: "Non autorisé" });
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // { id, email }
next();
} catch (e) {
res.status(403).json({ error: "Token invalide" });
}
}