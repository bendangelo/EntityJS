<?php
/*
The debug.php file is used to create an entity.debug.php file for your application.
Include this file into your web page and it will load all files in the source
directory automatically for you.

@usage
Open the command prompt
Navigate to the debug.php directory
type "php debug.php"
This will create for you a entity.debug.js in the lib directory

You can now use this file in debug testing / debugging.

@warning
Each time a file is deleted or created in the source directory 
you must run this php script again.
*/

require 'config.php';

require 'files.php';

$header = file_get_contents($license)."\nif(!path) path = '';\n";

//add version
$source = str_replace($version_pattern, $version, $header);

//print out all files
foreach($files as $k){
	//remove ../
	$cut = substr($k, 3);
	
	$source .= "document.write(\"<script src='\"+path+\"".$cut."' language='javascript'><\/script>\");\n";
}

//add version
$source .= "\nwindow.onload = function(){ re.version = '".$version."'; }";

$final = $des_path .'/'.$debug_name;


//create file
file_put_contents($final, $source);

printf('Success! File created at %s', $final);

?>