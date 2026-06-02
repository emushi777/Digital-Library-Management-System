<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\BookImportController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FaqController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookRequestController;
use Inertia\Inertia;

// Rrugët publike
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', function () { 
    return Inertia::render('About'); 
})->name('about.index');

// Rrugët e mbrojtura me login
Route::middleware(['auth', 'verified'])->group(function () {

    // 1. Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 2. Sistemet kryesore (Resource Routes)
    Route::resource('authors', AuthorController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('books', BookController::class);
    Route::resource('collections', CollectionController::class);
    Route::resource('bookmarks', BookmarkController::class)->except(['show']);
    Route::resource('reviews', ReviewController::class)->except(['show']);
    Route::resource('wishlists', WishlistController::class)->except(['show']);
    Route::resource('faqs', FaqController::class)->except(['show']);

    // 3. Rrugë specifike (Custom Routes)
    Route::post('/books/{book}/finish', [BookController::class, 'finish'])->name('books.finish');
    Route::post('/books/import', [BookImportController::class, 'import'])->name('books.import');
    
    Route::post('/collections/add-book', [CollectionController::class, 'addBook'])->name('collections.addBook');
    Route::post('/collections/remove-book', [CollectionController::class, 'removeBook'])->name('collections.removeBook');


    Route::post('/book-requests', [BookRequestController::class, 'store'])->name('book-requests.store');
    Route::get('/book-requests', [BookRequestController::class, 'index'])->name('book-requests.index');
    Route::get('/book-requests/create', [BookRequestController::class, 'create'])->name('book-requests.create');
    Route::patch('/book-requests/{bookRequest}', [BookRequestController::class, 'update'])->name('book-requests.update');
    Route::delete('/book-requests/{bookRequest}', [BookRequestController::class, 'destroy'])->name('book-requests.destroy');
    
    // 4. Abonimet
    Route::get('/checkout/{plan_id}', [SubscriptionController::class, 'checkout'])->name('checkout.index');
    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe.store');

    // 5. Feedback & Kontakt
    Route::get('/contact', function () { return "Contact Page - To be built"; })->name('contact.index');
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');
    Route::get('/admin/feedback', [FeedbackController::class, 'index'])->name('admin.feedback');

    // 6. Menaxhimi i Profilit
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';