<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('year');
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->boolean('is_active')->default(false);
            /** @var array<int, array{title: string, description: string, icon: string}>|null */
            $table->json('objectives')->nullable();
            /** @var array<string, mixed>|null */
            $table->json('previous_season_banner')->nullable();
            /** @var array<string, mixed>|null */
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seasons');
    }
};
