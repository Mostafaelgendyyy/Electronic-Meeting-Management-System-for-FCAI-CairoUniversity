<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!--My Custom CSS Files-->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/animation.css') }}">
    <link rel="stylesheet" href="{{ asset('css/CreateSubject.css') }}">
    <!--Bootstrap 5-->
    <link href="{{ asset('css\bootstrap.min.css') }}" rel="stylesheet">
    <link rel=”stylesheet” href=”https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css”rel=”nofollow”
          integrity=”sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm” crossorigin=”anonymous”>
    <!--Font Awesome-->
    <!-- <script src="https://kit.fontawesome.com/f0525f147f.js" crossorigin="anonymous"></script> -->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'>
    <link rel="icon" type="image/x-icon" href="{{ asset('img/FCAILogo-removebg-preview.png') }}">
    <title>إنشاء الموضوع</title>
    <script>
        window.onload = function () {
            displaySubjetsType();
        };
    </script>
</head>

<body>
<!--First Section Header Start-->
<section class="firstheader">
    <div class="container d-flex justify-content-between">
        <div>
            <a href=""><img src="{{ asset('img/FCAILogo-removebg-preview.png')}}" class="fade-in " height="60" width="60" alt=""></a>
            <span class="fcai fade-in">كلية الحاسبــــات و الذكـــاء الاصطناعى</span>
        </div>
        <ul class="icons fade-in">
            <a class="icon" href="createmeeting.html"><i class="fa-solid fa-house"></i></a>
            <a class="icon" href="profile.html"><i class="fa-regular fa-user"></i></a>
            <a id="logout" onclick="logout()" class="btn logoutt">تسجيل الخروج</a>
        </ul>
    </div>
    <br>
</section>
<!--First Section Header End-->
<!--Navbar Start-->
<div class="NavBar">
    <div class="container">
        <nav class="navbar navbar-expand-lg ">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse fade-in" id="navbarNavAltMarkup">
                <div class="navbar-nav mx-auto">
{{--                    <a class="nav-link" href="createmeeting.html">الاجتماعات</a>--}}
{{--                    <a class="nav-link" href="initiatornotification.html">الإشعارات</a>--}}
{{--                    <a class="nav-link" href="archive.html">أرشيف</a>--}}
{{--                    <a class="nav-link" href="CreateSubject.html">إنشاء مواضيع</a>--}}
                </div>
            </div>
        </nav>
    </div>
</div>
<!--Navbar End-->

<!--Create Sub Start-->
<div class="container">
    <div class="createSub">
        <br>
        <h3>اضافه مرفقات</h3>
        <br>
        <form method="post" action{{ route('upload',$subjectid) }}="" enctype="multipart/form-data" >
            @csrf
            <label
                style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif ; font-size: large;">
                اضف المرفقات</label>
            <br>
            <input  type="text" hidden="hidden" name="subjectid"  placeholder="subject" value = {{$subjectid}}>
            <br>
            <input type='file' name='files[]' multiple>
            <button type="submit" onclick="send()" class="SendBtn">إرسال</button>
        </form>
    </div>
</div>
<!--Create Sub End-->
<!--Footer Copyright Start-->
<div class="lastsection">
    <center>
        <div class="textlastsection">
            <h6> © 2023 جميع الحقوق محفوظة لدي FCAI </h6>
        </div>
    </center>
</div>
<!--Footer Copyright End-->

<!--JS Files-->
<script src="{{ asset('js/animation.js') }}"></script>
<script src="{{ asset('js/flipcard.js') }}"></script>
<script src="{{ asset('js/popper.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>

</body>

</html>
