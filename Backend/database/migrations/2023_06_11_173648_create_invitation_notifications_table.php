<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitationNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitation_notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctorid');
            $table->foreign('doctorid')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('meetingid');
            $table->foreign('meetingid')->references('meetingid')->on('meetings')->onDelete('cascade');
            $table->boolean('status')->nullable();
            $table->boolean('accepted')->nullable();
            $table->boolean('fromoutside');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_notifications');
    }
}
