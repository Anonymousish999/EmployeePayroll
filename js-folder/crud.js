
function createEmployee() {
    // Code to create employee
    $('form').on("submit", function() {
        var employeeData = {
          name: $("#name").val(),
          profilePic: $("input[name='profileImage']:checked").val,
          gender: $("input[name='gender']:checked").val(),
          department: $("input[type=checkbox]:checked")
            .map(() => $(this.val))
            .get(),
          salary: $("#salary").val(),
          startDate: $("#startDate").val(),
          note: $("#note").val(),
        };
        $.ajax({
            url: "http://localhost:3000/employees",
            type: "POST",
            data: employeeData,
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            },
        });
    });
}

function updateEmployee() {
    // Code to update employee
    

}