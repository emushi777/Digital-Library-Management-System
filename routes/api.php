<?php

use App\Http\Controllers\Api\AuthTokenController;
use App\Http\Controllers\Api\ResourceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthTokenController::class, 'store'])->name('api.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthTokenController::class, 'destroy'])->name('api.logout');

    $resourcePattern = implode('|', ResourceController::RESOURCE_NAMES);

    Route::prefix('v1')->controller(ResourceController::class)->group(function () use ($resourcePattern) {
        Route::get('/{resource}', 'index')->where('resource', $resourcePattern);
        Route::post('/{resource}', 'store')->where('resource', $resourcePattern);
        Route::get('/{resource}/{id}', 'show')->where('resource', $resourcePattern)->whereNumber('id');
        Route::match(['put', 'patch'], '/{resource}/{id}', 'update')->where('resource', $resourcePattern)->whereNumber('id');
        Route::delete('/{resource}/{id}', 'destroy')->where('resource', $resourcePattern)->whereNumber('id');
    });
});
