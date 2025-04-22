<?php
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['user'] = $user['name'];
        echo "<script>alert('Login successful!'); window.location='index.html';</script>";
    } else {
        echo "<script>alert('Invalid password'); window.location='login.html';</script>";
    }
} else {
    echo "<script>alert('Email not registered'); window.location='login.html';</script>";
}

$stmt->close();
$conn->close();
?>
