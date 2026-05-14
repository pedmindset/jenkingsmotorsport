<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChampionshipPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryPageController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegacyPageController;
use App\Http\Controllers\LeMansPageController;
use App\Http\Controllers\MachinePageController;
use App\Http\Controllers\PartnershipPageController;
use App\Http\Controllers\SeasonPageController;
use App\Models\Season;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, '__invoke'])->name('home');

Route::get('/legacy', [LegacyPageController::class, '__invoke'])->name('legacy');

Route::get('/the-machine', [MachinePageController::class, '__invoke'])->name('the-machine');

Route::get('/partners', [PartnershipPageController::class, '__invoke'])->name('partners');

Route::get('/season', function () {
    $season = Season::resolveForPublicRedirect();

    return redirect()->route('season.show', ['season' => $season->slug]);
})->name('season');

Route::get('/season/{season:slug}', [SeasonPageController::class, '__invoke'])->name('season.show');

Route::get('/le-mans', [LeMansPageController::class, '__invoke'])->name('le-mans');

Route::get('/championship', [ChampionshipPageController::class, '__invoke'])->name('championship');

Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'storeContact'])->name('contact.store');
Route::post('/sponsorship', [ContactController::class, 'storeSponsorship'])->name('sponsorship.store');
Route::post('/newsletter/subscribe', [\App\Http\Controllers\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms-of-service');

Route::get('/cookie-policy', function () {
    return Inertia::render('CookiePolicy');
})->name('cookie-policy');

Route::get('/gallery', [GalleryPageController::class, '__invoke'])->name('gallery');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/category/{category:slug}', [BlogController::class, 'showByCategory'])->name('blog.category');
Route::get('/blog/tag/{tag:slug}', [BlogController::class, 'showByTag'])->name('blog.tag');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
