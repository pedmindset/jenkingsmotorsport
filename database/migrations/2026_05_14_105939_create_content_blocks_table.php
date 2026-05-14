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
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug');
            $table->string('block_key');
            /** @var array<string, mixed> */
            $table->json('payload');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['page_slug', 'block_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
    }
};
