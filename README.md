# Skilliton - Skill Swap Platform

Skillton is a dynamic web app,which connects users based on the skills they offer and the skills they want. Say you're a backend developer looking for someone to help you with the frontend work of your project. Lucky for you, Skilliton's got your back! You can help your match with backend development, while they assist you with frontend work. It's a win-win situation!
Say your experience with the swap was great, you can rate your match after your swap is complete. This way, you can build a community of trusted users who are willing to help each other out.
In case of any issues, the admin can step in to resolve disputes and ensure a fair and safe experience for all users.

This project was built for **Odoo Hackathon 2025** 

---

## Live Demo

Coming soon — to be deployed via **Vercel**

---

## Features

### User Features
- Register with name, email, location, and profile photo
- List **skills you offer** and **skills you want**
- Make profile **public or private**
- Browse other users by skills
- Send and manage **swap requests**
- Rate users after successful swaps

### Admin Features
- Ban users violating policy
- View/manage all swap requests
- Broadcast platform-wide messages
- Download user activity & stats

---

## Tech Stack

| Area          | Tech                                         |
|---------------|----------------------------------------------|
| Frontend      | Next.js (App Router), Material UI            |
| Auth          | JSON Web Tokens (JWT), localStorage          |
| Backend/API   | Next.js API Routes (RESTful)                 |
| ORM/Database  | Prisma + PostgreSQL                          |
| Deployment    | Vercel (Frontend & API), Railway (Database)  |

---

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/skilliton.git
cd skilliton
npm install
````

### 2. Set up your `.env`

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/skilliton
JWT_SECRET=your_secret_key_here
```

Or use `.env.local` if needed.

### 3. Prisma setup

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

### 4. Run the app

```bash
npm run dev
```

---

## Sample User Flow

1. Register and select skills you **offer** and **want**
2. Get matched with users offering your wanted skills
3. Send a **swap request**
4. Accept → Collaborate → Leave feedback
5. Admin ensures fairness and safety

---

## Architecture Overview

```
Frontend (Next.js + MUI)
│
├── /app (routes, pages)
├── /components (UI + auth)
│
Backend (Next.js API)
│
├── /api/register → user signup
├── /api/login → JWT auth
├── /api/me → current user info
├── /api/matches → matching logic
│
Database (PostgreSQL via Prisma)
│
├── User, Skill, UserSkill, SwapRequest models
```

---

## Contributing

This project was built by:

* Aditya Thakkar
* Aditey Nandan
* Hasini G
* Shankhadeep Ghosh

For Odoo Hackathon 2025  
> Problem Statement:- Skill Swap Platform

---

## License

This project is under the MIT License.

---
