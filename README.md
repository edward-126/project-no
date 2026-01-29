# Project No

A tiny Next.js app that fetches a random “nope” reason and generates a matching avatar.

- **Reasons**: “No as a Service” (`https://naas.isalman.dev/no`)
- **Avatars**: DiceBear `notionists-neutral` (SVG)

## Demo

Site link: https://project-naas.vercel.app/

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui + lucide-react
- DiceBear Avatars (SVG)
- No as a Service (NaaS)

## How it works

1. The client calls **`/api/no`**.
2. `GET /api/no` proxies the request to **No as a Service** (`https://naas.isalman.dev/no`).
3. The route returns JSON like:

   ```json
   { "reason": "..." }
   ```

4. The UI generates a random seed and loads an SVG avatar from DiceBear.
5. The avatar is preloaded so the “face + reason” appears together.

## API

### `GET /api/no`

* Returns: `{ reason: string }`
* No caching: uses `no-store` / `revalidate = 0`
* Error handling:

  * Upstream errors → `502`
  * Fetch/network errors → `500`

Upstream source: **No as a Service**

* Endpoint: `https://naas.isalman.dev/no`
* Expects `application/json` with a `reason` field

## Avatar generation

DiceBear style: `notionists-neutral`

Example pattern:

```
https://api.dicebear.com/9.x/notionists-neutral/svg?seed=YOUR_SEED
```

## Getting started

### 1) Clone

```bash
git clone https://github.com/edward-126/project-no.git
cd project-no
```

### 2) Install dependencies

Use whichever package manager you prefer:

```bash
npm install
# or: pnpm install
# or: yarn
# or: bun install
```

### 3) Run the dev server

```bash
npm run dev
# or: pnpm dev
# or: yarn dev
# or: bun dev
```

Then open `http://localhost:3000`.

### 4) Build for production

```bash
npm run build
npm run start
```

## Deploy

This app is a great fit for **Vercel** (recommended for Next.js).
You can also deploy to Netlify, Railway, Render, etc. as long as Next.js App Router is supported.

## Contributing

PRs are welcome!

* If you find a bug or have an idea, open an issue:

  * [https://github.com/edward-126/project-no/issues](https://github.com/edward-126/project-no/issues)
* Keep changes small and focused
* Run the app locally before submitting

## Credits

* No as a Service: [https://github.com/hotheadhacker/no-as-a-service](https://github.com/hotheadhacker/no-as-a-service)
* DiceBear Avatars: [https://www.dicebear.com/](https://www.dicebear.com/)

## Author

**Thilina Rathnayaka (Edward Hyde)**
[https://thilina.dev](https://thilina.dev)
