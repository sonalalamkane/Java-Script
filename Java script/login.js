function loginValidation()                                      //Login page
{
    loginEmail = document.getElementById("lEmail").value;
    loginPass = document.getElementById("lPassword").value;

    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (emailReg.test(loginEmail) == true) {
        let getLoginData = JSON.parse(localStorage.getItem("user_details"));
        for (let i = 0; i < getLoginData.length; i++) {
            if (loginEmail == getLoginData[i].emailId && loginPass == getLoginData[i].pass) {
                sessionStorage.setItem("sessionId", i);                        //session
                window.location = "../HTML/todo.html";
                break;
            }
            else {
                window.alert("Invalid Email or Password...");
                return false;
            }
        }
    }
    else {
        window.confirm("Invalid Email or Password...");
        return false;
    }
}

function loginRedirect() {
    let getId = sessionStorage.sessionId;

    if (getId != null) {
        window.location = "../HTML/todo.html";
    }
}