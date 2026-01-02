<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_texts', function (Blueprint $table) {
            $table->text('heading_before')->nullable()->after('content');
            $table->text('heading_keyword')->nullable()->after('heading_before');
            $table->text('heading_after')->nullable()->after('heading_keyword');
        });
    }

    public function down(): void
    {
        Schema::table('site_texts', function (Blueprint $table) {
            $table->dropColumn(['heading_before', 'heading_keyword', 'heading_after']);
        });
    }
};