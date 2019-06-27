function validation()
{
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value; 
    let password=document.getElementById("password").value;
    let address =document.getElementById("address").value; 
    let gen=document.querySelector('input[name="gender_selection"]:checked').value; 

    let alphabetsRE= /^[^a-zA-Z]+$/;
    let passwordRE=/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
    let ereg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
     
    let geteEmail=JSON.parse(localStorage.getItem("user_details"));
    for(let i=0;i<geteEmail.length;i++)
    {
        if(email==geteEmail[0].emailId)
        {
            window.confirm("Email address already exist.");    
            break;
        }
    }
 
    if(fname.match(alphabetsRE) && lname.match(alphabetsRE))                              //fname,lname validation.
    {
        window.confirm("Please enter correct first name and last name.");    
    }  

 /*    if (ereg.test(email.value) == false) 
    {
        window.confirm("Please enter correct email address.");
    } */
 
    if(password.length<6)                                                              //password validation.
    {  
        window.confirm("Please enter correct password.");  
    }   

    localstorage_registration(fname,lname,email,password,address,gen);
}

function localstorage_registration(fname,lname,email,password,address,gen)
{
    let userobj= new Object();

    userobj={firstName:fname,lastName:lname,emailId:email,pass:password,addr:address,genderr:gen};
    
    let arrayOfUser= JSON.parse(localStorage.getItem("user_details"));

    if(arrayOfUser === null)
    {
        arrayOfUser=[];
    }
    
    arrayOfUser.push(userobj);
    string_data=JSON.stringify(arrayOfUser);
    localStorage.setItem("user_details",string_data);

    let loginPage = window.open("../HTML/login.html","_blank");
}