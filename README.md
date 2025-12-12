# Wallywood
Simple REST API til posters og brugere

Dette repository indeholder en lille backend API bygget med Node.js, Express, TypeScript og Prisma (MySQL). Projektet leverer CRUD-endpoints for `users`, `posters`, `genres`, `cartlines` og `userRatings`.

**Kort overblik**
- **Tech stack:** Node.js, TypeScript, Express, Prisma, MySQL
- **ORM:** Prisma
- **Dev-server:** `tsx`
- **Autentifikation:** (ikke implementeret i denne codebase, men `jsonwebtoken` er installeret)

## Forudsætninger
- Node.js >= 18
- npm eller yarn
- MySQL (lokal eller fjern) med en database tilknyttet

## Miljøvariabler
Opret en `.env`-fil i projektets rod. Du kan se et eksempel i `.env`-filen i repoet.
- `DATABASE_URL` — MySQL forbindelsesstreng fx `mysql://root:password@localhost:3306/wallywood`
- `PORT` — port hvor server kører (standard 3000)

## Setup og kørsel
1. Klon repoet og skift til projektmappen

```bash
git clone https://github.com/Greta-Alfredsdottir/Wallywood.git
cd Wallywood
```

2. Installer afhængigheder

```bash
npm install
```

3. Opret `.env` (kopiér fra `.env` i repo eller indtast dine egne værdier)

4. Generér Prisma client

```bash
npm run prisma:generate
```

5. Kør migrationer og opret databasen (udvikling)

```bash
npm run prisma:migrate
```

6. Seed databasen (opretter fx testbruger)

```bash
npm run prisma:seed
```

7. Start dev-server

```bash
npm run dev
```

8. Byg til produktion

```bash
npm run build
npm start
```

## Tilgængelige npm scripts
- `dev`: Kører udviklingsserver (`tsx watch src/index.ts`)
- `build`: Kompilerer TypeScript med `tsc`
- `start`: Starter appen fra `dist` mappen
- `prisma:generate`: Kører `prisma generate` for klient
- `prisma:migrate`: Kører `prisma migrate dev` for at anvende migrations
- `prisma:reset`: Reset migrationer (slettet data)
- `prisma:seed`: Kører seed scriptet

## API endpoints
Alle endpoints ligger under `/api`.

- Users: `/api/users`
	- GET `/` — Hent alle brugere
	- GET `/:id` — Hent bruger efter id
	- POST `/` — Opret bruger
	- PUT `/:id` — Opdater bruger
	- DELETE `/:id` — Slet bruger
	- JSON body (opret/put) forventer: `{ firstname, lastname, email, password, role, isActive }`

- Posters: `/api/posters`
	- GET `/` — Hent alle posters
	- GET `/:id` — Hent poster efter id
	- POST `/` — Opret poster
	- PUT `/:id` — Opdater poster
	- DELETE `/:id` — Slet poster
	- JSON body (opret/put) forventer: `{ name, slug, description, image, width, height, price, stock }`

- Genres: `/api/genres`
	- GET `/` — Hent alle genres
	- GET `/:id` — Hent genre efter id
	- POST `/` — Opret genre
	- PUT `/:id` — Opdater genre
	- DELETE `/:id` — Slet genre
	- JSON body (opret/put) forventer: `{ title, slug }`

- Cartlines: `/api/cartlines`
	- GET `/` — Hent alle cartlines
	- GET `/:id` — Hent cartline efter id
	- POST `/` — Opret cartline
	- PUT `/:id` — Opdater cartline
	- DELETE `/:id` — Slet cartline
	- JSON body (opret/put) forventer: `{ userId, posterId, quantity }`

- UserRatings: `/api/userRatings`
	- GET `/` — Hent alle userRatings
	- GET `/:id` — Hent userRating efter id
	- POST `/` — Opret userRating
	- PUT `/:id` — Opdater userRating
	- DELETE `/:id` — Slet userRating
	- JSON body (opret/put) forventer: `{ userId, posterId, numStars }`

## Eksempler (cURL)
Opret en bruger:

```bash
curl -X POST http://localhost:3000/api/users \
	-H "Content-Type: application/json" \
	-d '{"firstname":"Test","lastname":"Bruger","email":"test2@example.com","password":"password","role":"USER","isActive":true}'
```

Opret en poster:

```bash
curl -X POST http://localhost:3000/api/posters \
	-H "Content-Type: application/json" \
	-d '{"name":"Poster 1","slug":"poster-1","description":"En fin plakat","image":"/img/poster.png","width":50,"height":70,"price":199.99,"stock":10}'
```

## Seed data
Seed-scriptet (`prisma/seed.ts`) opretter en testbruger:
- Email: `test@example.com`
- Password: `password` (hashes i seed)

## Tips til fejlsøgning
- Tjek at `DATABASE_URL` stemmer og at MySQL kører
- Kør `npm run prisma:migrate` for at sikre at databasen er migreret
- Kør `npm run prisma:seed` for at genskabe testdata

## Bidrag
- Opret en branch, lav ændringer og åbn en PR mod `main`.
- Følg repoets kodestil (TypeScript + Prisma)

## Kontakt & Licens
- For spørgsmål, kontakt repoens ejer.
- Licens: Se LICENSE filen.

God fornøjelse med Wallywood API'en!
