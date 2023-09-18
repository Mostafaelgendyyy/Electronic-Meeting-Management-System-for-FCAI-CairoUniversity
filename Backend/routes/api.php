<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\GroupUserController;
use App\Http\Controllers\InvitedController;
use App\Http\Controllers\meetingController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\subjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\adminController;
use App\Http\Controllers\MeetingInitiatorController;
use App\Http\Controllers\subjectControllerController;
use App\Http\Controllers\doctorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\containerSubjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('Auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



/****************** ADMIN *****************/

Route::prefix('admin')->middleware('auth:sanctum')->group(function (){
    Route::get('/Interface',[adminController::class, 'index']);

    Route::get('/getAdmin/{adminid?}',[adminController::class,'show']);

    Route::get('/getAdminByemail/{email}',[adminController::class,'showbyEmail']);

    Route::get('/getAdminByusername/{username}',[adminController::class,'showbyUsername']);

    Route::post('/adddoctor',[adminController::class,'addDoctor']);

    Route::post('/addSubjectController',[adminController::class,'addSubjectController']);

    Route::post('/addInitiator',[adminController::class,'addInitiator']);

    Route::post('/addAdmin',[adminController::class,'addAdmin']);

    Route::delete('/delete-doctor/{id}',[adminController::class,'deleteDoctor']);

    Route::delete('/delete-initiator/{id}',[adminController::class,'deleteInitiator']);

    Route::delete('/delete-admin/{id}',[adminController::class,'deleteAdmin']);

    Route::delete('/delete-controller/{id}',[adminController::class,'deleteSubjectController']);

    Route::delete('delete-user/{id}',[UserController::class,'destroy']);

    Route::get('/controllers',[adminController::class,'getControllers']);

    Route::get('/admins',[adminController::class,'getAdmins']);

    Route::get('/doctors',[adminController::class,'getDoctors']);

    Route::get('/initiators',[adminController::class,'getInitiators']);

    Route::post('/update-profile/{id}',[UserController::class,'update']);

    Route::get('/subjects/{containerID}',[containerSubjectController::class,'getSubjectsofContainer']);

    Route::post('UpdateUSER/{id}',[UserController::class,'UpdateUserROle']);

    Route::post('addPlace',[adminController::class,'addPlace']);

    Route::delete('deletePlace/{id}',[adminController::class,'deletePlace']);

    Route::get('places',[PlaceController::class,'getall']);

    Route::post('addAdminstration',[adminController::class,'addAdminstration']);

    Route::delete('deleteAdminstration/{id}',[adminController::class,'deleteAdminstration']);

    Route::post('addInvited',[InvitedController::class,'store']);

    Route::delete('deleteInvited/{id}',[InvitedController::class,'destroy']);

    Route::post('addMeetingtype',[\App\Http\Controllers\meetingTypeController::class,'store']);

    Route::post('updateMeetingtype',[\App\Http\Controllers\meetingTypeController::class,'update']);

    Route::delete('deleteMeetingtype/{id}',[\App\Http\Controllers\meetingTypeController::class,'destroy']);

    Route::post('addSubjecttype',[\App\Http\Controllers\subjectTypeController::class,'store']);

    Route::post('updateSubjecttype',[\App\Http\Controllers\subjectTypeController::class,'update']);

    Route::delete('deleteSubjecttype',[\App\Http\Controllers\subjectTypeController::class,'destroy']);

    Route::get('invited',[InvitedController::class,'viewall']);

    Route::post('CreateGroup',[MeetingInitiatorController::class,'makegroup']);

    Route::post('addGroupUsers/{initiatorid}',[MeetingInitiatorController::class,'adduserstogroup']);

    Route::get('GroupUser/{id}',[GroupUserController::class,'RetreiveGroupUsers']);

    Route::delete('deletegroup/{initiatorid}',[MeetingInitiatorController::class,'deleteGroup']);

    Route::delete('deleted/{initiatorid}/{userid}', [MeetingInitiatorController::class,'deletefromGroup']);

    Route::get('Subjecttype',[\App\Http\Controllers\subjectTypeController::class,'getAll']);

    Route::get('Meetingtype',[\App\Http\Controllers\meetingTypeController::class,'getAll']);

    Route::get('adminstration/{id}',[\App\Http\Controllers\AdminstrationController::class,'show']);

    Route::get('adminstrations',[\App\Http\Controllers\AdminstrationController::class,'getall']);

    Route::get('DoctorsandInitiator/{initiatorid}',[UserController::class,'getDoctorsandInitiator']);

});

/****************** Doctor *****************/

Route::prefix('doctor')->middleware('auth:sanctum')->group(function (){

    Route::get('/Interface',[doctorController::class, 'index']);

    Route::post('/update-profile/{id}',[UserController::class,'update']);

    Route::post('voteaccept-meeting',[containerSubjectController::class,'voteAccept']);

    Route::post('votereject-meeting',[containerSubjectController::class,'voteReject']);

    Route::get('/subjects/{containerID}',[containerSubjectController::class,'getSubjectsofContainer']);

    Route::get('/notifications/{id}',[doctorController::class,'getNotification']);

    Route::get('upcomingMeeting/{id}',[meetingController::class,'getUpcomingMeetingsforDoctor']);

    Route::post('acceptRequest',[\App\Http\Controllers\InvitationNotificationsController::class,'acceptRequest']);

    Route::post('rejectRequest',[\App\Http\Controllers\InvitationNotificationsController::class,'rejectRequest']);

    Route::post('SubjectForMeetings',[doctorController::class,'subjectsOfMeetingForDoctors']); // FOR DOCTOR
////////////////////////////////
    Route::get('Meetingtype/{id}',[\App\Http\Controllers\meetingTypeController::class,'show']);

    Route::get('Subjecttype/{id}',[\App\Http\Controllers\subjectTypeController::class,'show']);

    Route::get('place/{id}',[PlaceController::class,'show']);

    Route::get('DoctorPDF/{initiatorid}',[meetingController::class,'DataPreviousforPDF']);
});


/********************** Meeting initiator ******************/



Route::prefix('meeting-initiator')->middleware('auth:sanctum')->group(function (){

    Route::get('/Interface',[MeetingInitiatorController::class, 'index']);

    Route::post('create-subject',[subjectController::class,'store']);

    Route::post('/create-Meeting',[MeetingInitiatorController::class,'createMeeting']);

    Route::post('/request-doctor/{id}',[MeetingInitiatorController::class,'RequestDoctor']);

    Route::post('CreateGroup',[MeetingInitiatorController::class,'makegroup']);

    Route::post('addGroupUsers/{initiatorid}',[MeetingInitiatorController::class,'adduserstogroup']);

    Route::get('GroupUser/{id}',[GroupUserController::class,'RetreiveGroupUsers']);

    Route::delete('deleted/{initiatorid}/{userid}', [MeetingInitiatorController::class,'deletefromGroup']);

    Route::delete('deletegroup/{initiatorid}',[MeetingInitiatorController::class,'deleteGroup']);

    Route::get('RequestGroup/{initiatorid}/{meetingid}',[MeetingInitiatorController::class,'requestGroupforMeeting']);

    Route::post('Request-invited',[MeetingInitiatorController::class,'RequestInvited']);

    Route::get('invited',[InvitedController::class,'viewall']);

    Route::get('Adminstrationsdoctors/{id}',[UserController::class,'usersbyAdminstration']);

    Route::delete('/delete-Meeting',[MeetingInitiatorController::class,'deleteMeeting']);

    Route::post('/update-profile/{id}',[UserController::class,'update']);

    Route::get('/previous-Meeting/{id}',[MeetingInitiatorController::class,'getPreviousMeeting']);

    Route::get('Archived/{initiatorid}',[subjectController::class,'showArchive']);

    Route::get('SubjectsData/{id}',[subjectController::class,'show']);

    Route::get('currentMeeting/{id}',[meetingController::class,'RetreivedataforLast']);

    Route::get('end-meeting/{meetingid}',[meetingController::class,'FinalizeMeeting']);

    Route::get('InitPDFData/{initiatorid}',[meetingController::class,'DataPreviousforPDF']);

    Route::get('upcoming/{initiatorid}',[meetingController::class,'getUpcomingMeetingsforInitiator']);

    Route::get('search/{desc}',[subjectControllerController::class,'SearchSubject']);

    Route::get('DoctorsandInitiator/{initiatorid}',[UserController::class,'getDoctorsandInitiator']);

    Route::get('searchusers/{name}',[UserController::class,'searchbyname']);

    Route::get('SubjectForMeetings/{meetingid}',[\App\Http\Controllers\MeetingSubjectsController::class,'getSubjectsofMeeting']);

    Route::get('doctorsinvited/{meetingid}',[\App\Http\Controllers\InvitationNotificationsController::class,'getDoctorsInvited']);

    Route::get('MeetingOfSubjects/{subjectid}',[\App\Http\Controllers\MeetingSubjectsController::class,'getMeetings']);

    Route::get('Subjecttype',[\App\Http\Controllers\subjectTypeController::class,'getAll']);

    Route::get('Meetingtype',[\App\Http\Controllers\meetingTypeController::class,'getAll']);

    Route::get('Subjecttype/{id}',[\App\Http\Controllers\subjectTypeController::class,'show']);

    Route::get('Meetingtype/{id}',[\App\Http\Controllers\meetingTypeController::class,'show']);

    Route::get('User/{id}',[\App\Http\Controllers\UserController::class,'show']);

    Route::post('acceptRequest',[\App\Http\Controllers\InvitationNotificationsController::class,'acceptRequest']);

    Route::post('rejectRequest',[\App\Http\Controllers\InvitationNotificationsController::class,'rejectRequest']);

    Route::get('places',[PlaceController::class,'getall']);

    Route::get('place/{id}',[PlaceController::class,'show']);

    ////////////////////////////////// list of DOCTORS
    Route::get('DoctorsandInitiators/{initiatorid}/{adminstrationid}',[UserController::class,'getDoctorsandInitiatorbyAdminstration']);

    Route::get('adminstrations',[\App\Http\Controllers\AdminstrationController::class,'getall']);

    Route::post('addabsent',[MeetingInitiatorController::class,'addAbsent']);

    Route::post('addattendee',[MeetingInitiatorController::class,'addAttendee']);

    Route::get('/notifications/{id}',[doctorController::class,'getNotification']);

    Route::post('SubjectForMeetings',[doctorController::class,'subjectsOfMeetingForDoctors']);

    Route::post('saveDecision', [\App\Http\Controllers\MeetingSubjectsController::class,'takeDecision']);

});


/****************** Subject Controller *****************/

Route::prefix('subjectController')->middleware('auth:sanctum')->group(function (){

    Route::get('/Interface',[subjectControllerController::class, 'index']);

    Route::post('create-subject',[subjectController::class,'store']);

    Route::get('subjects-for-controller/{id}',[subjectControllerController::class,'getSubjects']);

    Route::post('/addSubject-in-Meeting',[subjectControllerController::class,'AddSubjecttoMeeting']); //takes List of Json

    Route::post('redirect/{id}',[subjectController::class,'redirectSubject']);

    Route::delete('/remove-subject/{id}',[subjectControllerController::class,'RemoveSubjectFromMeeting']);

    Route::post('/update-profile/{id}',[UserController::class,'update']);

    Route::get('Subjects/{controllerid}',[subjectControllerController::class,'getSubjects']);

    Route::get('ControllerPDFData/{id}',[meetingController::class,'DataPreviousforPDFCONTROLLER']);

    Route::get('upcomings/{id}',[meetingController::class,'getUpcomingMeetingsforcontroller']);

    Route::delete('deletesubjectinMeeting',[\App\Http\Controllers\MeetingSubjectsController::class,'destroyByRequest']);

    Route::get('Subjecttype',[\App\Http\Controllers\subjectTypeController::class,'getAll']);

    Route::get('Subjecttype/{id}',[\App\Http\Controllers\subjectTypeController::class,'show']);

    Route::get('SubjectForMeetings/{meetingid}',[\App\Http\Controllers\MeetingSubjectsController::class,'getSubjectsofMeeting']);

    Route::get('Meetingtype/{id}',[\App\Http\Controllers\meetingTypeController::class,'show']);

});


/**
 *
 * Login APIS
 *
 */

Route::get('User/{id}',[\App\Http\Controllers\UserController::class,'show']);

Route::get('adminstration/{id}',[\App\Http\Controllers\AdminstrationController::class,'show']);

Route::post('checkPass',[UserController::class,'checkPassword']);

Route::post('/change-password/{id}',[UserController::class,'changePassword']);

Route::post('login',[UserController::class,'login']);

Route:: middleware('auth:sanctum')->group(function (){

    Route::post('logout',[UserController::class,'logout']);

});
//Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('/forgotpassword', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
//Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');




