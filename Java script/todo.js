function onLoadData()                                           //when page load display todo list
{
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));

    let getTodoArray = userArray[getId].todo_list;

    DisplayTodo(getTodoArray);
}

function AddTodo()                                              //Add Todo
{
    let lSession = sessionStorage.sessionId;
    let sDate = currentDate();
    let todoDesc = document.getElementById("todoDesc").value;
    let category = document.getElementById("todoCat").value;
    let dueDate = document.getElementById("todoDueDate").value;
    let remainder = document.getElementById("todoRemainder").value;
    let isPublic = document.querySelector('input[name="public_selection"]:checked').value;

    var id = makeid(6);
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }


    let addObj = {
        "id": id,
        "todoDesc": todoDesc,
        "cat": category,
        "sDate": sDate,
        "dDate": dueDate,
        "rdate": remainder,
        "ispublic": isPublic,
        "status": "Pending"
    };

    let userArray = JSON.parse(localStorage.getItem("user_details"));

    userArray[lSession].todo_list.push(addObj);
    addTodo = JSON.stringify(userArray);
    localStorage.setItem("user_details", addTodo);

    let todoArray = userArray[lSession].todo_list;

    for (let i = 0; i < todoArray.length; i++) {
        var tr = document.createElement("tr");

        rData = "<tr><td><input type=checkbox name=delete id=checkbox-" + todoArray[i].id + "></input>+</td><td>" + todoArray[i].todoDesc + "</td><td>" + todoArray[i].cat + "</td><td>" + todoArray[i].sDate + "</td><td>" + todoArray[i].dDate + "</td><td>" + todoArray[i].rdate + "</td><td>" + todoArray[i].ispublic + "</td><td>" + todoArray[i].status + "</td></tr>";

        tr.innerHTML = rData;
        let tdata = document.getElementById("bodytable");
        tdata.appendChild(tr);
    }

    onLoadData();
}

function currentDate() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function DeleteTodo()                                            //Delete Todo
{
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    let arr = checkedBoxes();

    let msg = confirm("Do you want to delete it ?")
    if (msg == false) {
        onLoadData();
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            for (let j = 0; j < todoArray.length; j++) {
                if (todoArray[j].id == arr[i]) {
                    todoArray.splice(j, 1);
                }
            }
        }
    }

    var todoList = JSON.stringify(userArray);
    localStorage.setItem("user_details", todoList);
    onLoadData();
}

function checkedBoxes() {
    let checkedIndex = document.getElementsByName("delete");

    let cbox = [];
    for (var i = 0; i < checkedIndex.length; i++) {
        var todoSid = checkedIndex[i].id;
        var todoId = todoSid.split("-");

        if (document.getElementById("checkbox-" + todoId[1]).checked == true) {
            cbox.push(todoId[1]);
        }
    }
    return cbox;

}

function EditTodo()                                                 //Edit Todo
{
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;
    let checkedBox = checkedBoxes();

    if (checkedBox.length > 1) {
        let msg = confirm("Please select only one checkbox.");
        if (msg == true || msg == false) {
            location.reload();
        }
    }
    else {
        for (let j = 0; j < todoArray.length; j++) {
            if (todoArray[j].id == checkedBox) {
                sessionStorage.setItem("index_todo", checkedBox);
                document.getElementById("todoDesc").value = todoArray[j].todoDesc;
                document.getElementById("todoCat").value = todoArray[j].cat;
                document.getElementById("todoDueDate").value = todoArray[j].dDate;
                document.getElementById("todoRemainder").value = todoArray[j].rdate;

                if (todoArray[j].ispublic == "Yes") {
                    document.getElementsByName("public_selection")[0].checked = true;
                }
                else if (todoArray[j].ispublic == "No") {
                    document.getElementsByName("public_selection")[1].checked = true;
                }
            }
        }
    }
}

function SaveTodo()                                                  //Save Todo
{
    let getId = sessionStorage.sessionId;
    let getIndex = sessionStorage.index_todo;

    let todoDesc = document.getElementById("todoDesc").value;
    let category = document.getElementById("todoCat").value;
    let dueDate = document.getElementById("todoDueDate").value;
    let remainder = document.getElementById("todoRemainder").value;
    let isPublic = document.querySelector('input[name="public_selection"]:checked').value;

    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    if (todoDesc == "" && (category == "Office" || category == "Personal") && dueDate == "" && remainder == "" && (isPublic == "Yes" || isPublic == "No")) {
        alert("Can't save todo because the fields are empty.");
    }
    else {
        for (let i = 0; i < todoArray.length; i++) {
            if (todoArray[i].id == getIndex) {
                todoArray[i].todoDesc = todoDesc;
                todoArray[i].cat = category;
                todoArray[i].dDate = dueDate;
                todoArray[i].rdate = remainder;
                todoArray[i].ispublic = isPublic;

                stringData = JSON.stringify(userArray);
                localStorage.setItem("user_details", stringData);

                document.getElementById("myForm").reset();
                onLoadData();
            }
        }
    }
}

