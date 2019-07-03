function validation()                                          //Registration Validation
{
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let email=document.getElementById("email").value; 
    let password=document.getElementById("password").value;
    
    let alphabetsRE= /^[a-zA-Z]+$/;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let ereg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(fname.match(alphabetsRE) && lname.match(alphabetsRE))                                         //fname,lname validation.
    {
        if (ereg.test(email) == true)                                                            //password validation.
        {  
            if(strongRegex.test(password)==true)  
            {
                window.confirm("Registration Successful");
                window.location = "../HTML/login.html";
                localstorage_registration();
            } 
            else
            {
                window.confirm("Please enter correct password"); 
                window.location ="../HTML/register.html"; 
            }
        }
        else
        {
            window.confirm("Please enter correct email address.");
            window.location = "../HTML/register.html";  
        }
    }
    else
    {
        window.confirm("Please enter correct first name and last name."); 
        window.location = "../HTML/register.html";     
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

        window.location = "../HTML/login.html";
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
            window.location = "../HTML/register.html";
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
                window.location = "../HTML/todo.html";
                break;
            }
        }
    } 
    else
    {
        window.confirm("Invalid Email or Password...");
        window.location = "../HTML/login.html"; 
    }    
}

function loginRedirect()
{
    let getId=sessionStorage.sessionId;

    if(getId != null)
    {
        window.location = "../HTML/todo.html";
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
    let sDate = startDate();
    let todoDesc = document.getElementById("todoDesc").value;
    let category = document.getElementById("todoCat").value;
    let dueDate = document.getElementById("todoDueDate").value;
    let remainder = document.getElementById("todoRemainder").value;
    let isPublic = document.querySelector('input[name="public_selection"]:checked').value; 
       
    var id=makeid(6);
    function makeid(length) 
    {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < length; i++ )
        {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

    let addObj = new Object();
    addObj = {"id" : id,
              "todoDesc" : todoDesc,
              "cat" : category,
              "sDate" : sDate,
              "dDate" : dueDate,
              "rdate" : remainder,
              "ispublic" : isPublic,
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

        rData="<tr><td><input type=checkbox name=delete id=checkbox-"+get_inner_array[i].id+"></input>+</td><td>"+get_inner_array[i].todoDesc+"</td><td>"+get_inner_array[i].cat+"</td><td>"+get_inner_array[i].sDate+"</td><td>"+get_inner_array[i].dDate+"</td><td>"+get_inner_array[i].rdate+"</td><td>"+get_inner_array[i].ispublic+"</td><td>"+get_inner_array[i].status+"</td></tr>";

        tr.innerHTML=rData;
        let tdata=document.getElementById("bodytable");
        tdata.appendChild(tr);
    }
    
    onLoadData();
}  

function startDate()
{
    var today = new Date();
    
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
} 

function DeleteTodo()                                            //Delete Todo
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_inner_array=getUserData[getId].todo_list;

    let arr=checkedBoxes();

    for(var i=0;i<arr.length;i++)
    {
        for(let j=0;j<get_inner_array.length;j++)
        {
            if(get_inner_array[j].id == arr[i])
            {
                get_inner_array.splice(j,1);
            }
        }
    }

    var todolist=JSON.stringify(getUserData);
    localStorage.setItem("user_details",todolist);
    onLoadData();
}

function checkedBoxes()
{
    let checkedIndex=document.getElementsByName("delete");

    let cbox=[];
    for(var i=0;i<checkedIndex.length;i++)
    {
        var todoSid=checkedIndex[i].id;
        var todoId = todoSid.split("-");

        if(document.getElementById("checkbox-"+todoId[1]).checked == true)
        {
            cbox.push(todoId[1]);
        }
    }
    return cbox;

}

function EditTodo()                                                 //Edit Todo
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let get_inner_array=getUserData[getId].todo_list;
    let checkedBox= checkedBoxes();

    if(checkedBox.length>1)
    {
        let msg=confirm("Please select only one checkbox.");
        if(msg== true || msg==false)
        {
            location.reload();
        }
    }
    else
    {
        for(let j=0;j<get_inner_array.length;j++)
        {
            if(get_inner_array[j].id == checkedBox)
            {
                sessionStorage.setItem("index_todo",checkedBox);
                document.getElementById("todoDesc").value=get_inner_array[j].todoDesc;
                document.getElementById("todoCat").value=get_inner_array[j].cat;
                document.getElementById("todoDueDate").value=get_inner_array[j].dDate;
                document.getElementById("todoRemainder").value=get_inner_array[j].rdate;
                    
                if(get_inner_array[j].ispublic == "Yes")
                {
                    document.getElementsByName("public_selection")[0].checked=true;
                }
                else if(get_inner_array[j].ispublic == "No")
                {
                    document.getElementsByName("public_selection")[1].checked=true;
                }
            }
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

    for(let i=0;i<get_todo_array.length;i++)
    {
        if(get_todo_array[i].id == getIndex)
        {
            get_todo_array[i].todoDesc=todoDesc;
            get_todo_array[i].cat=category;
            get_todo_array[i].dDate=dueDate;
            get_todo_array[i].rdate=remainder;
            get_todo_array[i].ispublic=isPublic;

            string_data=JSON.stringify(getUserData);
            localStorage.setItem("user_details",string_data);

            document.getElementById("myForm").reset();
            onLoadData();
        }
    }
    
}

function filter_category()                                           //Filter Todo's
{
    let getId=sessionStorage.sessionId;
    let getCatagory=document.getElementById("category").value;

    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let category_array=getUserData[getId].todo_list;

    if(getCatagory == "AllTodo")
    {
        document.getElementById("Date_filter").style.display = "none";
        onLoadData();
    }
    else if(getCatagory == "Office")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.cat === "Office")
            })

            document.getElementById("Date_filter").style.display = "none";
            Display(filter_todo);
    }
    else if(getCatagory == "Personal")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.cat === "Personal")
            })

            document.getElementById("Date_filter").style.display = "none";
            Display(filter_todo);
    } 
    else if(getCatagory == "Done")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.status === "Done")
            })

            document.getElementById("Date_filter").style.display = "none";
            Display(filter_todo);
    }
    else if(getCatagory == "Pending")
    {
        var filter_todo=category_array.filter(function(category_type){
            return(category_type.status === "Pending")
            })
            document.getElementById("Date_filter").style.display = "none";
            Display(filter_todo);
    }
    else if(getCatagory == "Date")
    {
        document.getElementById("Date_filter").style.display = "block";
    }
}

