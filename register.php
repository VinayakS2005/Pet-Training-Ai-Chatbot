<?php
include 'db.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo "<script>alert('Registration successful!'); window.location='login.html';</script>";
} else {
    echo "<script>alert('Email already exists or error occurred.'); window.location='login.html';</script>";
}

$stmt->close();
$conn->close();
?>
