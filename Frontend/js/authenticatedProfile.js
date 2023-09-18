var token = localStorage.getItem('token');

if (!token) {
    // Token does not exist, so redirect the user to the login page
    window.location.href = "http://127.0.0.1:5500/login.html";
  }
