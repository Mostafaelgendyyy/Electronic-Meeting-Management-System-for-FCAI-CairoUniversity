<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--My Custom CSS Files-->
    <link rel="stylesheet" href="{{ asset('css/login.css')}}">
    <link rel="stylesheet" href="{{ asset('css/animation.css')}}">
    <link rel="stylesheet" href="{{ asset('css/style.css')}}">
    <!--Bootstrap 5-->
    <link href="{{ asset('css\bootstrap.min.css')}}" rel="stylesheet">
    <!--Font Awesome-->
    <script src="https://kit.fontawesome.com/f0525f147f.js" crossorigin="anonymous"></script>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'>
    <link rel="icon" type="image/x-icon" href="{{ asset('img/FCAILogo-removebg-preview.png')}}">
    <title>تسجيل الدخول</title>
</head>
<body id="signupbody">

<div class="sign-up-card">
    <section class="fade-in">
        <h1>ضبط كلمة المرور</h1>
        <form method="POST" action="{{ route('password.update') }}" style="position: relative;" class="needs-validation" novalidate>
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

            <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                <div class="col-md-6">
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                    @error('email')
                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                    @enderror
                </div>
            </div>

            <label for="resetpassword">كلمة المرور الجديدة</label>
            <input type="password" id="password" class="form-control" required >
            <div class="invalid-feedback">
            </div>

            <label for="resetpassword">تاكيد كلمة المرور</label>
            <input type="password" id="password" class="form-control" required >
            <div class="invalid-feedback">
            </div>
            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror

            <button type="submit">تغير كلمه المرور</button>

        </form>
    </section>
</div>



<!--JS Files-->
<script src="{{ asset('js/animation.js')}}"></script>
<script src="{{ asset('js/flipcard.js')}}"></script>
<script src="{{ asset('js/popper.min.js')}}"></script>
<script src="{{ asset('js/bootstrap.min.js')}}"></script>

</body>
</html>







<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--My Custom CSS Files-->
    <link rel="stylesheet" href="{{ asset('css/login.css')}}">
    <link rel="stylesheet" href="{{ asset('css/animation.css')}}">
    <link rel="stylesheet" href="{{ asset('css/style.css')}}">
    <!--Bootstrap 5-->
    <link href="{{ asset('css\bootstrap.min.css')}}" rel="stylesheet">
    <!--Font Awesome-->
    <script src="https://kit.fontawesome.com/f0525f147f.js" crossorigin="anonymous"></script>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'>
    <link rel="icon" type="image/x-icon" href="{{ asset('img/FCAILogo-removebg-preview.png')}}">
    <title>تسجيل الدخول</title>
</head>
<body id="signupbody">

<div class="sign-up-card">
    <section class="fade-in">
        <h1>ضبط كلمة المرور</h1>
        <div class="row justify-content-center">

            <div class="card-body">
                <form method="POST" action="{{ route('password.update') }}">
                    @csrf

                    <input type="hidden" name="token" value="{{ $token }}">


                    <input  type="hidden" id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                    @error('email')
                    <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                    @enderror

                    <label for="password">كلمة المرور الجديدة</label>

                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                    @enderror


                    <label for="password-confirm">تاكيد كلمة المرور</label>

                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">



                    <button type="submit">تغير كلمه المرور</button>

                </form>
            </div>
        </div>
    </section>
</div>


<!--JS Files-->
<script src="{{ asset('js/animation.js')}}"></script>
<script src="{{ asset('js/flipcard.js')}}"></script>
<script src="{{ asset('js/popper.min.js')}}"></script>
<script src="{{ asset('js/bootstrap.min.js')}}"></script>

</body>
</html>
