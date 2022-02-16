<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Createbookstable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->float('price')->default(0);
            $table->string('description', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->text('content')->nullable();
            $table->integer('views')->unsigned()->default(0);
            $table->timestamps();
            $table->softDeletes();
            $table->string('deleted_by', 127)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
