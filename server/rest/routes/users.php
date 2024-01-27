<?php




Flight::route('GET /userProf', function(){
  $id=Flight::request()->query->id;
  Flight::json(Flight::usersSrv()->get_by_id($id));
});


/*
Flight::route('GET /Users', function(){
    Flight::json(Flight::usersSrv()->get_all(Flight::query('search'))); //Flight::json() vraca nam json format
});
*/




 Flight::route('POST /register', function(){
  $data = Flight::usersSrv()->register(Flight::request()->data->getData());
  if($data == 'errorEmail'){
    return Flight::json(['message' => 'Email must be unique'], 500);
    
  }else if($data == 'errorUsername'){
    return Flight::json(['message' => 'Username must be unique'], 500);

  }else{
  Flight::json(['message' => 'All good'], 200);

  }
   
 });


 Flight::route('POST /changePw', function(){
  
  $data = Flight::request()->data->getData();
  $userPw = Flight::usersSrv()->getPw($data['user_id']);

  if($userPw[0]['password'] == md5($data['password'])){
    Flight::usersSrv()->changePw($data);
    Flight::json(["message" => "Your password has been changed!"], 200);
  }else{
    Flight::json(["message" => "Old password not correct!"], 500);
  }

});

Flight::route('POST /test', function(){  // validate user
  $data = Flight::request()->data->getData();

  $dataTime = time();

  $serverData = Flight::usersSrv()->getDataVerf($data['user_id']);

  $serverTime =  strtotime($serverData[0]['timestamp'])+7200;// 7200 difference in timezone

  $timeDiff = $dataTime-$serverTime; 

  if($timeDiff > 92){
    Flight::json(["message" => 'Your token has expired!'], 405);
    return;
  }
  
  if($data['token']==$serverData[0]['textcode']){
    Flight::usersSrv()->activeAndDelete($data['user_id']);

    Flight::json(["message" => 'User has been activated!'], 200);

    return;
  }else{
    Flight::json(["message" => 'Token is not valid!'], 405);
    return;
  }

});

/*
Flight::route('POST /userVerf', function(){
  $data = Flight::request()->data->getData();
  Flight::json(["message" => $data], 200);
  // You can access the values in $data as follows:
  $user_id = $data['user_id'];
  $token = $data['token'];

});
*/





 Flight::route('GET /verify', function(){

  $data = Flight::usersSrv()->getMail(Flight::request()->query->id); 

  $resp = Flight::usersSrv()->verifyNow($data);

  Flight::json(["Token" => $resp], 200);

});


Flight::route('GET /status', function(){
  Flight::json(Flight::usersSrv()->getStatus(Flight::request()->query->id));

});


/*
 Flight::route('POST /activateAccount/@email', function(){
  Flight::json(Flight::usersSrv()->activateAccount(Flight::request()->data->getData()));
});*/




Flight::route('POST /login', function(){

  //Flight::json(Flight::usersSrv()->login(Flight::request()->data->getData()));


    $login = Flight::request()->data->getData();
    $user = Flight::usersSrv()->login($login['username']);
    if($user != null){
      if($user[0]['password'] == md5($login['password'])){
        Flight::json(["message" => "Password OK", 
                      "id" => $user[0]['user_id'], 
                      "status" => $user[0]['status'], 
                      "timeCreated" => $user[0]['timeCreated']], 200);
      }else{
        Flight::json(["message" => 'Password is incorect'], 500);
        //Flight::json(["error" => 'Password not correct '.$user[0]['password'].' == '.md5($login['password'])], 500);
      }
    }else{
      Flight::json(["message" => "user not exists"], 500);
    }
    
     
  });

?>
