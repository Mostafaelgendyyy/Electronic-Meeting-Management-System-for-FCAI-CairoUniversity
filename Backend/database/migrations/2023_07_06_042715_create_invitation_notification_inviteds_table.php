<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitationNotificationInvitedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitation_notification_inviteds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invitedid');
            $table->foreign('invitedid')->references('id')->on('inviteds')->onDelete('cascade');
            $table->unsignedBigInteger('meetingid');
            $table->foreign('meetingid')->references('meetingid')->on('meetings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_notification_inviteds');
    }
}