function filte_date()                                                //Date Filter
{
    let getId=sessionStorage.sessionId;
    let getUserData=JSON.parse(localStorage.getItem("user_details"));
    let tood_array=getUserData[getId].todo_list;

    let fromtDate = document.getElementById("fromDateFilter").value;
    let toDate = document.getElementById("toDateFilter").value;

    let fdate = Date.parse(fromtDate);
    let tdate = Date.parse(toDate);

    if((fdate) > (tdate))
    {
        window.alert("From date is greater than To date.");
    }

    var result = tood_array.filter(function(rangeFilter) {
        return ((Date.parse(rangeFilter.sDate)) >= fdate && (Date.parse(rangeFilter.sDate) <= tdate));
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
        document.getElementById("myForm").reset();
        Display(searchResult);
    }
    else
    {
        window.confirm("No result found.");
        document.getElementById("myForm").reset();
        onLoadData();
    }
}   

function Display(arr)                                                 //Display data in table
{
    if(arr.length == 0)
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
            
            rData="<tr><td><input type=checkbox name=delete id=checkbox-"+arr[i].id+"></input></td><td>"+arr[i].todoDesc+"</td><td>"+arr[i].cat+"</td><td>"+arr[i].sDate+"</td><td>"+arr[i].dDate+"</td><td>"+arr[i].rdate+"</td><td>"+arr[i].ispublic+"</td><td>"+arr[i].status+"</td></tr>";

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
    document.getElementById("pp").src=getUserData[getId].profile ? getUserData[getId].profile : '../Images/profile.png';

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
    
    let checkedBox=checkedBoxes();

    for(var i=0;i<checkedBox.length;i++)
    {
        for(let j=0;j<get_todo_array.length;j++)
        {
            if(get_todo_array[j].id == checkedBox[i])
            {
                get_todo_array[j].status = "Done";
            }
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

        read_img.onerror = function (error) {};
    }
}