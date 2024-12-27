<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class, 'index']);
Route::resource('posts', PostController::class)->except('index');

Route::get('/login', function () {
    return Inertia::render('Auth');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');


// Route::get('/', [PostController::class, 'index'])->name('home');

Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::resource('posts', PostController::class)->except('index', 'create');

Route::middleware('auth')->group(function () {

    // Add other routes that require authentication here
});

// Route::get('/', function () {
//     sleep(1);
//     return Inertia::render('Home',['name'=>'Mike']);
// });

// Route::inertia('/', 'Home');
