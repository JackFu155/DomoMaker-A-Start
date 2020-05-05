"use strict";

//Login React Function
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Sorry! Username or Password is Empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; //Forgot React Function


var handleForgot = function handleForgot(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#email").val() == '') {
    handleError("It is Empty, Please enter Email");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; //React Signup Function


var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#email").val() == '' || $("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("Sorry! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
}; //Login Window HTML


var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign In"
    }), /*#__PURE__*/React.createElement("section", {
      id: "inner"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/forgot"
    }, /*#__PURE__*/React.createElement("h3", {
      id: "forgot"
    }, "Forgot Password"))))
  );
}; //Forgot Window HTML


var ForgotWindow = function ForgotWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "forgotForm",
      name: "forgotForm",
      onSubmit: handleForgot,
      action: "/forgot",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("section", {
      id: "inner"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Email: "), /*#__PURE__*/React.createElement("input", {
      id: "email",
      type: "text",
      name: "email",
      placeholder: "email"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Send",
      onclick: "sendEmail()"
    })))
  );
}; //Signup Window HTML


var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Email: "), /*#__PURE__*/React.createElement("input", {
      id: "email",
      type: "text",
      name: "email",
      placeholder: "email"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
}; //Profile Render


var ProfileWindow = function ProfileWindow(props) {
  return (/*#__PURE__*/React.createElement("h1", {
      id: "profile"
    }, "Future Profile Page Coming Soon")
  );
}; //Login Render


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; //Forgot Render


var createForgotWindow = function createForgotWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ForgotWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; //Signup Render


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; //Profile Create


var createProfileWindow = function createProfileWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ProfileWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var forgotButton = document.querySelector("#forgot");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  forgotButton.addEventListener("click", function (e) {
    e.preventDefault();
    createForgotWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
