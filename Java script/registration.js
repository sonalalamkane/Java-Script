function validation() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let alphabetsRE = /^[a-zA-Z]+$/;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


    if (!(firstName.match(alphabetsRE))) {
        document.getElementById("fname").style.backgroundColor = "rgb(255,0,0,0.8)";
        document.getElementById("fname").value = "Invalid first name.";
        return false;
    } else {
        document.getElementById("fname").style.backgroundColor = "rgb(0,128,0,0.8)";
    }

    if (!(lastName.match(alphabetsRE))) {
        document.getElementById("lname").style.backgroundColor = "rgb(255,0,0,0.8)";
        document.getElementById("lname").value = "Invalid last name.";
        return false;
    } else {
        document.getElementById("lname").style.backgroundColor = "rgb(0,128,0,0.8)";
    }

    if (emailReg.test(email) == false) {
        document.getElementById("email").style.backgroundColor = "rgb(255,0,0,0.8)";
        document.getElementById("email").value = "Invalid email.";
        return false;
    } else {
        document.getElementById("email").style.backgroundColor = "rgb(0,128,0,0.8)";
    }

    if (strongRegex.test(password) == false) {
        document.getElementById("password").style.backgroundColor = "rgb(255,0,0,0.8)";
        document.getElementById("password").value = "Invalid password.";
        return false;
    } else {
        document.getElementById("password").style.backgroundColor = "rgb(0,128,0,0.8)";
    }

    useRegistration();
}

function clearHighlightedBox(idtext) {
    document.getElementById(idtext).style.backgroundColor = "white";
    document.getElementById(idtext).value = "";
}

function useRegistration() {

    let fName = document.getElementById("fname").value;
    let lName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let gen = document.querySelector('input[name="gender_selection"]:checked').value;

    let todo_add = [];
    let pp = sessionStorage.profile_image;

    let userobj = {
        "firstName": fName,
        "lastName": lName,
        "emailId": email,
        "pass": password,
        "addr": address,
        "genderr": gen,
        "todo_list": todo_add,
        "profile": pp
    };

    let arrayOfUser = JSON.parse(localStorage.getItem("user_details"));

    if (arrayOfUser === null) {
        arrayOfUser = [];
        arrayOfUser.push(userobj);
        string_data = JSON.stringify(arrayOfUser);
        localStorage.setItem("user_details", string_data);

        window.confirm("Registration Successful");
        window.location = "../HTML/login.html";
    } else {
        let index = 0;

        for (index = 0; index < arrayOfUser.length; index++) {
            if (email == arrayOfUser[index].emailId) {
                break;
            }
        }

        if (index == arrayOfUser.length) {
            arrayOfUser.push(userobj);
            string_data = JSON.stringify(arrayOfUser);
            localStorage.setItem("user_details", string_data);

            window.confirm("Registration Successful");
            window.location = "../HTML/login.html";
        } else {
            document.getElementById("email").style.backgroundColor = "rgb(255,0,0,0.8)";
            document.getElementById("email").value = "Email already exist.";
            return false;
        }
    }
}

function profile_image() {
    let profile = document.getElementById("brows").files[0];

    getimgbase64(profile);

    function getimgbase64(profile) {
        let read_img = new FileReader();
        read_img.readAsDataURL(profile);

        read_img.onload = function () {
            let profile_url = read_img.result;
            sessionStorage.setItem("profile_image", profile_url);
            document.getElementById("pp").src = sessionStorage.profile_image;
        };

        read_img.onerror = function (error) { };
    }
}