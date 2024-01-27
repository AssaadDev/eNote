<?php
/*// Import PHPMailer classes into your script
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Include the Composer autoloader
require 'vendor/autoload.php';

function mailer($data) {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF; // Disable debugging (SMTP::DEBUG_SERVER for debugging)
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'eNote.activation@gmail.com'; // Your SMTP username
        $mail->Password = 'oxwielyhjkaumzxu'; // Your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Port = 465; // TCP port to connect to

        // Sender and recipient
        $mail->setFrom('eNote.activation@gmail.com', 'eNote');
        $mail->addAddress($data['email'], 'Recipient Name');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Test Email';
        $mail->Body = '<p>This is a test email.</p>';

        // Send email
        $mail->send();
        echo 'Email sent successfully!';
    } catch (Exception $e) {
        echo "Email could not be sent. Error: {$mail->ErrorInfo}";
    }
}
*/
?>
