$(document).ready(function() {
  var form = $('#volunteerForm');
  var table = $('#recordsTable');

  form.on('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(form[0]);

    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        displayVolunteer(JSON.parse(data));
        form[0].reset();
      }
    });
  });

  function displayVolunteer(volunteer) {
    var row = $('<tr></tr>');
    row.html(`
      <td>${volunteer.firstName}</td>
      <td>${volunteer.lastName}</td>
      <td>${volunteer.email}</td>
      <td>$${volunteer.amount}</td>
      <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `);

    table.append(row);
  }

  $(document).on('click', '.editBtn', function() {
    var row = $(this).closest('tr');
    var cells = row.find('td');

    var firstName = cells.eq(0).text();
    var lastName = cells.eq(1).text();
    var email = cells.eq(2).text();
    var amount = cells.eq(3).text().replace('$', '');

    form.find('input[name="firstName"]').val(firstName);
    form.find('input[name="lastName"]').val(lastName);
    form.find('input[name="email"]').val(email);
    form.find('input[name="amount"]').val(amount);

    row.remove();
  });

  $(document).on('click', '.deleteBtn', function() {
    $(this).closest('tr').remove();
  });
});