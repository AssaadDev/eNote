<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

  class UsersDao extends BaseDao{


        public function __construct(){
            parent::__construct("users");
          }


        /*
        **  Method for add to base
        */

        public function register($data){

              // email unique
              $stmt = $this->conn->prepare("select * from users where email ='".$data['email']."';");
              $stmt->execute();
              $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
              
              $error = 'errorEmail';
              if ($res){
                return $error;
                //Flight::json(['message' => 'Email must be unique'], 500);
              }

              // username unique
              $stmt = $this->conn->prepare("select * from users where username ='".$data['username']."';");
              $stmt->execute();
              $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
              
              $error = 'errorUsername';
              if ($res){
                return $error;
                //return Flight::json(['message' => 'Username must be unique'], 500);
              }
            
              $passCode = md5($data['password']); 
              $stmt = $this->conn->prepare("INSERT INTO users (username, email, password, status, timeCreated) 
                                           VALUES ('".$data['username']."', '".$data['email']."', '".$passCode."', 'inactive', NOW())"); // queri samo sa jedin navodnicima!!!

              $stmt->execute();
              $data['id'] = $this->conn->lastInsertId();
              
              /* Creating table for notes */
              $stmt = $this->conn->prepare("CREATE TABLE notes".$data['id']." (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                notes TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                prio VARCHAR(255) NOT NULL,
                folder VARCHAR(255)
            );");
              $stmt->execute();

              /* normalization for individual tables */
              $stmt = $this->conn->prepare("INSERT INTO notesTable (userID, tableName)
              VALUES (".$data['id'].", 'notes".$data['id']."');
              ");
              $stmt->execute();

              return $data['id'];
            
          }

          public function prepVerify($data, $token){

            $stmt = $this->conn->prepare("select * from verify_user where user_id ='".$data['user_id']."';");
            $stmt->execute();
            $stat = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($stat){
              $query = "UPDATE verify_user set textcode = '".$token."',
              timestamp = NOW() 
              WHERE user_id = '".$data['user_id']."';";
            }else{
              $query = "INSERT INTO verify_user (user_id, textcode)
              VALUES ('".$data['user_id']."', '".$token."');";
            }

            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute())
              {
                 return true;
              }else{
                  return false;
              }
          }


        public function login($username){
          $stmt = $this->conn->prepare("select * from users where username = '".$username."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function getPw($id){
          $stmt = $this->conn->prepare("select password from users where user_id = '".$id."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function getMail($id){
          $stmt = $this->conn->prepare("select user_id, email from users where user_id = '".$id."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function changePw($data){
          $passCode = md5($data['newPassword']); 
          $stmt = $this->conn->prepare("UPDATE users SET password = '".$passCode ."' WHERE user_id=".$data['user_id'].";"); // queri samo sa jedin navodnicima!!!, id je auto inc.
          $stmt->execute();
          $data['id'] = $this->conn->lastInsertId();

          return $data['id'];
        }

        public function getDataVerf($data){
          $stmt = $this->conn->prepare("select * from verify_user where user_id = '".$data."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function activeAndDelete($id){
          $stmt = $this->conn->prepare("UPDATE users
                                          SET status = 'ACTIVE'
                                          WHERE user_id = ".$id.";");
          $stmt->execute();
          $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

          $stmt = $this->conn->prepare("DELETE FROM verify_user WHERE user_id = ".$id.";");
          $stmt->execute();

          return $result;
        }

        public function getStatus($id){
          $stmt = $this->conn->prepare("select timeCreated from users where user_id = '".$id."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
}
   ?>
