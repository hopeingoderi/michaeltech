# MichaelTech Academy — Deployment Guide

This project is split into a **frontend** and **backend**.

## 1) Frontend deployment
Upload the **contents** of the `frontend` folder to GitHub Pages, Netlify, Infomaniak static hosting, or Vercel.

## 2) Backend deployment
Recommended: **Render**
1. Create a new web service
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `.env.example`

## 3) Database
Recommended: **Render PostgreSQL** or **Neon**
1. Create a PostgreSQL database
2. Copy the connection string into `DATABASE_URL`
3. Run `database/schema.sql`

## 4) Production architecture
- Frontend: `michaeltech.ch`
- API: `api.michaeltech.ch` later via subdomain
- Database: PostgreSQL
- Email: `info@michaeltech.ch`

## 5) Recommended next upgrades
- real database queries
- auth middleware
- PDF certificate generation
- email notifications
- admin-only routes
