# SmediaTek Solutions

A MERN web app for a media, branding, livestreaming, and training agency. The public site lets visitors learn about the agency's services and submit inquiry forms (contact, brand identity, livestreaming, media training); an authenticated admin dashboard lets staff review and delete those submissions.

## Architecture

- **Backend/** — Express 5 + Mongoose REST API, MongoDB Atlas for storage. JWT-based admin auth, zod request validation, and standard API hardening (helmet, rate limiting, Mongo operator-injection sanitization).
- **Frontend/** — React 19 + Vite SPA (react-router-dom, react-bootstrap). Public pages hit the API to submit forms; the `/Admin` page is gated behind an admin login and shows/deletes all submitted records.
- Both are deployed independently (backend on Render); locally they run as two separate dev servers.

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

All request/response bodies are JSON. Routes marked "Admin (JWT)" require an `Authorization: Bearer <token>` header with a token obtained from `POST /api/auth/login`; all `/api/*` routes are rate-limited (100 req/15min per IP, 5 req/15min on login).

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/` | Public | Health check |
| POST | `/api/auth/login` | Public | Admin login — verifies email/password, returns a 7-day JWT |
| POST | `/api/contact` | Public | Submit a contact form message |
| GET | `/api/contact` | Admin (JWT) | List contact messages — paginated, filterable, searchable (see below) |
| PATCH | `/api/contact/:id/status` | Admin (JWT) | Update a contact message's status (`new`/`read`/`archived`) |
| DELETE | `/api/contact/:id` | Admin (JWT) | Soft-delete a contact message (sets `deletedAt`) |
| POST | `/api/brand` | Public | Submit a brand identity project request |
| GET | `/api/brand` | Admin (JWT) | List brand project requests — paginated, filterable, searchable |
| PATCH | `/api/brand/:id/status` | Admin (JWT) | Update a brand project's status (`new`/`in-progress`/`won`/`lost`) |
| DELETE | `/api/brand/:id` | Admin (JWT) | Soft-delete a brand project request |
| POST | `/api/livestream` | Public | Submit a livestreaming service request |
| GET | `/api/livestream` | Admin (JWT) | List livestreaming requests — paginated, filterable, searchable |
| PATCH | `/api/livestream/:id/status` | Admin (JWT) | Update a livestream request's status (`new`/`in-progress`/`won`/`lost`) |
| DELETE | `/api/livestream/:id` | Admin (JWT) | Soft-delete a livestreaming request |
| POST | `/api/training` | Public | Submit a media training enrollment |
| GET | `/api/training` | Admin (JWT) | List training enrollments — paginated, filterable, searchable |
| PATCH | `/api/training/:id/status` | Admin (JWT) | Update a training enrollment's status (`pending`/`confirmed`/`completed`) |
| DELETE | `/api/training/:id` | Admin (JWT) | Soft-delete a training enrollment |

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
