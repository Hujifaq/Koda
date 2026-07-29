# Courses Mock API

Mock API server for course data used by the Koda frontend.

## Run

From the repo root:

```bash
npm run mock-api
```

Or from the package folder:

```bash
cd mock-api
npm install
npm start
```

## Endpoints

- `GET /courses`
- `GET /courses/:id`
- `GET /categories`
- `GET /categories/:category/courses`

## Port

The server listens on port `3005`.
