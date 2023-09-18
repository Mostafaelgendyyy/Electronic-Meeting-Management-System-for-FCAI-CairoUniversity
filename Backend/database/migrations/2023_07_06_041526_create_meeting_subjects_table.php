<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeetingSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_subjects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meetingid');
            $table->foreign('meetingid')->references('meetingid')->on('meetings')->onDelete('cascade');
            $table->unsignedBigInteger('subjectid');
            $table->foreign('subjectid')->references('subjectid')->on('subjects')->onDelete('cascade');
            $table->string('decision')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_subjects');
    }
}
