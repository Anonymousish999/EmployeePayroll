$(document).ready(function() {
  $('#custom-id').click(function () {
    console.log("custom class");
    getEmployeeData();
  });
});

function getEmployeeData() {
  console.log("Get Employee");
  $.ajax({
    url: "http://localhost:3000/employees",
    type: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.log(error);
    }
  });
}