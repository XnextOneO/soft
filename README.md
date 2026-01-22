# Get started

**Step by step:**

- `npm install`
- `cp .env.example .env`
- Edit `.env`
- `npm run start:dev`

**Production build:**

- `npm run build`
- `npm run start:prod`

## Environment

- `VITE_API_URL`: Backend API URL
- `VITE_ENABLE_AUTH_PROVIDER`: `true` by default; set to `false` to skip wrapping the app with AuthProvider when auth is handled externally

**Docker compose:**

first launch 
- `git clone`
- `npm install`
- `cp .env.example .env`
- Edit `.env`
- `docker-compose up -d`

launch
- `docker-compose up -d`

rebuild and launch
- `docker-compose up -d --build`


## License

LiteFront is licensed under the MIT License.

