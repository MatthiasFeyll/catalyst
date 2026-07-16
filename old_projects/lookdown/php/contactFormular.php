<?php
  header("Content-type: text/html; charset=UTF-8");

  try {
      if ($_SERVER['REQUEST_METHOD'] != 'POST') {
        throw new Exception();
      }

      if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
        throw new Exception();
      }

      if (strlen($_POST['name']) > 40 || strlen($_POST['email']) > 50 || strlen($_POST['message']) > 500) {
        throw new Exception();
      }

      $name = htmlspecialchars($_POST['name']);
      $email = htmlspecialchars($_POST['email']);
      $message = htmlspecialchars($_POST['message']);

      $slackData = array(
        "blocks" => array(
          array(
            "type" => "header",
            "text" => array(
              "type" => "plain_text",
              "text" => "New Message"
            )
          ),

          array(
            "type" => "section",
            "text" => array(
              "type" => "plain_text",
              "text" => "Name:\t\t\t$name\nE-Mail:\t\t$email"
            )
          ),
          array(
            "type" => "divider"
          ),
          array(
            "type" => "section",
            "text" => array(
              "type" => "plain_text",
              "text" => $message,
              "emoji" => true
            )
          )
        )
      );

      $ch = curl_init(getenv("SLACK_WEBHOOK_URL"));  // redacted: secret was hardcoded here; inject via env
      $payload = json_encode($slackData);
      curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
      curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
      curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
      $result = curl_exec($ch);
      curl_close($ch);

  }catch(Exception $e) {
    header("Status: 400 Bad request");
    return;
  }
?>
