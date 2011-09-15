<?php
/*
Retrojs minifier
Version 0.1

This will minify all javascript files in the source path.

The default source path is entityjs/src/

When releasing a new version of your game. You could put it inside the source folder (entityjs/src)
and it will be compiled into one javascript file for you.

@warning This will minify ALL files in source path directories and sub-directories even
if its not a javascript file!

@usage 
Go into the command prompt 
Nagivate to min.php
type "php min.php"
or put all files into your server and navigate to the min.php file.
*/

require 'config.php';

require 'jsmin.php';

require 'files.php';

//add all files
foreach($files as $k){
	$source .= file_get_contents($k);
}

//compile
$js=JSMin::minify($source);

//add license
$js = file_get_contents($license) . $js;

//add version
$js = str_replace($version_pattern, $version, $js);

//paste into file
$full_des = $des_path.'/'.$min_name;

file_put_contents($full_des, $js);

printf('Success! Minified file at %s',$full_des);

?>