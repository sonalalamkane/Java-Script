function validation()                                 //Registration Validation
{
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value; 
    let password=document.getElementById("password").value;
    let address =document.getElementById("address").value; 
    let gen=document.querySelector('input[name="gender_selection"]:checked').value; 

    let alphabetsRE= /^[^a-zA-Z]+$/;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let ereg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(fname.match(alphabetsRE) && lname.match(alphabetsRE))                                         //fname,lname validation.
    {
        window.confirm("Please enter correct first name and last name."); 
        window.open("../HTML/register.html","_self");     
    }
    else
    {
        if(strongRegex.test(password)==false)                                                              //password validation.
        {  
            window.confirm("Please enter correct password"); 
            window.open("../HTML/register.html","_self");  
        }
        else
        {
            if (ereg.test(email) == false) 
            {
                window.confirm("Please enter correct email address.");
                window.open("../HTML/register.html","_blank"); 
            } 
            else
            {
                window.confirm("Registration Successful");
                localstorage_registration();
            }
        }
    }    
}

function localstorage_registration()                           //Registration local storage
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

function loginValidation()                                      //Login page
{
    loginEmail=document.getElementById("lEmail").value;
    loginPass=document.getElementById("lPassword").value;

    let ereg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (ereg.test(loginEmail) == true) 
    {
        let getLoginData=JSON.parse(localStorage.getItem("user_details"));
        for(let i=0;i<getLoginData.length;i++)
        {
            if(loginEmail==getLoginData[i].emailId && loginPass==getLoginData[i].pass)
            {
                sessionStorage.setItem("sessionId",i);                        //session
                window.open("../HTML/todo.html","_blank");
                break;
            }
        }
    } 
    else
    {
        window.confirm("Invalid Email or Password...");
        window.open("../HTML/login.html","_blank"); 
    }    
}
function onLoadData()                                           //when page load display todo list
{
    let getId=sessionStorage.sessionId;
    let mainTodo = JSON.parse(localStorage.getItem("user_details"));
    
    let get_inner_array=mainTodo[getId].todo_list;

    Display(get_inner_array);
}
function AddTodo()                                              //Add Todo
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

    TodoItem[lSession].todo_list.push(addObj);
    todo_add_data=JSON.stringify(TodoItem);
    localStorage.setItem("user_details",todo_add_data);
        
    let get_inner_array=TodoItem[lSession].todo_list;

    for(let i=0;i<get_inner_array.length;i++)
    {
        var tr=document.createElement("tr");

        rData="<tr><td><input type=checkbox name=delete id=checkDelete"+i+"></input>+</td><td>"+get_inner_array[i].todoDesc+"</td><td>"+get_inner_array[i].cat+"</td><td>"+get_inner_array[i].dDate+"</td><td>"+get_inner_array[i].rdate+"</td><td>"+get_inner_array[i].ispublic+"</td></tr>";

        tr.innerHTML=rData;
        let tdata=document.getElementById("bodytable");
        tdata.appendChild(tr);
    }
    onLoadData();
}  
function DeleteTodo()                                       //Delete Todo
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let checkedIndex=document.getElementsByName("delete");
    let get_inner_array=getUserData[getId].todo_list;
    let flag=0;

    for(var i=(get_inner_array.length-1);i>=0;i--)
    {
        if(checkedIndex[i].checked === true)
        {
            let msg=confirm("Do you want to Delete ?");
            if(msg==true)
            {
                get_inner_array.splice(i,1);
            }
            else
            {
                location.reload();
            }
        }
    }

    var todolist=JSON.stringify(getUserData);
    localStorage.setItem("user_details",todolist);
    onLoadData();
}
function EditTodo()                                                 //Edit Todo
{
    let getId=sessionStorage.sessionId;

    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_todo_array=getUserData[getId].todo_list;
    let flag=0;
    let checkedBox= document.getElementsByName("delete");

    for(var i=(get_todo_array.length-1);i>=0;i--)
    {
        if(checkedBox[i].checked === true)
        {
            sessionStorage.setItem("index_todo",i);
            document.getElementById("todoDesc").value=get_todo_array[i].todoDesc;
            document.getElementById("todoCat").value=get_todo_array[i].cat;
            document.getElementById("todoDueDate").value=get_todo_array[i].dDate;
            document.getElementById("todoRemainder").value=get_todo_array[i].rdate;
            
            if(get_todo_array[i].ispublic == "Yes")
            {
                document.getElementsByName("public_selection")[0].checked=true;
            }
            else if(get_todo_array[i].ispublic == "No")
            {
                document.getElementsByName("public_selection")[1].checked=true;
            }
            flag++;
        }
    }
    if(flag>1)
    {
        let msg=confirm("Please select only one checkbox.");
        if(msg== true || msg==false)
        {
            location.reload();
        }
    }
}
function SaveTodo()                                                   //Save Todo
{
    let getId = sessionStorage.sessionId;
    let getIndex=sessionStorage.index_todo;

    let todoDesc = document.getElementById("todoDesc").value;
    let category = document.getElementById("todoCat").value;
    let dueDate = document.getElementById("todoDueDate").value;
    let remainder = document.getElementById("todoRemainder").value;
    let isPublic = document.querySelector('input[name="public_selection"]:checked').value; 

    let getUserData = JSON.parse(localStorage.getItem("user_details"));
    let get_todo_array=getUserData[getId].todo_list;

    get_todo_array[getIndex].todoDesc=todoDesc;
    get_todo_array[getIndex].cat=category;
    get_todo_array[getIndex].dDate=dueDate;
    get_todo_array[getIndex].rdate=remainder;
    get_todo_array[getIndex].ispublic=isPublic;

    string_data=JSON.stringify(getUserData);
    localStorage.setItem("user_details",string_data);
}
function filter()                                                     //Filter Todo's
{
    let getId=sessionStorage.sessionId;
    let getCatagory=document.getElementById("category").value;

    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_todo_array=getUserData[getId].todo_list;

    let cat=[];
    for(let i=0;i<get_todo_array.length;i++)
    {
        if(getCatagory == get_todo_array[i].cat)
        {
            cat.push(get_todo_array[i]);
        }   
    }
    Display(cat);
}
function Search()                                              //Search Todo's
{
    let getSearch=document.getElementById("search_text").value;
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_todo_array=getUserData[getId].todo_list;

    let searchResult=[];

    for(let i=0;i<get_todo_array.length;i++)
    {
        if(getSearch == get_todo_array[i].todoDesc)
        {
            searchResult.push(get_todo_array[i]);
        }
    }
    Display(searchResult);
}   
function Display(arr)                                          //Display data in table
{
    if(arr.length === 0)
    {
        let s=document.createElement("tr");
        var node = document.createTextNode("no todos");
        s.appendChild(node);
        let data=document.getElementById("output");
        data.appendChild(s);
    }
    else
    {
        let table_body=document.getElementById("bodytable");
        let deleterow=table_body.lastElementChild;
        while(deleterow)
        {
            table_body.removeChild(deleterow);
            deleterow=table_body.lastElementChild;
        }
 
        for(let i=0;i<arr.length;i++)
        {
            var tr=document.createElement("tr");
            
            rData="<tr><td><input type=checkbox name=delete id=checkDelete"+i+"></input></td><td>"+arr[i].todoDesc+"</td><td>"+arr[i].cat+"</td><td>"+arr[i].dDate+"</td><td>"+arr[i].rdate+"</td><td>"+arr[i].ispublic+"</td></tr>";

            tr.innerHTML=rData;
            let data=document.getElementById("bodytable");
            data.appendChild(tr);
        }
    }
}

function logout()                                  //session clear
{
    sessionStorage.clear();
    window.open("../HTML/login.html","_self");
}
//<button onclick="deleteTodo();">Delete</button>