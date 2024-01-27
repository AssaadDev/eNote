<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require_once '../vendor/autoload.php';


require_once 'dao/UsersDao.class.php';
require_once 'dao/NotesDao.class.php';


require_once 'services/usersService.class.php';
require_once 'services/noteService.class.php';


Flight::register('usersSrv','usersService');
Flight::register('noteSrv','noteService');





require_once dirname(__FILE__).'/routes/users.php'; // calling routes
require_once dirname(__FILE__).'/routes/note.php'; // calling routes

Flight::start();
?>