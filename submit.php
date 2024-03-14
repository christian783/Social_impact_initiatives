<?php

// Database configuration
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'initiatives';

// Create a database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_POST['action'];

if ($action === 'create') {
    // Handle create operation
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $amount = $_POST['amount'];

    // Insert the data into the database
    $sql = "INSERT INTO volunteers (first_name, last_name, email, amount) VALUES ('$firstName', '$lastName', '$email', '$amount')";

    if ($conn->query($sql) === TRUE) {
        $volunteerId = $conn->insert_id;

        // Return the created entry
        $volunteer = [
            'id' => $volunteerId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'amount' => $amount
        ];

        echo json_encode($volunteer);
    } else {
        echo "Error: " . $sql ."<br>" . $conn->error;
    }
} elseif ($action === 'read') {
    // Handle read operation
    $page = $_POST['page'];
    $itemsPerPage = 5;
    $offset = ($page - 1) * $itemsPerPage;

    // Retrieve the data from the database
    $sql = "SELECT * FROM volunteers";
    $result = $conn->query($sql);

    $volunteers = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $volunteers[] = [
                'id' => $row['id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'amount' => $row['amount']
            ];
        }
    }

    echo json_encode($volunteers);
} elseif ($action === 'save') {
    // Handle save operation
    $volunteerId = $_POST['id'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $amount = $_POST['amount'];

    // Update the data in the database
    $sql = "UPDATE volunteers SET first_name='$firstName', last_name='$lastName', email='$email', amount='$amount' WHERE id='$volunteerId'";

    if ($conn->query($sql) === TRUE) {
        // Return the updated entry
        $volunteer = [
            'id' => $volunteerId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'amount' => $amount
        ];

        echo json_encode($volunteer);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} elseif ($action === 'delete') {
    // Handle delete operation
    $volunteerId = $_POST['id'];

    // Delete the data from the database
    $sql = "DELETE FROM volunteers WHERE id='$volunteerId'";

    if ($conn->query($sql) === TRUE) {
        // Return a success message or status code
        echo 'Success';
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} elseif ($action === 'search') {
    // Handle search operation
    $searchQuery = $_POST['query'];

    // Perform the search in the database
    $sql = "SELECT * FROM volunteers WHERE first_name LIKE '%$searchQuery%' OR last_name LIKE '%$searchQuery%' OR email LIKE '%$searchQuery%' OR amount LIKE '%$searchQuery%'";
    $result = $conn->query($sql);

    $searchResults = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $searchResults[] = [
                'id' => $row['id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'amount' => $row['amount']
            ];
        }
    }

    echo json_encode($searchResults);
} elseif ($action === 'edit') {
    // Handle edit operation
    $volunteerId = $_POST['id'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $amount = $_POST['amount'];

    // Update the data in the database
    $sql = "UPDATE volunteers SET first_name='$firstName', last_name='$lastName', email='$email', amount='$amount' WHERE id='$volunteerId'";

    if ($conn->query($sql) === TRUE) {
        // Return the updated entry
        $volunteer = [
            'id' => $volunteerId,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'amount' => $amount
        ];

        echo json_encode($volunteer);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();

?>