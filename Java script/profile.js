function profileView() {
    let getId = sessionStorage.sessionId;
    let getUserData = JSON.parse(localStorage.getItem("user_details"));

    document.getElementById("fname").value = getUserData[getId].firstName;
    document.getElementById("lname").value = getUserData[getId].lastName;
    document.getElementById("email").value = getUserData[getId].emailId;
    document.getElementById("address").value = getUserData[getId].addr;
    document.getElementById("pp").src = getUserData[getId].profile ? getUserData[getId].profile : '../Images/profile.png';

    if (getUserData[getId].genderr == "Male") {
        document.getElementsByName("gender_selection")[0].checked = true;
    } else if (getUserData[getId].genderr == "Female") {
        document.getElementsByName("gender_selection")[1].checked = true;
    } else if (getUserData[getId].genderr == "Other") {
        document.getElementsByName("gender_selection")[2].checked = true;
    }

    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("brows").disabled = true;

    for (let i = 0; i < document.getElementsByName("gender_selection").length; i++) {
        document.getElementsByName("gender_selection")[i].disabled = true;
    }
}

function EditProfile() {
    let getId = sessionStorage.sessionId;
    let getUserData = JSON.parse(localStorage.getItem("user_details"));

    document.getElementById("fname").value = getUserData[getId].firstName;
    document.getElementById("lname").value = getUserData[getId].lastName;
    document.getElementById("email").value = getUserData[getId].emailId;
    document.getElementById("address").value = getUserData[getId].addr;
    document.getElementById("pp").value = getUserData[getId].profile;

    if (getUserData[getId].genderr == "Male") {
        document.getElementsByName("gender_selection")[0].checked = true;
    } else if (getUserData[getId].genderr == "Female") {
        document.getElementsByName("gender_selection")[1].checked = true;
    } else if (getUserData[getId].genderr == "Other") {
        document.getElementsByName("gender_selection")[2].checked = true;
    }

    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("brows").disabled = false;

    for (let i = 0; i < document.getElementsByName("gender_selection").length; i++) {
        document.getElementsByName("gender_selection")[i].disabled = false;
    }
}

function SaveProfile() {
    let getId = sessionStorage.sessionId;
    let profilePic = sessionStorage.profile_image;
    let getUserData = JSON.parse(localStorage.getItem("user_details"));

    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let gen = document.querySelector('input[name="gender_selection"]:checked').value;

    getUserData[getId].firstName = firstName;
    getUserData[getId].lastName = lastName;
    getUserData[getId].emailId = email;
    getUserData[getId].addr = address;
    getUserData[getId].genderr = gen;
    getUserData[getId].profile = profilePic;


    stringData = JSON.stringify(getUserData);
    localStorage.setItem("user_details", stringData);
    profileView();
}

function profile_image() {
    let profile = document.getElementById("brows").files[0];

    getimgbase64(profile);

    function getimgbase64(profile) {
        let readImg = new FileReader();
        readImg.readAsDataURL(profile);

        readImg.onload = function () {
            let profile_url = readImg.result;
            sessionStorage.setItem("profile_image", profile_url);
            document.getElementById("pp").src = sessionStorage.profile_image;
        };

        read_img.onerror = function (error) { };
    }
}
function logout() {
    sessionStorage.clear();
    window.open("../HTML/login.html", "_self");
}