<?php
require_once __DIR__ . '/BaseService.class.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class usersService extends BaseService{


  public function __construct(){
      parent::__construct(new UsersDao());
    }

  public function register($data){
    return $this->dao->register($data);
  }

  public function changePw($data){
    return $this->dao->changePw($data);
  }

  public function getPw($data){
    return $this->dao->getPw($data);
  }

  public function getMail($data){
    return $this->dao->getMail($data);
  }

  public function login($mail){
    return $this->dao->login($mail);
  }

  public function verifyNow($data) {


    $randomToken = strtoupper(substr($data[0]['email'], 0, 1)) . rand(10000, 99999); 

    //return $this->dao->prepVerify($data[0], $randomToken);

    $status = $this->dao->prepVerify($data[0], $randomToken);

    if(!$status){
      return Flight::json(['message' => 'Something went wrong, try again later'], 500); 
    }
 
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
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port = 465; // TCP port to connect to

            // Sender and recipient
            $mail->setFrom('eNote.activation@gmail.com', 'eNote');
            $mail->addAddress($data[0]['email'], 'Recipient Name');

            // Email content
            $mail->isHTML(true);
            $mail->Subject = 'Account verification';
            $mail->Body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html>
            
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <!-- Facebook sharing information tags -->
              <meta property="og:title" content="Verify Your Email">
              <title>Verify Your Email</title>
              <style type="text/css">
                #outlook a{
                    padding:0;
                  }
                  body{
                    width:100% !important;
                  }
                  .ReadMsgBody{
                    width:100%;
                  }
                  .ExternalClass{
                    width:100%;
                  }
                  body{
                    -webkit-text-size-adjust:none;
                  }
                  body{
                    margin:0;
                    padding:0;
                  } 
                  img{
                    border:0;
                    height:auto;
                    line-height:100%;
                    outline:none;
                    text-decoration:none;
                  }
                  table td{
                    border-collapse:collapse;
                  }
                  #backgroundTable{
                    height:100% !important;
                    margin:0;
                    padding:0;
                    width:100% !important;
                  }
                  body,#backgroundTable{
                    /*@editable*/background-color:#FAFAFA;
                  }
                /*
                @tab Page
                @section email border
                @tip Set the border for your email.
                */
                  #templateContainer{
                    /*@editable*/border:1px none #DDDDDD;
                  }
                /*
                @tab Page
                @section heading 1
                @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
                @style heading 1
                */
                  h1,.h1{
                    /*@editable*/color:#202020;
                    display:block;
                    /*@editable*/font-family:monospace;
                    /*@editable*/font-size:50px;
                    /*@editable*/font-weight:bold;
                    /*@editable*/line-height:100%;
                    margin-top:20px;
                    margin-right:0;
                    margin-bottom:20px;
                    margin-left:0;
                    /*@editable*/text-align:center;
                  }
                /*
                @tab Page
                @section heading 2
                @tip Set the styling for all second-level headings in your emails.
                @style heading 2
                */
                  h2,.h2{
                    /*@editable*/color:#202020;
                    display:block;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:30px;
                    /*@editable*/font-weight:bold;
                    /*@editable*/line-height:100%;
                    margin-top:0;
                    margin-right:0;
                    margin-bottom:10px;
                    margin-left:0;
                    /*@editable*/text-align:center;
                  }
                /*
                @tab Page
                @section heading 3
                @tip Set the styling for all third-level headings in your emails.
                @style heading 3
                */
                  h3,.h3{
                    /*@editable*/color:#202020;
                    display:block;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:26px;
                    /*@editable*/font-weight:bold;
                    /*@editable*/line-height:100%;
                    margin-top:0;
                    margin-right:0;
                    margin-bottom:10px;
                    margin-left:0;
                    /*@editable*/text-align:center;
                  }
                /*
                @tab Page
                @section heading 4
                @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
                @style heading 4
                */
                  h4,.h4{
                    /*@editable*/color:#202020;
                    display:block;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:22px;
                    /*@editable*/font-weight:bold;
                    /*@editable*/line-height:100%;
                    margin-top:0;
                    margin-right:0;
                    margin-bottom:10px;
                    margin-left:0;
                    /*@editable*/text-align:center;
                  }
                  #templatePreheader{
                    /*@editable*/background-color:#FAFAFA;
                  }
                  .code{
                    background-color: rgb(76, 148, 76);
                    text-align: center;
                    font-size: 1.5rem;
                    padding: 10px;
                    width: auto;
                    color: white;
                  }
                  .preheaderContent div{
                    /*@editable*/color:#505050;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:10px;
                    /*@editable*/line-height:100%;
                    /*@editable*/text-align:left;
                  }
                  .preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {
                    /*@editable*/color:#336699;
                    /*@editable*/font-weight:normal;
                    /*@editable*/text-decoration:underline;
                  }
                  .preheaderContent img{
                    display:inline;
                    height:auto;
                    margin-bottom:10px;
                    max-width:280px;
                  }
                  #templateHeader{
                    /*@editable*/background-color:#FFFFFF;
                    /*@editable*/border-bottom:0;
                  }
                  .headerContent{
                    /*@editable*/color:#202020;
                    /*@editable*/font-family:monospace;
                    /*@editable*/font-size:34px;
                    /*@editable*/font-weight:bold;
                    /*@editable*/line-height:100%;
                    /*@editable*/padding:0;
                    /*@editable*/text-align:left;
                    /*@editable*/vertical-align:middle;
                    background-color: #FAFAFA;
                      padding-bottom: 14px;
                  }
                  .headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
                    /*@editable*/color:#336699;
                    /*@editable*/font-weight:normal;
                    /*@editable*/text-decoration:underline;
                  }
                  #headerImage{
                    height:auto;
                    max-width:400px !important;
                  }
                  #templateContainer,.bodyContent{
                    /*@editable*/background-color:#FFFFFF;
                  }
                  .bodyContent div{
                    /*@editable*/color:#505050;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:14px;
                    /*@editable*/line-height:150%;
                    /*@editable*/text-align:left;
                  }
                  .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {
                    /*@editable*/color:#336699;
                    /*@editable*/font-weight:normal;
                    /*@editable*/text-decoration:underline;
                  }
                  .bodyContent img{
                    display:inline;
                    height:auto;
                    margin-bottom:10px;
                    max-width:280px;
                  }
                  #templateFooter{
                    /*@editable*/background-color:#FFFFFF;
                    /*@editable*/border-top:0;
                  }
                  .footerContent {
                    background-color: #fafafa;
                  }
                  .footerContent div{
                    /*@editable*/color:#707070;
                    /*@editable*/font-family:Arial;
                    /*@editable*/font-size:11px;
                    /*@editable*/line-height:150%;
                    /*@editable*/text-align:left;
                  }
                  .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {
                    /*@editable*/color:#336699;
                    /*@editable*/font-weight:normal;
                    /*@editable*/text-decoration:underline;
                  }
                  .footerContent img{
                    display:inline;
                  }
                  #social{
                    /*@editable*/background-color:#FAFAFA;
                    /*@editable*/border:0;
                  }
                  #social div{
                    /*@editable*/text-align:left;
                  }
                  #utility{
                    /*@editable*/background-color:#FFFFFF;
                    /*@editable*/border:0;
                  }
                  #utility div{
                    /*@editable*/text-align:left;
                  }
                  #monkeyRewards img{
                    display:inline;
                    height:auto;
                    max-width:280px;
                  }
              
                .buttonText {
                  color: #4A90E2;
                  text-decoration: none;
                  font-weight: normal;
                  display: block;
                  border: 2px solid #585858;
                  padding: 10px 80px;
                  font-family: Arial;
                }
              
                #supportSection, .supportContent {
                  background-color: white;
                  font-family: arial;
                  font-size: 12px;
                  border-top: 1px solid #e4e4e4;
                }
              
                .bodyContent table {
                  padding-bottom: 10px;
                }
              
              
                .footerContent p {
                  margin: 0;
                  margin-top: 2px;
                }
              
                .headerContent.centeredWithBackground {
                  background-color: #EE9;
                  text-align: center;
                  padding-top: 20px;
                  padding-bottom: 20px;
                }
                    
                 @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                        h1 {
                            font-size: 40px !important;
                        }
                        
                        .content {
                            font-size: 22px !important;
                        }
                        
                        .bodyContent p {
                            font-size: 22px !important;
                        }
                        
                        .buttonText {
                            font-size: 22px !important;
                        }
                        
                        p {
                            
                            font-size: 16px !important;
                            
                        }
                        
                        .footerContent p {
                            padding-left: 5px !important;
                        }
                        
                        .mainContainer {
                            padding-bottom: 0 !important;   
                        }
                    }
              </style>
            </head>
            
            <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="width:100% ;-webkit-text-size-adjust:none;margin:0;padding:0;background-color:#FAFAFA;">
              <center>
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable" style="height:100% ;margin:0;padding:0;width:100% ;background-color:#FAFAFA;">
                  <tr>
                    <td align="center" valign="top" style="border-collapse:collapse;">
                      <!-- // Begin Template Preheader \\ -->
                      <table border="0" cellpadding="10" cellspacing="0" width="450" id="templatePreheader" style="background-color:#FAFAFA;">
                        <tr>
                          <td valign="top" class="preheaderContent" style="border-collapse:collapse;">
                            <!-- // Begin Module: Standard Preheader \\ -->
                            <table border="0" cellpadding="10" cellspacing="0" width="100%">
                              <tr>
                                <td valign="top" style="border-collapse:collapse;">
                                  <!-- <div mc:edit="std_preheader_content">
                                                                 Use this area to offer a short teaser of your email\'s content. Text here will show in the preview area of some email clients.
                                                              </div>
                                                              -->
                                </td>
                              </tr>
                            </table>
                            <!-- // End Module: Standard Preheader \\ -->
                          </td>
                        </tr>
                      </table>
                      <!-- // End Template Preheader \\ -->
                      <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
                        <tr>
                          <td align="center" valign="top" style="border-collapse:collapse;">
                            <!-- // Begin Template Header \\ -->
                            <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
                              <tr>
                                <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#ee9;padding-bottom:20px;padding-top:20px;">
                                  <!-- // Begin Module: Standard Header Image \\ -->
                                  <h1>eNote</h1>
                                  <!-- // End Module: Standard Header Image \\ -->
                                </td>
                              </tr>
                            </table>
                            <!-- // End Template Header \\ -->
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top" style="border-collapse:collapse;">
                            <!-- // Begin Template Body \\ -->
                            <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateBody">
                              <tr>
                                <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#FFFFFF;">
                                  <!-- // Begin Module: Standard Content \\ -->
                                  <table border="0" cellpadding="20" cellspacing="0" width="100%" style="padding-bottom:10px;">
                                    <tr>
                                      <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
                                        <div style="text-align:center;color:#505050;font-family:Arial;font-size:14px;line-height:150%;">
                                          <h1 class="h1" style="color:#202020;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:center;">Account verification</h1>
            
                                          <!-- <h2 class="h2">Heading 2</h2>
                                                                            <h3 class="h3">Heading 3</h3>
                                                                            <h4 class="h4">Heading 4</h4> -->
                                          <p>You\'r verification code is</p>
                                          <p class="code">'.$randomToken.'</p>
                                        </div>
                                      </td>
                                    </tr>
                                    
                                  </table>
                                  <!-- // End Module: Standard Content \\ -->
                                </td>
                              </tr>
                            </table>
                            <!-- // End Template Body \\ -->
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top" style="border-collapse:collapse;">
                            <!-- // Begin Template Footer \\ -->
                            <table border="0" cellpadding="10" cellspacing="0" width="450" id="templateFooter" style="background-color:#FFFFFF;border-top:0;">
                              <tr>
                                <td valign="top" class="footerContent" style="padding-left:0;border-collapse:collapse;background-color:#fafafa;">
                                  <div style="text-align:center;color:#c9c9c9;font-family:Arial;font-size:11px;line-height:150%;">
                                    <p style="text-align:left;margin:0;margin-top:2px;">eNote | Copyright © 2023 | All rights reserved</p>
                                  </div>
                                  <!-- // End Module: Standard Footer \\ -->
                                </td>
                              </tr>
                            </table>
                            <!-- // End Template Footer \\ -->
                          </td>
                        </tr>
                      </table>
                      <br>
                    </td>
                  </tr>
                </table>
              </center>
            </body>
            
            </html>';

            #$mail->Body = '<p>Love <span style="color:red;"> IBU </span>!</p><br></br>
            #<h1>Your code is </h1><br></br>
            #<p>'.$randomToken.'</p>';

            // Send email
            $mail->send();
            return 'Email sent successfully!';
        } catch (Exception $e) {
            return "Email could not be sent. Error: {$mail->ErrorInfo}";
        }
  }

  public function getDataVerf($data){
    return $this->dao->getDataVerf($data);
  }
  
  public function activeAndDelete($id){
    return $this->dao->activeAndDelete($id);
  }

  public function getStatus($id){
    return $this->dao->getStatus($id);
  }

}

?>
