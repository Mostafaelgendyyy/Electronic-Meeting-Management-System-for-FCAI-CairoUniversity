<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id('meetingid');
            $table->unsignedBigInteger('initiatorid');
            $table->foreign('initiatorid')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('placeid');
            $table->foreign('placeid')->references('id')->on('places')->onDelete('cascade');
            $table->date('date');
            $table->tinyInteger('islast'); # ---> 0 no , 1 yes
            $table->unsignedBigInteger('meetingtypeid');
            $table->foreign('meetingtypeid')->references('id')->on('meetingtypes')->onDelete('cascade');
            $table->time('startedtime');
            $table->time('endedtime')->default('00:00:00')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meetings');
    }
}
