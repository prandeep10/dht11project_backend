<?php

// Set recipient email address
$recipient_email = 'xyz124@gmail.com';

// Function to send email
function sendEmail($recipient_email, $temperature, $humidity) {
    $subject = 'Temperature and Humidity Data';
    $message = "Temperature: $temperature °C\n";
    $message .= "Humidity: $humidity %";

    // Send email
    return mail($recipient_email, $subject, $message);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if temperature and humidity data are provided
    if (isset($_POST['temperature']) && isset($_POST['humidity'])) {
        // Retrieve temperature and humidity data
        $temperature = $_POST['temperature'];
        $humidity = $_POST['humidity'];

        // Send email
        $email_sent = sendEmail($recipient_email, $temperature, $humidity);

        if ($email_sent) {
            // Email sent successfully
            echo json_encode(array("message" => "Email sent successfully"));
        } else {
            // Failed to send email
            echo json_encode(array("error" => "Failed to send email"));
        }
    } else {
        // Temperature and/or humidity data not provided
        echo json_encode(array("error" => "Temperature and/or humidity data not provided"));
    }
} else {
    // Request method is not POST
    echo json_encode(array("error" => "Only POST requests are allowed"));
}
?>
