<div align="center">
  <img src="https://ui-avatars.com/api/?name=CodePromix+Agency&background=FF6B00&color=fff&size=100" alt="CodePromix Logo" width="100" />
  <h1>CodePromix Agency Website</h1>
  <p>A high-performance, premium digital agency website built with Next.js, Express, and GSAP animations.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#local-development">Local Development</a> •
    <a href="#deployment-guide">Deployment Guide</a>
  </p>
</div>

<hr />

## ✨ Features

- **Premium UI/UX:** Built with sleek dark mode, glassmorphism, and GSAP-powered scroll reveal animations.
- **Frontend & Backend Separation:** A fully uncoupled architecture for maximum scale and flexible hosting.
- **Dynamic SEO:** Fully optimized meta tags, JSON-LD schema, and lightning-fast page loads.
- **Advanced Admin Dashboard:** A custom-built, secure content management system for blogs, categories, and client messages.
- **Rich Text Editor:** Fully integrated `react-quill` for WYSIWYG blog editing.
- **Secure Authentication:** JWT-based headless authentication using `localStorage` and Bearer tokens.

## 🛠 Tech Stack

**Frontend (Client)**
- **Framework:** [Next.js](https://nextjs.org/) (Pages Router)
- **Styling:** Vanilla CSS Modules with custom variables
- **Animations:** [GSAP](https://gsap.com/)
- **Forms/Toasts:** `react-hot-toast`
- **Editor:** `react-quill`

**Backend (API)**
- **Environment:** Node.js & [Express.js](https://expressjs.com/)
- **Database:** MySQL
- **ORM/Query Builder:** `mysql2`
- **Authentication:** `bcryptjs` & `jsonwebtoken`
- **File Storage:** `multer` (Local Disk)

---

## 🚀 Local Development

To run this project locally, you will need to start **both** the frontend and the backend servers simultaneously.

### 1. Database Setup
1. Create a MySQL database locally named `CodePromix_site` (or any name you prefer).
2. Run the SQL file provided in the root directory: `schema.sql`.

### 2. Backend Setup
The backend handles the API, authentication, database connection, and image uploads.

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# Start the development server (runs on port 5000)
npm run dev
```
*Note: Ensure your `server/.env` aligns with your local MySQL credentials.*

### 3. Frontend Setup
The frontend serves the public pages and the admin dashboard.

```bash
# In a new terminal window at the project root:
npm install

# Start the Next.js development server (runs on port 3000)
npm run dev
```
*Note: The frontend connects to the backend using `NEXT_PUBLIC_API_URL` defined in `.env.local`.*

---

## 🌍 Deployment Guide

Because this application uses a separated architecture, you must deploy the frontend and backend independently. 

### 1. Deploying the Backend (API & Database)

> **⚠️ CRITICAL NOTE REGARDING BLOG UPLOADS:**  
> The backend saves blog cover images directly to its local filesystem (`server/uploads/posts`). If you host the backend on a strict "serverless" platform (like Vercel or Heroku) that uses an **ephemeral file system**, your uploaded images will be randomly deleted every time the server restarts.
> 
> To ensure the blog image functionality works permanently, you **must** use a hosting provider that supports a persistent file system/disk.

**Recommended Platform:** **[Railway.app](https://railway.app/)** or **[Render.com](https://render.com/)**

**Deploying on Railway (Easiest)**
1. Connect your GitHub repository to Railway.
2. Under deployment settings, set the **Root Directory** to `/server`.
3. Add a **MySQL Database** service inside your Railway project and run your `schema.sql` file on it.
4. Add a **Persistent Volume** in Railway and mount it to `/uploads`. This ensures your blog images are never deleted!
5. Add your Environment variables under the Node service:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (from the Railway MySQL service)
   - `JWT_SECRET` (A strong random string)
   - `CORS_ORIGIN` (Your deployed frontend URL, e.g. `https://codepromix.netlify.app`)
6. Deploy the Node service!

### 2. Deploying the Frontend

You can deploy the frontend to any static site hosting that supports Next.js.

**Deploying on Netlify or Vercel**
1. Connect your GitHub repository.
2. Leave the Root Directory empty (standard root).
3. Set the Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The URL of your live Railway Backend (e.g., `https://api.codepromix.up.railway.app`).
4. Click Deploy!