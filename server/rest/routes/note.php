<?php

Flight::route('GET /Notes', function(){
    $userID=Flight::request()->query->id;
    //return Flight::json(['id' => $userID], 200);

    $folder = Flight::request()->query->folder; 

    if(!empty($folder)){

      $data = Flight::noteSrv()->getFolderNotes($userID, $folder);

      $response = [
        'notes' => $data,
      ];
    }else{
      $notes = Flight::noteSrv()->getNotes($userID);
      $folders = Flight::noteSrv()->getFolders($userID);
      
      $response = [
        'folder' => $folders,  
        'notes' => $notes,
      ];
    }

    Flight::json($response);

  });



  Flight::route('GET /getNote', function(){
    $id = Flight::request()->query['id'];
    $user_id = Flight::request()->query['user_id'];
  
    Flight::json(Flight::noteSrv()->getNote($id, $user_id));
  });

  Flight::route('DELETE /deleteNote', function(){
    $data = Flight::request()->data;

     $noteID = $data['noteData']['id'];
     $userID = $data['userID'];
     if (!isset($data['noteData']) && !isset($data['userID'])) {
      Flight::json(['error' => 'Invalid or missing data'], 400);
      return;
     }
     
     $result = Flight::noteSrv()->dltNote($userID, $noteID);

     if($result){
      Flight::json(["message" => "Note succesfuly deleted!"], 200);
     }else{
      Flight::json(["error" => "Something went wrong :("], 500);
     }

  });

  Flight::route('DELETE /deleteFolder', function(){
      $data = Flight::request()->data;

     $folderName = $data['folderValue'];
     $userID = $data['userID'];

     if (!isset($data['folderValue']) && !isset($data['userID'])) {
      Flight::json(['error' => 'Invalid or missing data'], 400);
      return;
     }
     
     $result = Flight::noteSrv()->dltFolder($userID, $folderName);

     if($result){
      Flight::json(["message" => "Folder succesfuly deleted!"], 200);
     }else{
      Flight::json(["error" => "Something went wrong :("], 500);
     }

  });

  
  Flight::route('POST /newNote', function(){
    Flight::json(Flight::noteSrv()->newNotes(Flight::request()->data->getData()));
  });

  Flight::route('PUT /editNote', function(){
    $data = Flight::request()->data; // Access the request payload

    $noteData = $data['noteData']; // Assuming it's a nested object
    $userID = $data['userID'];
    
    $result = Flight::noteSrv()->editNote($userID, $noteData);

    if($result){
      Flight::json(["message" => $noteData['title']." succesfuly updated!"], 200);
    }else{
      Flight::json(["error" => "Something went wrong :("], 500);
    }
  });


  
  Flight::route('POST /setReminder', function(){
    Flight::json(Flight::noteSrv()->setReminder(Flight::request()->data->getData()));
    #Flight::json(Flight::request()->data->getData());
  });

  Flight::route('POST /createFolder', function(){
    Flight::json(Flight::noteSrv()->createFolder(Flight::request()->data->getData()));
    #Flight::json(Flight::request()->data->getData());
  });


?>
