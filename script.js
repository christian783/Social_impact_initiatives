var form = document.getElementById('volunteerForm');
var table = document.getElementById('recordsTable');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  var formData = new FormData(form);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'submit.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      displayVolunteer(JSON.parse(xhr.responseText));
      form.reset();
    }
  };
  xhr.send(formData);
});

function displayVolunteer(volunteer) {
  var row = table.insertRow(-1);
  row.innerHTML = `
    <td>${volunteer.firstName}</td>
    <td>${volunteer.lastName}</td>
    <td>${volunteer.email}</td>
    <td>$${volunteer.amount}</td>
    <td>
      <button onclick="editVolunteer(this)">Edit</button>
      <button onclick="deleteVolunteer(this)">Delete</button>
    </td>
  `;
}

function editVolunteer(button) {
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName('td');

  var firstName = cells[0].textContent;
  var lastName = cells[1].textContent;
  var email = cells[2].textContent;
  var amount = cells[3].textContent.replace('$', '');

  form.firstName.value = firstName;
  form.lastName.value = lastName;
  form.email.value = email;
  form.amount.value = amount;

  row.remove();
}

function deleteVolunteer(button) {
  var row = button.parentNode.parentNode;
  row.remove();
}