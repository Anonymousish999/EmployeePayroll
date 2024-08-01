$(document).ready(function () {
  // Dropdown menu for day, month, year and salary
  for (let i = 1; i <= 31; i++) {
    $("#day-dropdown").append(
      `<li class="dropdown-item" value="${i}">${i}</li>`
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months.forEach((month) => {
    $("#month-dropdown").append(
      `<li class="dropdown-item" value="${month}">${month}</li>`
    );
  });

  let selectedDay, selectedMonth, selectedYear, selectedSalary;

  // Event listener for day dropdown
  $("#day-dropdown").on("click", ".dropdown-item", function () {
    selectedDay = $(this).text();
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-text")
      .text(selectedDay);
  });

  // Event listener for month dropdown
  $("#month-dropdown").on("click", ".dropdown-item", function () {
    selectedMonth = $(this).text();
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-text")
      .text(selectedMonth);
  });

  // Event listener for year dropdown
  $("#year-dropdown").on("click", ".dropdown-item", function () {
    selectedYear = $(this).text();
    $(this)
      .closest(".btn-group")
      .find(".dropdown-toggle .dropdown-text")
      .text(selectedYear);
  });

  // Event listener for salary dropdown
  $("#salary").on("click", ".dropdown-item", function () {
    selectedSalary = $(this).text();
    $(this)
      .closest(".dropdown")
      .find(".dropdown-toggle .dropdown-text")
      .text(selectedSalary);
  });

  $("form").submit(function (e) {
    e.preventDefault();
    var name = $("#name").val();
    if (name == "") {
      $("#name").after(
        '<div id="name-error" style="color: red; font-size: 10px">Please fill name</div>'
      );
      return;
    }
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