function filterCategory()                                           //Filter Todo's
{
    let getId = sessionStorage.sessionId;
    let getCatagory = document.getElementById("category").value;

    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    if (getCatagory == "AllTodo") {
        document.getElementById("Date_filter").style.display = "none";
        onLoadData();
    }
    else if (getCatagory == "Office") {
        var filteredTodo = todoArray.filter(function (category_type) {
            return (category_type.cat === "Office")
        })

        document.getElementById("Date_filter").style.display = "none";
        DisplayTodo(filteredTodo);
    }
    else if (getCatagory == "Personal") {
        var filteredTodo = todoArray.filter(function (category_type) {
            return (category_type.cat === "Personal")
        })

        document.getElementById("Date_filter").style.display = "none";
        DisplayTodo(filteredTodo);
    }
    else if (getCatagory == "Done") {
        var filteredTodo = todoArray.filter(function (category_type) {
            return (category_type.status === "Done")
        })

        document.getElementById("Date_filter").style.display = "none";
        DisplayTodo(filteredTodo);
    }
    else if (getCatagory == "Pending") {
        var filteredTodo = todoArray.filter(function (category_type) {
            return (category_type.status === "Pending")
        })
        document.getElementById("Date_filter").style.display = "none";
        DisplayTodo(filteredTodo);
    }
    else if (getCatagory == "Date") {
        document.getElementById("Date_filter").style.display = "block";
    }
}

function dateFilter()                                                //Date Filter
{
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    let fromtDate = document.getElementById("fromDateFilter").value;
    let toDate = document.getElementById("toDateFilter").value;

    let fdate = Date.parse(fromtDate);
    let tdate = Date.parse(toDate);

    if ((fdate) > (tdate)) {
        window.alert("From date is greater than To date.");
    }

    var result = todoArray.filter(function (rangeFilter) {
        return ((Date.parse(rangeFilter.sDate)) >= fdate && (Date.parse(rangeFilter.sDate) <= tdate));
    });

    if (result == 0) {
        window.alert("no todo's found");
        document.getElementById("myForm").reset();
    }
    else {
        DisplayTodo(result);
    }
}

function searchTodo()                                                    //Search Todo's
{
    let getSearch = document.getElementById("search_text").value;
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    let searchResult = [];

    for (let i = 0; i < todoArray.length; i++) {
        if (getSearch == todoArray[i].todoDesc) {
            searchResult.push(todoArray[i]);
        }
    }
    if (searchResult != 0) {
        document.getElementById("myForm").reset();
        DisplayTodo(searchResult);
    }
    else {
        window.confirm("No result found.");
        document.getElementById("myForm").reset();
        onLoadData();
    }
}

function DisplayTodo(arr)                                                 //Display data in table
{
    if (arr.length == 0) {
        for (let i = document.getElementById("output").rows.length; i > 1; i--) {
            document.getElementById("output").deleteRow(i - 1);
        }

        var tr = document.createElement("tr");

        rData = "<tr>" + "no todos" + "</tr>";

        tr.innerHTML = rData;
        let data = document.getElementById("bodytable");
        data.appendChild(tr);
    }
    else {
        for (let i = document.getElementById("output").rows.length; i > 1; i--) {
            document.getElementById("output").deleteRow(i - 1);
        }

        for (let i = 0; i < arr.length; i++) {
            var tr = document.createElement("tr");

            rData = "<tr><td><input type=checkbox name=delete id=checkbox-" + arr[i].id + "></input></td><td>" + arr[i].todoDesc + "</td><td>" + arr[i].cat + "</td><td>" + arr[i].sDate + "</td><td>" + arr[i].dDate + "</td><td>" + arr[i].rdate + "</td><td>" + arr[i].ispublic + "</td><td>" + arr[i].status + "</td></tr>";

            tr.innerHTML = rData;
            let data = document.getElementById("bodytable");
            data.appendChild(tr);
        }
    }
}

function markAsDone() {
    let getId = sessionStorage.sessionId;
    let userArray = JSON.parse(localStorage.getItem("user_details"));
    let todoArray = userArray[getId].todo_list;

    let checkedBox = checkedBoxes();

    for (var i = 0; i < checkedBox.length; i++) {
        for (let j = 0; j < todoArray.length; j++) {
            if (todoArray[j].id == checkedBox[i]) {
                todoArray[j].status = "Done";
            }
        }
    }
    let msg = confirm("Record status changed to Done.")
    if (msg == true) {
        stringData = JSON.stringify(userArray);
        localStorage.setItem("user_details", stringData);
        onLoadData();
    }
    else {
        onLoadData();
    }
}
function logout()                                                      //session clear
{
    sessionStorage.clear();
    window.open("../HTML/login.html", "_self");
}