import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
{
author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
image: { type: String, default: "" }, // chemin local uploads/...
description: { type: String, default: "" },
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
{ timestamps: true }
);


export const Post = mongoose.model("Post", postSchema);