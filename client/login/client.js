//Login React Function
const handleLogin = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() ==''){
        handleError("Sorry! Username or Password is Empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

//Forgot React Function
const handleForgot = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#email").val() == ''){
        handleError("It is Empty, Please enter Email");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

//React Signup Function
const handleSignup = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#email").val() == '' || $("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("Sorry! All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
};

//Login Window HTML
const LoginWindow = (props) =>{
    return (
        <form id="loginForm" name="loginForm"
              onSubmit={handleLogin}
              action="/login"
              method="POST"
              className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign In" />
            <section id="inner">
            <a href="/forgot"><h3 id="forgot">Forgot Password</h3></a>
            </section>
        </form>
    );
};

//Forgot Window HTML
const ForgotWindow = (props) =>{
    return (
        <form id="forgotForm" name="forgotForm"
              onSubmit={handleForgot}
              action="/forgot"
              method="POST"
              className="mainForm"
        >
            <section id="inner">
            <label htmlFor="email">Email: </label>
            <input id="email" type="text" name="email" placeholder="email"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Send" onclick="sendEmail()" />
            </section>
        </form>
    );
};

//Signup Window HTML
const SignupWindow = (props) =>{
    return (
        <form id="signupForm" 
              name="signupForm"
              onSubmit={handleSignup}
              action="/signup"
              method="POST"
              className="mainForm"
        >
            <label htmlFor="email">Email: </label>
            <input id="email" type="text" name="email" placeholder="email"/>
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

//Profile Render
const ProfileWindow = (props) =>{
    return(
    <h1 id="profile">Future Profile Page Coming Soon</h1>
    );
};

//Login Render
const createLoginWindow = (csrf) =>{
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//Forgot Render
const createForgotWindow = (csrf) =>{
    ReactDOM.render(
        <ForgotWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//Signup Render
const createSignupWindow = (csrf) =>{
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//Profile Create
const createProfileWindow = (csrf) =>{
    ReactDOM.render(
        <ProfileWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) =>{
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const forgotButton = document.querySelector("#forgot");

    signupButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    forgotButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createForgotWindow(csrf);
        return false;
    });

    createLoginWindow(csrf); //default view
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});