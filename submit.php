<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "initiatives";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$amount = $_POST['amount'];

$stmt = $conn->prepare("INSERT INTO volunteers (first_name, last_name, email, amount) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssd", $firstName, $lastName, $email, $amount);

if ($stmt->execute()) {
  $volunteerId = $stmt->insert_id;
  $volunteer = array(
    'id' => $volunteerId,
    'firstName' => $firstName,
    'lastName' => $lastName,
    'email' => $email,
    'amount' => $amount
  );
  echo json_encode($volunteer);
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>