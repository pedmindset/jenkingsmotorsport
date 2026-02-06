<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/legacy', function () {
    return Inertia::render('Legacy');
})->name('legacy');

Route::get('/the-machine', function () {
    return Inertia::render('TheMachine');
})->name('the-machine');

Route::get('/partners', function () {
    return Inertia::render('Partnerships');
})->name('partners');

Route::get('/season', function () {
    return Inertia::render('Season2026');
})->name('season');

Route::get('/le-mans', function () {
    return Inertia::render('LeMans');
})->name('le-mans');

Route::get('/championship', function () {
    return Inertia::render('Championship');
})->name('championship');

Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'storeContact'])->name('contact.store');
Route::post('/sponsorship', [ContactController::class, 'storeSponsorship'])->name('sponsorship.store');
Route::post('/newsletter/subscribe', [\App\Http\Controllers\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('terms');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/category/{category:slug}', [BlogController::class, 'showByCategory'])->name('blog.category');
Route::get('/blog/tag/{tag:slug}', [BlogController::class, 'showByTag'])->name('blog.tag');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
