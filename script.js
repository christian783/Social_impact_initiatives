$(document).ready(function () {
  var form = $('#volunteerForm');
  var table = $('#recordsTable');
  var currentPage = 1;
  // Create
  form.on('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(form[0]);
    formData.append('action', 'create');

    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        displayVolunteer(JSON.parse(data));
        form[0].reset();
      },
    });
   location.reload();});



  // Read
  function loadVolunteers() {
    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: {
        action: 'read',
        page: currentPage
      },
      success: function(data) {
        displayVolunteers(JSON.parse(data));
      },
    });
  }

  function displayVolunteers(volunteers) {
    var startIndex = (currentPage - 1) * 5;
    var endIndex = startIndex + 5;
    var displayedVolunteers = volunteers.slice(startIndex, endIndex);
    table.empty(); // Clear existing table rows

    if (displayedVolunteers.length > 0) {
      for (var i = 0; i < displayedVolunteers.length; i++) {
        var volunteer = displayedVolunteers[i];

        var row = $('<tr></tr>');
        row.html(`
          <td>${volunteer.first_name}</td>
          <td>${volunteer.last_name}</td>
          <td>${volunteer.email}</td>
          <td>${volunteer.amount}</td>
          <td>
            <button class="editButton" data-id="${volunteer.id}">Edit</button>
            <button class="deleteButton" data-id="${volunteer.id}">Delete</button>
          </td>
        `);

        table.append(row);
      }
    }
    displayPagination(volunteers.length);
  }
  
  function displayPagination(totalVolunteers) {
    var totalPages = Math.ceil(totalVolunteers / 5);
    var paginationContainer = $('#paginationContainer');
    paginationContainer.empty(); // Clear existing pagination buttons
  
    for (var i = 1; i <= totalPages; i++) {
      var button = $('<button></button>').text(i);
      button.data('page', i);
      button.on('click', function() {
        currentPage = $(this).data('page');
        loadVolunteers();
      });
  
      paginationContainer.append(button);
    }
  }

// Update
table.on('click', '.editButton', function () {
  var volunteerId = $(this).data('id');
  var row = $(this).closest('tr');

  var firstName = row.find('td:eq(0)').text();
  var lastName = row.find('td:eq(1)').text();
  var email = row.find('td:eq(2)').text();
  var amount = row.find('td:eq(3)').text();

  var updateForm = $('<form class="table-form"></form>');
  updateForm.html(`
    <input type="hidden" name="action" value="update">
    <input type="hidden" name="id" value="${volunteerId}">
    <input type="text" name="firstName" value="${firstName}">
    <input type="text" name="lastName" value="${lastName}">
    <input type="text" name="email" value="${email}">
    <input type="text" name="amount" value="${amount}">
    <button id="saveButton" type="submit">Save</button>
  `);

  row.empty(); // Clear the row contents

  // Append the form to the row
  row.append($('<td colspan="5"></td>').append(updateForm));
});

  // Save
  table.on('submit', 'form', function (e) {
    e.preventDefault();

    var updateForm = $(this);
    var formData = new FormData(updateForm[0]);
    formData.append('action', 'save');

    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        var volunteer = JSON.parse(data);
        var row = updateForm.closest('tr');
        row.html(`
          <td>${volunteer.first_name}</td>
          <td>${volunteer.last_name}</td>
          <td>${volunteer.email}</td>
          <td>${volunteer.amount}</td>
          <td>
            <button class="editButton" data-id="${volunteer.id}">Edit</button>
            <button class="deleteButton" data-id="${volunteer.id}">Delete</button>
          </td>
        `);
      },
    });
  });

  // Delete
  table.on('click', '.deleteButton', function () {
    var volunteerId = $(this).data('id');
    var row = $(this).closest('tr');

    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: {
        action: 'delete',
        id: volunteerId,
      },
      success: function () {
        row.remove();
      },
    });
  });

  // Search
  var searchForm = $('#searchForm');
  searchForm.on('submit', function (e) {
    e.preventDefault();

    var searchQuery = $('#searchInput').val();

    $.ajax({
      url: 'submit.php',
      type: 'POST',
      data: {
        action: 'search',
        query: searchQuery,
      },
      success: function (data) {
        displayVolunteers(JSON.parse(data));
      },
    });
  });

  // Display volunteers on page load
 loadVolunteers();
});
