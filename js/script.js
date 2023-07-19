

var emptyRow = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
var totalAmount = 0;

$(document).ready(function () {
  $("#tblData tbody").append(emptyRow); // adding empty row on page load

  $("#btnAdd").click(function () {
    var expenseName = $("#expence").val().trim();
    var amount = $("#amount").val().trim(); // removes the empty space

    if (expenseName !== "" && amount !== "") { // validate not empty
      if ($("#tblData tbody").children().children().length === 1) {
        $("#tblData tbody").html("");
      }

      var expenseNumber = $("#tblData tbody").children().length + 1; //row enumaration

      // creating dynamic html string
      var createRow = "<tr><td>"+expenseNumber+"</td><td>" + expenseName + "</td><td data-amount='" + amount + "'>" + amount + "</td><td> <button class='delete-btn' > delete </button> </td></tr>";

      $("#tblData tbody").append(createRow); // appending dynamic string to table tbody
      $("#expence").val("");
      $("#amount").val("");

      totalAmount += parseFloat(amount);
      $("#totalAmount").text(totalAmount);

      $("#tblData").on('click', '.delete-btn', function () {
        var row = $(this).closest('tr');
        var rowAmount = parseFloat(row.find('td[data-amount]').data('amount'));
        totalAmount -= rowAmount;
        $("#totalAmount").text(totalAmount);
        row.remove();

        // Recalculate totalAmount after deleting the row
        recalculateTotalAmount();
      });
    } else {
      alert("Please provide values");
    }
  });
});

function recalculateTotalAmount() {
  var rows = $("#tblData tbody").find('tr');
  var newTotalAmount = 0;

  rows.each(function () {
    var rowAmount = parseFloat($(this).find('td[data-amount]').data('amount'));
    newTotalAmount += rowAmount;
  });

  totalAmount = newTotalAmount;
  $("#totalAmount").text(totalAmount);
}
