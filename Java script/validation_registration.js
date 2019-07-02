function validation()                                          //Registration Validation
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
        window.location.assign("../HTML/register.html");     
    }
    else
    {
        if(strongRegex.test(password)==false)                                                              //password validation.
        {  
            window.confirm("Please enter correct password"); 
            window.location.assign("../HTML/register.html");  
        }
        else
        {
            if (ereg.test(email) == false) 
            {
                window.confirm("Please enter correct email address.");
                window.location.assign("../HTML/register.html"); 
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
    let pp = sessionStorage.profile_image;

    userobj={"firstName" : fname,
              "lastName" : lname,
              "emailId" : email,
              "pass" : password,
              "addr" : address,
              "genderr" : gen,
              "todo_list" : todo_add,
              "profile" : pp
            };
    
    let arrayOfUser= JSON.parse(localStorage.getItem("user_details"));

    if(arrayOfUser === null)
    {
        arrayOfUser=[];
        arrayOfUser.push(userobj);
        string_data=JSON.stringify(arrayOfUser);
        localStorage.setItem("user_details",string_data);

        window.location.assign("../HTML/login.html");
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
            window.location.assign("../HTML/register.html");
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
                window.location.assign("../HTML/todo.html");
                break;
            }
        }
    } 
    else
    {
        window.confirm("Invalid Email or Password...");
        window.location.assign("../HTML/login.html"); 
    }    
}

function loginRedirect()
{
    let getId=sessionStorage.sessionId;

    if(getId != null)
    {
        window.location.assign("../HTML/todo.html");
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
    addObj = {"id" : id,
              "todoDesc" : todoDesc,
              "cat":category,
              "dDate":dueDate,
              "rdate":remainder,
              "ispublic":isPublic,
              "status" : "Pending"
            };

    
    let TodoItem = JSON.parse(localStorage.getItem("user_details"));

    TodoItem[lSession].todo_list.push(addObj);
    todo_add_data=JSON.stringify(TodoItem);
    localStorage.setItem("user_details",todo_add_data);
        
    let get_inner_array=TodoItem[lSession].todo_list;

    for(let i=0;i<get_inner_array.length;i++)
    {
        var tr=document.createElement("tr");

        rData="<tr><td><input type=checkbox name=delete id=checkDelete"+i+"></input>+</td><td>"+get_inner_array[i].todoDesc+"</td><td>"+get_inner_array[i].cat+"</td><td>"+get_inner_array[i].dDate+"</td><td>"+get_inner_array[i].rdate+"</td><td>"+get_inner_array[i].ispublic+"</td><td>"+arr[i].status+"</td></tr>";

        tr.innerHTML=rData;
        let tdata=document.getElementById("bodytable");
        tdata.appendChild(tr);
    }
    onLoadData();
}  

function DeleteTodo()                                            //Delete Todo
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let checkedIndex=document.getElementsByName("delete");
    let get_inner_array=getUserData[getId].todo_list;

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

function SaveTodo()                                                  //Save Todo
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

function filter_category()                                           //Filter Todo's
{
    let getId=sessionStorage.sessionId;
    let getCatagory=document.getElementById("category").value;

    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let category_array=getUserData[getId].todo_list;

    if(getCatagory == "AllTodo")
    {
        onLoadData();
    }
    else if(getCatagory == "Office")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.cat === "Office")
            })

            Display(filter_todo);
    }
    else if(getCatagory == "Personal")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.cat === "Personal")
            })
            Display(filter_todo);
    } 
    else if(getCatagory == "Done")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.status === "Done")
            })
            Display(filter_todo);
    }
    else if(getCatagory == "Pending")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.status === "Pending")
            })
            Display(filter_todo);
    }
    else if(getCatagory == "Date")
    {
        document.getElementById("Date_filter").style.display = "block";
    }
}

function filte_date()
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let category_array=getUserData[getId].todo_list;

   // document.getElementById("dateFilter").style.display = "none";
    let filterDate = document.getElementById("dateFilter").value;

    var result = category_array.filter(function(number) {
        return ((number.dDate).toString() == (filterDate).toString())
      });

    Display(result);
}

function Search()                                                    //Search Todo's
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
    if(searchResult != 0)
    {
        Display(searchResult);
    }
    else
    {
        window.confirm("No result found.");
        onLoadData();
    }
}   

