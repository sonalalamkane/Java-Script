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

    if(fname.match(alphabetsRE) && lname.match(alphabetsRE))                              //fname,lname validation.
    {
        window.confirm("Please enter correct first name and last name."); 
        window.open("../HTML/register.html","_self");     
    }

    if(password.length<6)                                                              //password validation.
    {  
        window.confirm("Password length is below 6."); 
        window.open("../HTML/register.html","_self");  
    }

     /* if (ereg.test(email.value) == false) 
    {
        window.confirm("Please enter correct email address.");
    } */
 
    localstorage_registration();
}

function localstorage_registration()
{
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value; 
    let password=document.getElementById("password").value;
    let address =document.getElementById("address").value; 
    let gen=document.querySelector('input[name="gender_selection"]:checked').value; 

    let userobj= new Object();
    let todo_add=[];

    userobj={"firstName" : fname,"lastName" : lname,"emailId" : email,"pass" : password,"addr" : address,"genderr" : gen,"todo_list" : todo_add};
    
    let arrayOfUser= JSON.parse(localStorage.getItem("user_details"));

    if(arrayOfUser === null)
    {
        arrayOfUser=[];
        arrayOfUser.push(userobj);
        string_data=JSON.stringify(arrayOfUser);
        localStorage.setItem("user_details",string_data);

        window.open("../HTML/login.html","_blank");
    }
    else
    {
        let index=0;

        //search for existing email id
        for(index=0;index<arrayOfUser.length;index++)
        {
            if(email==arrayOfUser[index].emailId)   // email id found then break
            {
                break;
            }
        }

        if(index == arrayOfUser.length) // email address not found 
        {
            arrayOfUser.push(userobj);
            string_data=JSON.stringify(arrayOfUser);
            localStorage.setItem("user_details",string_data);
        }
        else    //user is exists
        {
            window.confirm("Email address already exist.");
            window.open("../HTML/register.html","_self");
        }
    }    
}

function loginValidation()
{
    loginEmail=document.getElementById("lEmail").value;
    loginPass=document.getElementById("lPassword").value;

    let getLoginData=JSON.parse(localStorage.getItem("user_details"));
    for(let i=0;i<getLoginData.length;i++)
    {
        if(loginEmail==getLoginData[i].emailId && loginPass==getLoginData[i].pass)
        {
            sessionStorage.setItem("sessionId",i);                        //session
            window.open("../HTML/todo.html","_self");
            break;
        }
        else
        {
            window.confirm("Invalid Email or Password...");
            break;
        }
    }
}
function AddButton()
{
    window.open("../HTML/todoAdd.html","_blank");
}
function AddTodo()
{
    let lSession = sessionStorage.sessionId;
    let todoDesc = document.getElementById("todoDesc").value;
    let category = document.getElementById("todoCat").value;
    let dueDate = document.getElementById("todoDueDate").value;
    let remainder = document.getElementById("todoRemainder").value;
    let isPublic = document.querySelector('input[name="public_selection"]:checked').value; 

    let addObj = new Object();
    addObj = {"todoDesc" : todoDesc,"cat":category,"dDate":dueDate,"rdate":remainder,"ispublic":isPublic};

    let TodoItem = JSON.parse(localStorage.getItem("user_details"));
 

            TodoItem[index].todo_list.push(addObj);
            todo_add_data=JSON.stringify(TodoItem);
            localStorage.setItem("user_details",todo_add_data);
        
    let access=TodoItem[lSession].todo_list;

    for(let i=0;i<get_inner_array.length;i++)
    {
        var row=document.createElement("tr");
            
        rData="<tr><td>"+get_inner_array[i].todoDesc+"</td><td>"+get_inner_array[i].cat+"</td><td>"+get_inner_array[i].dDate+"</td><td>"+get_inner_array[i].rdate+"</td><td>"+get_inner_array[i].ispublic+"</td></tr>";

        row.innerHTML=rData;
        let tdata=document.getElementById("bodytable");
        tdata.appendChild(row);
    }
}  
function onLoadData()
{
    let getId=sessionStorage.sessionId;
    let mainTodo = JSON.parse(localStorage.getItem("user_details"));

    let get_inner_array=mainTodo[getId].todo_list;

    if(get_inner_array.length === 0)
    {
        let s=document.createElement("tr");
        var node = document.createTextNode("no todos");
        s.appendChild(node);
        let data=document.getElementById("output");
        data.appendChild(s);
    }
    else
    {
        for(let i=0;i<get_inner_array.length;i++)
        {
            var li=document.createElement("tr");
            
            s="<tr><td>"+get_inner_array[i].todoDesc+"</td><td>"+get_inner_array[i].cat+"</td><td>"+get_inner_array[i].dDate+"</td><td>"+get_inner_array[i].rdate+"</td><td>"+get_inner_array[i].ispublic+"</td></tr>";
            li.innerHTML=s;
            let data=document.getElementById("bodytable");
            data.appendChild(li);
        }
    }

}
function logout()
{
    sessionStorage.clear();
    window.open("../HTML/login.html","_self");
}
