🎯 Objectif

Construire une application complète de type “mini-réseau social” où :

Les utilisateurs créent un compte (authentification JWT)

Ils publient des photos et descriptions de leurs animaux

Ils peuvent aimer, commenter et suivre d’autres utilisateurs

Chaque publication affiche le profil de son auteur et les réactions

Ce projet t’expose à toute la complexité d’un système relationnel dans MongoDB (users ↔ posts ↔ comments), avec une architecture d’API REST robuste.

⚙️ Stack technique

Frontend : React 18 + Vite + React Router + Tailwind CSS

Backend : Node.js + Express.js + JWT + Multer (upload image)

Base : MongoDB + Mongoose

Stockage images : Cloudinary ou dossier local /uploads

Déploiement : Vercel + Render + MongoDB Atlas

🧩 Fonctionnalités clés

Authentification sécurisée

Inscription, connexion, déconnexion

Mot de passe hashé avec bcrypt

JWT stocké dans le localStorage

Gestion des publications

Créer un post avec photo et description

Liker / Unliker une publication

Commenter un post (CRUD des commentaires)

Relations utilisateurs

Suivre / Ne plus suivre un utilisateur

Voir le fil d’actualité avec les posts des gens qu’on suit

Profil utilisateur

Affichage du profil (photo, bio, nombre d’abonnés, etc.)

Liste des publications personnelles



Flux logique

L’utilisateur s’inscrit via React → POST /api/auth/register

Express valide les données et enregistre dans MongoDB

Le JWT est envoyé et stocké côté React (auth persistante)

Lorsqu’il crée un post :

React envoie la photo et la description → POST /api/posts

Express stocke la photo (Multer + Cloudinary) et crée un document Post

D’autres utilisateurs voient ce post via GET /api/posts

Ils peuvent liker, commenter, ou suivre son auteur

🎨 Côté Frontend

React Router gère les pages :

/login

/register

/feed (fil principal)

/profile/:id
