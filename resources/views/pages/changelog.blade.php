<?php
use App\Services\ChangelogService;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use function Laravel\Folio\name;
use function Laravel\Folio\render;

name('changelog');

render(function () {
    if (Session::get('changelog_unlocked') !== true) {
        abort(404);
    }

    $changelog = app(ChangelogService::class);
    $isAdmin   = auth()->check() && auth()->user()->isAdmin();

    return Inertia::render('Changelog', [
        'initialMonths' => $changelog->availableMonths('all'),
        'categories'    => $changelog->categories(),
        'isAdmin'       => $isAdmin,
    ]);
});
?>