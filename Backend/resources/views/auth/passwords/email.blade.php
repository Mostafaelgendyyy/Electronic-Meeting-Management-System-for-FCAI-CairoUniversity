<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--My Custom CSS Files-->
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <link rel="stylesheet" href="{{ asset('css/animation.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <!--Bootstrap 5-->
    <link href="{{ asset('css\bootstrap.min.css') }}" rel="stylesheet">
    <!--Font Awesome-->
    <script src="https://kit.fontawesome.com/f0525f147f.js" crossorigin="anonymous"></script>

    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'>
    <link rel="icon" type="image/x-icon" href="logos/FCAILogo-removebg-preview.png">
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'>
    <link rel="icon" type="image/x-icon" href="../img/FCAILogo-removebg-preview.png">

    <!--JS Files-->




    <title>نسيت كلمة المرور</title>
</head>
<body id="signupbody">

<!--Sign Up Card Start-->

<div class="sign-up-card">
    <section class="fade-in">

        <h1>نسيت الكلمة المرور</h1>
        <div class="card-body">

            <form method="POST" action{{ route('password.email') }}="">
                @csrf

                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif

                <input id="email" placeholder="أدخل بريدك الألكتروني" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                <span class="text-danger" role="alert">
                    @error('email')<strong>{{ $message }}</strong>@enderror
                </span>


                <div class="invalid-feedback">
                </div>
                <button type="submit">إرسال
                </button>
                <br>
                <a href="login.html" style="text-decoration: none; color: white; width: 100%;"><button type="button">رجوع</button></a>

            </form>
        </div>
        <!--<a href="index.html" class="loginLink"><span><strong>Go Home</strong></span></a> -->
    </section>
</div>
<!--Sign Up Card End-->
<script src="{{ asset('js/animation.js')}}"></script>
<script src="{{ asset('js/flipcard.js')}}"></script>
<script src="{{ asset('js/popper.min.js')}}"></script>
<script src="{{ asset('js/bootstrap.min.js')}}"></script>
<script src="{{ asset('js/forgetpassword.js')}}"></script>

</body>
</html>


