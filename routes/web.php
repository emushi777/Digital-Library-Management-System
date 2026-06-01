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
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CollectionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

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

// Grupi i rrugëve që kërkojnë login (auth)
Route::middleware(['auth', 'verified'])->group(function () {

    // 1. Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 2. Sistemet kryesore (Authors, Categories, Books)
    Route::resource('authors', AuthorController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('books', BookController::class);
    Route::resource('bookmarks', BookmarkController::class);
    Route::resource('wishlists', WishlistController::class);
    Route::resource('reviews', ReviewController::class);
    
    // Menaxhimi i Koleksioneve (Kjo i krijon automatikisht index, create, store, show, edit, update, destroy)
    Route::resource('collections', CollectionController::class);
    // Kjo është rruga e re që na duhet për të shtuar libra brenda koleksionit
    Route::post('/collections/add-book', [CollectionController::class, 'addBook'])->name('collections.addBook');
    Route::post('/collections/remove-book', [CollectionController::class, 'removeBook'])->name('collections.removeBook');

    // 3. Abonimet & Checkout
    Route::get('/checkout/{plan_id}', [SubscriptionController::class, 'checkout'])->name('checkout.index');
    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe.store');

    // 4. Menaxhimi i Profilat
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
