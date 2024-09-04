<?php
// Database connection
$conn = new mysqli('localhost', 'root', 'your_password', 'crael_developers');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and display project cards
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM project_cards";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        echo "<div>";
        echo "<h3>" . $row['title'] . "</h3>";
        echo "<p>" . $row['description'] . "</p>";
        echo "</div>";
    }
}

// Update project information
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $conn->real_escape_string($_POST['id']);
    $title = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);

    $sql = "UPDATE project_cards SET title='$title', description='$description' WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Project updated successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
