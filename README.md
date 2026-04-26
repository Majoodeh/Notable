# 📝 Notable

> A modern, fullstack note-taking application built with the MERN stack. Create, edit, and organize your thoughts with a clean, responsive interface | all backed by a robust REST API with intelligent rate limiting.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Upstash-Redis-00E9A3?logo=redis&logoColor=white" alt="Upstash Redis" />
</p>

---

## ✨ Key Features

- **📝 Full CRUD Operations** — Create, read, update, and delete notes seamlessly.
- **🎨 Beautiful UI** — Clean, modern interface styled with Tailwind CSS v4 and DaisyUI's retro theme.
- **📱 Fully Responsive** — Optimized for mobile, tablet, and desktop experiences.
- **⚡ Real-time Feedback** — Toast notifications for all user actions (success, error, loading).
- **🛡️ Rate Limiting** — Intelligent request throttling via Upstash Redis (100 req/60s) to protect the API.
- **🔄 Smart Auto-save Behavior** — Empty notes are automatically deleted on save.
- **⏰ Timestamp Tracking** — Automatic `createdAt` and `updatedAt` tracking for every note.
- **🧹 Git Hooks** — Pre-commit linting and formatting with Husky + lint-staged.
- **📦 Monorepo Architecture** — Clean workspace separation between frontend and backend.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **DaisyUI** | Pre-built component themes |
| **Axios** | HTTP client for API communication |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe API development |
| **Mongoose** | MongoDB object modeling |
| **Upstash Redis** | Serverless Redis for rate limiting |

---

## 📁 Project Structure

```text
notable-app/
├── 📂 client/           # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level page components
│   │   └── lib/         # Axios config & Utils
├── 📂 server/           # Express backend application
│   ├── src/
│   │   ├── config/      # DB & Redis setup
│   │   ├── controllers/ # Business logic
│   │   └── models/      # Mongoose schemas
└── package.json         # Root workspace configuration
