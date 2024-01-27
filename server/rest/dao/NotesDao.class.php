
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once dirname(__FILE__)."/BaseDao.class.php";

  class NotesDao extends BaseDao{


        public function __construct(){
            parent::__construct("notes");
          }


        /*
        **  Method for get notes
        */
        public function getNotes($id){
          $tableName = 'notes' . $id;
          $stmt = $this->conn->prepare("SELECT * FROM $tableName WHERE folder is null ORDER BY id desc;");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function getFolders($id){
          $tableName = 'folders' . $id;
      
          // Check if the table exists
          $stmtCheck = $this->conn->prepare("SHOW TABLES LIKE ?");
          $stmtCheck->execute([$tableName]);
      
          if ($stmtCheck->rowCount() == 0) {
              // The table doesn't exist, return null or an empty array, depending on your preference
              return null;
          }
      
          // The table exists, proceed with fetching data
          $stmt = $this->conn->prepare("SELECT * FROM $tableName ORDER BY id DESC;");
          $stmt->execute();
      
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
      

        public function getNote($id, $userID){
          $tableName = 'notes' . $userID;
          $stmt = $this->conn->prepare("SELECT * FROM $tableName WHERE id = '".$id."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function getFolderNotes($id, $name){
          $tableNameNote = 'notes' . $id;
          $tableNameFolder = 'folders' . $id;
          $stmt = $this->conn->prepare
          ("SELECT * FROM $tableNameNote 
          WHERE folder = (SELECT id FROM $tableNameFolder WHERE name LIKE '".$name."') 
          ORDER BY id desc;");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }


        /*
        **  Method for add new note
        */
        public function newNotes($data){
          $stmt = $this->conn->prepare("SELECT * FROM notesTable where userID = ".$data['id'].";");
          $stmt->execute();
          $tableName = $stmt->fetchAll(PDO::FETCH_ASSOC);

          
          #$tableName[0]['tableName']
          
          if($data['folder'] !== 'null')
          {
          $folderTable = 'folders'.$data['id'];

          $fname = $this->conn->prepare("SELECT id FROM $folderTable where name = '".$data['folder']."';");
          $fname->execute();
          $folder = $fname->fetchAll(PDO::FETCH_ASSOC);
          $folderNumb = $folder[0]['id'];

          $sql = "INSERT INTO " . $tableName[0]['tableName'] . " (title, notes, timestamp, prio, folder)
          VALUES ('" . $data['title'] . "', '" . $data['text'] . "', CURRENT_TIMESTAMP, '" . $data['prio'] . "', '" . $folderNumb . "');";

          }else{
            $sql="INSERT INTO ".$tableName[0]['tableName']." (title, notes, timestamp, prio, folder)
            VALUES ('".$data['title']."', '".$data['text']."', CURRENT_TIMESTAMP, '".$data['prio']."', null);";
          }
          $stmt = $this->conn->prepare($sql);
          $stmt->execute();

          return $stmt->fetchAll(PDO::FETCH_ASSOC); ;
        }


        public function editNote($id, $data){
          $tableName = 'notes' . $id;
          $stmt = $this->conn->prepare("UPDATE ".$tableName." SET title = '".$data['title']."', notes = '".$data['notes']."' WHERE id = ".$data['id']."");
          if($stmt->execute())
              {
                 return true;
              }else{
                  return false;
              }
        }


        public function createFolder($data){

          //$stmt = $this->conn->prepare("select * from folders".$data['userID']);
          
          $stmtCheck = $this->conn->prepare("SHOW TABLES LIKE ?");
          $stmtCheck->execute(["folders".$data['userID']]);

          if ($stmtCheck->rowCount() == 0){
            $stmt = $this->conn->prepare("CREATE TABLE folders".$data['userID']." (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL
          );");
            $stmt->execute();
          }

          $stmt = $this->conn->prepare("select * from folders".$data['userID']." where name like '".$data['folderName']."'");
          $stmt->execute();
          $stat = $stmt->fetchAll(PDO::FETCH_ASSOC);

          if (!$stat){
            $stmt = $this->conn->prepare("INSERT INTO folders".$data['userID']." (name)
            VALUES ('".$data['folderName']."');");
            $stmt->execute();
            return true;
          }else{
            return false;
          }
          
    
        }



        public function dltNote($id, $noteId){
          $tableName = 'notes' . $id;
          $stmt = $this->conn->prepare("DELETE FROM ".$tableName." WHERE id = ".$noteId.";");
          if($stmt->execute())
              {
                 return true;
              }else{
                  return false;
              }
        }
        
        public function dltFolder($userID, $folderName){
          $tableName = 'folders' . $userID;
          $stmt = $this->conn->prepare("DELETE FROM ".$tableName." WHERE name = '".$folderName."';");
          if($stmt->execute())
              {
                 return true;
              }else{
                  return false;
              }
        }


        public function getUserMail($id){
          $stmt = $this->conn->prepare("select email from users where user_id = '".$id."';");
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        

}
   ?>
