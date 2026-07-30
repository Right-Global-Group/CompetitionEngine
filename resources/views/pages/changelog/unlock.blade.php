<?php
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use function Laravel\Folio\name;
use function Laravel\Folio\render;

name('changelog.password');

render(function () {
    return Inertia::render('Changelog/Password');
});
?>
