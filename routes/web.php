<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Grupi i rrugëve që kërkojnë login (auth)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // 1. Dashboard (Era po punon këtu, shfaq planet)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 2. Checkout (Faqja e pagesës që krijuam bashkë)
    // Kjo rrugë i duhet butonit "Subscribe Now"
    Route::get('/checkout/{plan_id}', [SubscriptionController::class, 'checkout'])->name('checkout.index');

    // 3. Ruajtja e abonimit (Për butonin "Get Started" dhe "Confirm & Pay")
    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe.store');

    // 4. Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';