# SmediaTek Solutions

[![CI](https://github.com/Dremo-drizzy/Smediatek-Solutions/actions/workflows/ci.yml/badge.svg)](https://github.com/Dremo-drizzy/Smediatek-Solutions/actions/workflows/ci.yml)

A MERN web app for a media, branding, livestreaming, and training agency. The public site lets visitors learn about the agency's services and submit inquiry forms (contact, brand identity, livestreaming, media training); an authenticated admin dashboard lets staff review and delete those submissions.

## Architecture

- **Backend/** — Express 5 + Mongoose REST API, MongoDB Atlas for storage. JWT-based admin auth, zod request validation, and standard API hardening (helmet, rate limiting, Mongo operator-injection sanitization).
- **Frontend/** — React 19 + Vite SPA (react-router-dom, react-bootstrap). Public pages hit the API to submit forms; the `/Admin` page is gated behind an admin login and shows/deletes all submitted records.
- Both are deployed independently (backend on Render); locally they run as two separate dev servers.

## Quick start (Docker)

The fastest way to get the backend running locally, with no MongoDB Atlas account or manual `.env` setup required:

```bash
docker compose up
```

This builds the backend image and starts it alongside a throwaway MongoDB container, wired together automatically. The API is then available at `http://localhost:5000`.

Transactional email and image uploads need real Resend/Cloudinary credentials to actually work — without them, submissions still save fine, they just skip sending email / attaching images. To enable them (or to seed an admin account), create a `.env` file in the repo root (same folder as `docker-compose.yml`) with any of `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `EMAIL_FROM`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Compose picks these up automatically. This is for local convenience only; the deployed backend on Render doesn't use Docker.

This starts only the backend + database — for frontend development, follow the manual setup below.

## Setup

### Backend

```bash
cd Backend
npm install
cp .env.example .env
```

Fill in `Backend/.env`:

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on locally (defaults to `5000`) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Random 32+ character string used to sign admin JWTs |
| `FRONTEND_URL` | Origin the API accepts CORS requests from (`http://localhost:5173` locally) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Only needed once, to seed the first admin account (see below) |

Create the first admin account (one-time, reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `.env`; no-op if that email already has an admin):

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
cp .env.example .env
```

Set `VITE_API_URL` in `Frontend/.env` to the backend's URL (`http://localhost:5000` locally). Then:

```bash
npm run dev
```

Visit `http://localhost:5173`. Log in at `/login` with the admin credentials you seeded to reach `/admin`.

## API Routes

All request/response bodies are JSON. Routes marked "Admin (JWT)" require an `Authorization: Bearer <token>` header with a token obtained from `POST /api/v1/auth/login`; all `/api/v1/*` routes are rate-limited (100 req/15min per IP, 5 req/15min on login).

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/` | Public | Health check |
| POST | `/api/v1/auth/login` | Public | Admin login — verifies email/password, returns a 7-day JWT |
| POST | `/api/v1/contact` | Public | Submit a contact form message |
| GET | `/api/v1/contact` | Admin (JWT) | List contact messages — paginated, filterable, searchable (see below) |
| PATCH | `/api/v1/contact/:id/status` | Admin (JWT) | Update a contact message's status (`new`/`read`/`archived`) |
| DELETE | `/api/v1/contact/:id` | Admin (JWT) | Soft-delete a contact message (sets `deletedAt`) |
| POST | `/api/v1/brand` | Public | Submit a brand identity project request |
| GET | `/api/v1/brand` | Admin (JWT) | List brand project requests — paginated, filterable, searchable |
| PATCH | `/api/v1/brand/:id/status` | Admin (JWT) | Update a brand project's status (`new`/`in-progress`/`won`/`lost`) |
| DELETE | `/api/v1/brand/:id` | Admin (JWT) | Soft-delete a brand project request |
| POST | `/api/v1/livestream` | Public | Submit a livestreaming service request |
| GET | `/api/v1/livestream` | Admin (JWT) | List livestreaming requests — paginated, filterable, searchable |
| PATCH | `/api/v1/livestream/:id/status` | Admin (JWT) | Update a livestream request's status (`new`/`in-progress`/`won`/`lost`) |
| DELETE | `/api/v1/livestream/:id` | Admin (JWT) | Soft-delete a livestreaming request |
| POST | `/api/v1/training` | Public | Submit a media training enrollment |
| GET | `/api/v1/training` | Admin (JWT) | List training enrollments — paginated, filterable, searchable |
| PATCH | `/api/v1/training/:id/status` | Admin (JWT) | Update a training enrollment's status (`pending`/`confirmed`/`completed`) |
| DELETE | `/api/v1/training/:id` | Admin (JWT) | Soft-delete a training enrollment |
| GET | `/api/v1/stats/overview` | Admin (JWT) | Monthly lead counts (last 12 months) and status breakdown, per resource |

### GET list query parameters

Every resource's GET list route accepts the same query params and returns `{ data, total, page, pages }` instead of a raw array:

| Param | Effect |
| --- | --- |
| `page` | Page number, 1-indexed. Defaults to `1`. |
| `limit` | Items per page. Defaults to `20`, capped at `100`. |
| `status` | Filter to one status value from that resource's enum; ignored if not a valid value. |
| `sort` | Field to sort by: `createdAt`, `email`, or `status`. Prefix with `-` for descending. Defaults to `-createdAt`. |
| `search` | Full-text search across that resource's string fields via a MongoDB text index. |
| `includeDeleted` | Set to `true` to include soft-deleted records (excluded by default). |

### Database indexes

Each schema indexes `email`, `createdAt`, and `status` individually, plus a compound text index over its string fields for `search`. These back the exact access patterns the admin dashboard uses at scale: listing by recency (`createdAt`), filtering by pipeline stage (`status`), looking up a lead by `email`, and free-text search — without indexes, each of those becomes a full collection scan as the data grows.
