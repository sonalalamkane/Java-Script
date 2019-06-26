function validation()
{
    var fname=document.getElementById("fname").value;
    var lname=document.getElementById("lname").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var address =document.getElementById("address").value; 
 
    var alphaExp = /^[a-zA-Z]+/;
    
    if (fname == "")                                  
    { 
        alert("Please enter your first name.");    
        return false; 
    }
    else
    {
        if(fname.match(alphaExp))
        {
            return true;
        }   
    
    }  
    if (lname=="")                                  
    { 
        alert("Please enter your last name."); 
        return false; 
    } 
    else
    {
        if(lname.match(alphaExp))
        {
            return true;
        }    
    }  
    
    
}