function Display(arr)                                                 //Display data in table
{
    if(arr.length === 0)
    {
        for(let i = document.getElementById("output").rows.length; i > 1;i--)
        {
            document.getElementById("output").deleteRow(i -1);
        }
   
        var tr=document.createElement("tr");
            
        rData="<tr>"+"no todos"+"</tr>";

        tr.innerHTML=rData;
        let data=document.getElementById("bodytable");
        data.appendChild(tr);
         
    }
    else
    {
        for(let i = document.getElementById("output").rows.length; i > 1;i--)
        {
            document.getElementById("output").deleteRow(i -1);
        }
 
        for(let i=0;i<arr.length;i++)
        {
            var tr=document.createElement("tr");
            
            rData="<tr><td><input type=checkbox name=delete id=checkDelete"+i+"></input></td><td>"+arr[i].todoDesc+"</td><td>"+arr[i].cat+"</td><td>"+arr[i].dDate+"</td><td>"+arr[i].rdate+"</td><td>"+arr[i].ispublic+"</td><td>"+arr[i].status+"</td></tr>";

            tr.innerHTML=rData;
            let data=document.getElementById("bodytable");
            data.appendChild(tr);
        }
    }
}

function profileView()                                                //View profile and disable fields
{
    let getId=sessionStorage.sessionId;
    let profile=sessionStorage.profile_image;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));

    document.getElementById("fname").value=getUserData[getId].firstName;
    document.getElementById("lname").value=getUserData[getId].lastName;
    document.getElementById("email").value=getUserData[getId].emailId;
    document.getElementById("address").value=getUserData[getId].addr;
    document.getElementById("pp").src=getUserData[getId].profile;

    if(getUserData[getId].genderr == "Male")
    {
        document.getElementsByName("gender_selection")[0].checked=true;
    }
    else if(getUserData[getId].genderr == "Female")
    {
        document.getElementsByName("gender_selection")[1].checked=true;
    }
    else if(getUserData[getId].genderr == "Other")
    {
        document.getElementsByName("gender_selection")[2].checked=true;
    }

    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("brows").disabled = true;

    for(let i = 0; i< document.getElementsByName("gender_selection").length; i++)
    {
        document.getElementsByName("gender_selection")[i].disabled = true;
    }
}

function EditProfile()                                                  //Enable fields and access values
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));

    document.getElementById("fname").value=getUserData[getId].firstName;
    document.getElementById("lname").value=getUserData[getId].lastName;
    document.getElementById("email").value=getUserData[getId].emailId;
    document.getElementById("address").value=getUserData[getId].addr;
    document.getElementById("pp").value=getUserData[getId].profile;

    if(getUserData[getId].genderr == "Male")
    {
        document.getElementsByName("gender_selection")[0].checked=true;
    }
    else if(getUserData[getId].genderr == "Female")
    {
        document.getElementsByName("gender_selection")[1].checked=true;
    }
    else if(getUserData[getId].genderr == "Other")
    {
        document.getElementsByName("gender_selection")[2].checked=true;
    }

    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("brows").disabled = false;

    for(let i = 0; i< document.getElementsByName("gender_selection").length; i++)
    {
        document.getElementsByName("gender_selection")[i].disabled = false;
    }
}

function SaveProfile()
{
    let getId=sessionStorage.sessionId;
    let profile_pic=sessionStorage.profile_image;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));

    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value; 
    let address =document.getElementById("address").value; 
    let gen=document.querySelector('input[name="gender_selection"]:checked').value; 

    getUserData[getId].firstName = fname;
    getUserData[getId].lastName = lname;
    getUserData[getId].emailId = email;
    getUserData[getId].addr = address;
    getUserData[getId].genderr = gen;
    getUserData[getId].profile= profile_pic;

    string_data=JSON.stringify(getUserData);
    localStorage.setItem("user_details",string_data);
    profileView();
}

function Done_status()
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_todo_array=getUserData[getId].todo_list;
    let checkedBox= document.getElementsByName("delete");

    for(var i=(get_todo_array.length-1);i>=0;i--)
    {
        if(checkedBox[i].checked === true)
        {
            get_todo_array[i].status = "Done";
        }
    }
    let msg = confirm("Record status changed to Done.")
    if(msg == true)
    {
        string_data=JSON.stringify(getUserData);
        localStorage.setItem("user_details",string_data);
        onLoadData();
    }
    else
    {
        onLoadData();
    }
}  

function logout()                                                      //session clear
{
    sessionStorage.clear();
    window.open("../HTML/login.html","_self");
}

function profile_image()
{
    let profile = document.getElementById("brows").files[0];

    getimgbase64(profile);

    function getimgbase64(profile)
    {
        let read_img = new FileReader();
        read_img.readAsDataURL(profile);

        read_img.onload = function () {
            let profile_url = read_img.result;
            sessionStorage.setItem("profile_image",profile_url);
            document.getElementById("pp").src = sessionStorage.profile_image;
        };

        read_img.onerror = function (error) {
        };
    }
}



