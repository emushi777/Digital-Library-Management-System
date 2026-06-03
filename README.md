# Biblioteka Digjitale

Biblioteka Digjitale eshte aplikacion per menaxhimin dhe leximin e librave digjital. Sistemi perfshin katalog librash, autore, kategori, koleksione personale, bookmarks, wishlist, reviews, abonime, kerkesa per libra, feedback dhe dashboard.

## Teknologjite

- Backend: PHP Laravel 10
- Frontend: ReactJS me Inertia.js
- Stilizimi: Tailwind CSS
- Databaza: MySQL
- Auth/Siguria: Laravel Breeze session auth per UI dhe Laravel Sanctum token auth per API

## Funksionalitetet kryesore

- Regjistrim, login, logout dhe profil perdoruesi
- Dashboard obligativ me libra te fundit dhe rekomandime
- CRUD per libra, autore, kategori, koleksione, bookmarks, wishlists, reviews, FAQs dhe kerkesa librash
- Koleksion default `Finished`, i mbrojtur nga edit/delete
- Shfaqje e kopertinave nga databaza
- Search per libra dhe perzgjedhje librash ne koleksione
- Role admin per menaxhim te katalogut
- API JSON e mbrojtur me token Sanctum

## Instalimi

1. Instalo dependencies:

```bash
composer install
npm install
```

2. Krijo konfigurimin lokal:

```bash
copy .env.example .env
php artisan key:generate
```

3. Konfiguro databazen ne `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=auto
DB_DATABASE=biblioteka_digjitale
DB_USERNAME=root
DB_PASSWORD=
```

4. Ekzekuto migrimet:

```bash
php artisan migrate
```

5. Nise aplikacionin:

```bash
php artisan serve
npm run dev
```

Per production build:

```bash
npm run build
```

## Siguria

- Faqet kryesore jane brenda middleware `auth` dhe `verified`.
- API perdor `auth:sanctum`.
- Te dhenat personale si collections, bookmarks, wishlists, reviews, finished books, subscriptions dhe feedback filtrohen sipas `user_id`.
- Koleksioni `Finished` nuk mund te fshihet apo editohet.
- Katalogu global si books, authors, categories, FAQs dhe plans kerkon rol admin per shkrim ne API.

## API

Base URL:

```text
/api
```

### Login

```http
POST /api/login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response kthen `token`. Per endpoint-et e mbrojtura perdor:

```http
Authorization: Bearer TOKENI
```

### User aktual

```http
GET /api/user
POST /api/logout
```

### CRUD resources

Endpoint-et JSON jane:

```text
GET    /api/v1/{resource}
POST   /api/v1/{resource}
GET    /api/v1/{resource}/{id}
PUT    /api/v1/{resource}/{id}
PATCH  /api/v1/{resource}/{id}
DELETE /api/v1/{resource}/{id}
```

Resources te perkrahura:

- `authors`
- `books`
- `categories`
- `collections`
- `bookmarks`
- `wishlists`
- `reviews`
- `faqs`
- `book-requests`
- `feedback`
- `finished-books`
- `plans`
- `subscriptions`

Shembull:

```http
GET /api/v1/books
```

```http
POST /api/v1/reviews
```

```json
{
  "book_id": 1,
  "vleresimi": 4.5,
  "komenti": "Liber shume i mire."
}
```

## Entitetet kryesore

- User
- Author
- Category
- Book
- Collection
- Bookmark
- Wishlist
- Review
- FinishedBook
- Plan
- Subscription
- BookRequest
- Feedback
- FAQ

## Testim dhe kompatibilitet

Aplikacioni duhet te testohet ne:

- Chrome
- Firefox
- Safari
- Brave
- Edge

Kontrolle te shpejta para prezantimit:

```bash
php artisan route:list
php artisan test
npm run build
```

## Performanca

- Query-t kryesore perdorin eager loading (`with`) per relacione si author, category dhe book.
- API perdor pagination ne `GET /api/v1/{resource}`.
- Frontend-i build-ohet me Vite per performance me te mire.

## Shenime per prezantim

Projekti i permbush kerkesat kryesore:

- Laravel backend
- React frontend
- Tailwind CSS
- MySQL relational database
- Dashboard
- Auth dhe mbrojtje te routes
- CRUD ne UI dhe API JSON
- Dokumentim i API-se dhe perdorimit
