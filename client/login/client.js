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
            <a href=""><h3>Forgot Password</h3></a>
            </section>
        </form>
    );
};

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

const ProfileWindow = (props) =>{
    return(
    <h1 id="profile">Future Profile Page Coming Soon</h1>
    );
};

const createLoginWindow = (csrf) =>{
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) =>{
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createProfileWindow = (csrf) =>{
    ReactDOM.render(
        <ProfileWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) =>{
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

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