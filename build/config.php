<?php
/*
This file contains configurable variables for both debug.php and min.php.
*/

//current entityjs version
//this will be added to all built files.
$version = '0.1';

//full length path to entityjs folder
$absolute_path = '..';

//path to entityjs source files
$source_path = $absolute_path.'/src';

//path to output directory
$des_path = $absolute_path.'/lib';

//location of license
$license = $absolute_path.'/license.txt';

//name of entityjs directory
$entity = 'entityjs';

//name of main entity file
$re_file = 're.js';

//path to entityjs directory
$retro_folder = $source_path.'/'.$entity.'/';

//name of outputed minified file
$min_name = 'entity.min.js';

//name of outputed debug file
$debug_name = 'entity.debug.js';


/*
Compile replace variables.

Adding these variables to your release source files will be replaced
with the respected value.
*/

//replaces $VERSION with current entity js version
$version_pattern = '$VERSION';

//more to come..

?>