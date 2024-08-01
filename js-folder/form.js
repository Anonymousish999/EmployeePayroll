$(document).ready(function () {
  let selectedDay, selectedMonth, selectedYear, selectedSalary;
  if(localStorage.getItem('data')){
    data = JSON.parse(localStorage.getItem('data'));
    $('#name').val(data.name);
    $(`input[class='form-check-input'][value='${data.profilePic}']`).prop(
      "checked",
      true
    );
    $(`input[class='form-check-input'][value='${data.gender}']`).prop(
      "checked",
      true
    );
    const department = data.department;
    for(let i = 0; i < department.length; i++){
      $(`input[name="department"][value='${department[i]}']`).prop("checked",true);
    }
    selectedSalary = data.salary;
    $(".dropdown-text").text(data.salary); 
    const date = data.startDate.split(" ");
    console.log(date[0] + " " + date[1] + " " + date[2]);
    selectedDay = date[0];
    selectedMonth = date[1];
    selectedYear = date[2];
    $(".dropdown-day").text(date[0]);
    $(".dropdown-month").text(date[1]);
    $(".dropdown-year").text(date[2]);
    $("#note").val(data.note);

  }
  // Dropdown menu for day, month, year and salary
  for (let i = 1; i <= 31; i++) {
    $("#day-dropdown").append(
      `<li class="dropdown-item" value="${i}">${i}</li>`
    );
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  months.forEach((month) => {
    $("#month-dropdown").append(
      `<li class="dropdown-item" value="${month}">${month}</li>`
    );
  });

  

  // Event listener for day dropdown
  $("#day-dropdown").on("click", ".dropdown-item", function () {
    if(selectedDay != undefined){
      selectedDay = $(this).text();
    }else{
      selectedDay = $(this).text();
    }
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-day")
      .text(selectedDay);
  });

  // Event listener for month dropdown
  $("#month-dropdown").on("click", ".dropdown-item", function () {
    if(selectedMonth != undefined){
      selectedMonth = $(this).text();
    }else{
      selectedMonth = $(this).text();
    }
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-month")
      .text(selectedMonth);
  });

  // Event listener for year dropdown
  $("#year-dropdown").on("click", ".dropdown-item", function () {
    if(selectedYear != undefined){
      selectedYear = $(this).text();
    }else{
      selectedYear = $(this).text();
    }
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-year")
      .text(selectedYear);
  });

  // Event listener for salary dropdown
  $("#salary").on("click", ".dropdown-item", function () {
    if(selectedSalary != undefined){
      selectedSalary = $(this).text();
    }else {
      selectedSalary = $(this).text();
    }
    $(this)
      .closest(".dropdown")
      .find(".dropdown-toggle .dropdown-text")
      .text(selectedSalary);
  });

  $("form").submit(function (e) {
    e.preventDefault();
    var department = [];
    var profileImage;
    var gender;
    var x;
    x = $('input[name="department"]');
    for (const dep of x) {
      if (dep.checked) {
        department.push(dep.value);
      }
    }
    profileImage = $("input[name='profileImage']:checked").val();
    gender = $("input[name='gender']:checked").val();
    var startDate = `${selectedDay} ${selectedMonth} ${selectedYear}`;

    var employeeData = {
      id: Date.now(),
      name: $("#name").val(),
      profilePic: profileImage,
      gender: gender,
      department: department,
      salary: selectedSalary,
      startDate: startDate,
      note: $("#note").val(),
    };
    var obj = JSON.stringify(employeeData);
    console.log(employeeData);

    if(localStorage.getItem('data')){
      data = JSON.parse(localStorage.getItem('data'));
      $.ajax({
        url: "http://localhost:3000/employees/" + data.id,
        type: "PUT",
        data: obj,
        contentType: "application/json",
        success: function (data) {
          localStorage.removeItem('data');
          window.location.href = "index.html";
        },error(err){
          console.log(err);
        }
      });
    }else
    createEmployee(obj);
  });
});

function createEmployee(obj) {
  
  $.ajax({
    url: "http://localhost:3000/employees",
    type: "POST",
    data: obj,
    contentType: "application/json",
    success: function (data) {
      // console.log(data);
      window.location.href = "index.html";
    },error(err){
      console.log(err);
    }
  });
}

// function updateEmployee(id) {

//   let selectedDay, selectedMonth, selectedYear, selectedSalary;

//   // Event listener for day dropdown
//   $("#day-dropdown").on("click", ".dropdown-item", function () {
//     selectedDay = $(this).text();
//     $(this)
//       .closest(".btn-group")
//       .find(".dropdown-toggle .dropdown-text")
//       .text(selectedDay);
//   });

//   // Event listener for month dropdown
//   $("#month-dropdown").on("click", ".dropdown-item", function () {
//     selectedMonth = $(this).text();
//     $(this)
//       .closest(".btn-group")
//       .find(".dropdown-toggle .dropdown-text")
//       .text(selectedMonth);
//   });

//   // Event listener for year dropdown
//   $("#year-dropdown").on("click", ".dropdown-item", function () {
//     selectedYear = $(this).text();
//     $(this)
//       .closest(".btn-group")
//       .find(".dropdown-toggle .dropdown-text")
//       .text(selectedYear);
//   });

//   // Event listener for salary dropdown
//   $("#salary").on("click", ".dropdown-item", function () {
//     selectedSalary = $(this).text();
//     $(this)
//       .closest(".dropdown")
//       .find(".dropdown-toggle .dropdown-text")
//       .text(selectedSalary);
//   });

//   var department = [];
//   var profileImage;
//   var gender;
//   var x;
//   x = $('input[name="department"]');
//   for (const dep of x) {
//     if (dep.checked) {
//       department.push(dep.value);
//     }
//   }
//   profileImage = $("input[name='profileImage']:checked").val();
//   gender = $("input[name='gender']:checked").val();
//   var startDate = `${selectedDay} ${selectedMonth} ${selectedYear}`;

//   var employeeData = {
//     name: $("#name").val(),
//     profilePic: profileImage,
//     gender: gender,
//     department: department,
//     salary: selectedSalary,
//     startDate: startDate,
//     note: $("#note").val(),
//   };
//   var obj = JSON.stringify(employeeData);
  

//   $.ajax({
//     url: "http://localhost:3000/employees/" + id,
//     type: "PUT",
//     success: function (data) {
//       console.log(data);
//       window.location.href = "index.html";
//     },error(err){
//       console.log(err);
//     }
//   });

// }
