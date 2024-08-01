$(document).ready(function() {
    appendEmployee();
    $('body').on('click','.delete' ,deleteUser);
    $('body').on('click','.edit',editUser);
    $('#adduser').click(function(){
        window.location.replace("../form.html");
    });
});

//add employee
function appendEmployee() {
    
    $.ajax({
        url: "http://localhost:3000/employees",
        type: "GET",
        success: function(data) {
            const tbody = $('tbody');
            for(let d = 0; d < data.length; d++){
                const tr = $('<tr>',{id:data[d].id});
                const img = $('<img>',{src:data[d].profilePic});
                const td1 = $('<td>').append(img);
                const td2 = $('<td>',{text:data[d].name});
                const td3 = $('<td>',{text:data[d].gender});
                const td4 = $('<td>')
                for(dept of data[d].department){
                    td4.append(`<span style="padding: 3px">${dept}</span>`);
                }
                const td5 = $('<td>',{text:data[d].salary});
                const td6 = $('<td>',{text:data[d].startDate});
                const td7 =
                  '<td><span style="background-color: rgb(255, 255, 255)"><svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#658292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></span><span style="background-color: rgb(255, 255, 255)"><svg class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#658292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></span></td>';
                tr.append(td1,td2,td3,td4,td5,td6,td7);
                tbody.append(tr);
            }
            
            
        },error(err){
            console.log(err);
        }
    });

}
function deleteUser(){
    const tr = $(this).closest('tr');
    const id = tr.attr('id');
    deleteEmployee(id);
}
//delete employee
function deleteEmployee(id) {
    $.ajax({
        url: "http://localhost:3000/employees/" + id,
        type: "DELETE",
        success: function(data) {
            console.log(data);
        },error(err){
            console.log(err);
        }
    });
}
function editUser(){
    const tr = $(this).closest('tr');
    const id = tr.attr('id');
    
    $.ajax({
        url: "http://localhost:3000/employees/" + id,
        type: "GET",
        success: function(data) {
    
            localStorage.setItem("data",JSON.stringify(data));
            console.log("Something")
            window.location.replace("../form.html");
         
        },error(err){
            console.log(err);
        }
    });
    
    
            
    
}