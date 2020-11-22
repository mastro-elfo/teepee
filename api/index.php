<?php

require 'vendor/autoload.php';

// Get changelog file based on the requested language
// If no language match use default (english)
Flight::route("GET /api/changelog(/@lng)", function($lng){
  // If $lng is null, set default language (en)
  if(!$lng) $lng = "en";
  // join filename
  $filename = implode("/", ["changelog", "$lng.json"]);
  // Check $filename exists
  if(is_file($filename)) {
    // Get contents, decode as json, send
    Flight::json(json_decode(file_get_contents($filename)));
  }
  else {
    // otherwise use default filename
    Flight::json(json_decode(file_get_contents(implode("/", ["changelog", "en.json"]))));
  }
});

Flight::route("*", function(){
  // Debug if no route match
  $request = Flight::request();
  Flight::json([
    "url" => $request->url,
    "method" => $request->method
  ]);
});

// Enable CORS
Flight::response()->header("Access-Control-Allow-Origin", "*");

// Start engine
Flight::start();

?>
