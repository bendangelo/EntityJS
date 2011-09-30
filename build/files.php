<?php
/*
Used in php files min.php and local.php to find all files in the source directory.

Creates a $file variable.
*/

//finds all files in source path
function findFiles($dir) {
	global $re_file, $ignore_reg;
	
    if($dh = opendir($dir)) {

        $files = array();
        $inner_files = array();

        while($file = readdir($dh)) {
		
            if($file != "." && $file != ".." && $file[0] != '.') {
			
                if(is_dir($dir . "/" . $file)) {
                    $inner_files = findFiles($dir . "/" . $file);
                    if(is_array($inner_files)) $files = array_merge($files, $inner_files); 
					
                } else if(strrpos($file, '.js')){
					$f = $dir .'/' . $file;
					
					if(!preg_match($ignore_reg, $f)){
						
						//push to the beginning to prevent null re errors
						if($file == $re_file){
							array_unshift($files, $f);
						} else {
							array_push($files, $f);
						}
						
						printf("Found file: %s\n", $f);
					} else {
						
						printf("[Ignored] file: %s\n", $f);
					}
                }
				
            }
			
        }

        closedir($dh);
		
        return $files;
    }
}

$files = findFiles($source_path);

//sort files in correct order
for($i=count($files)-1; $i>=0; $i--){
	
	$t = $files[$i];
	
	if(strpos($t, $retro_folder)){
		//move to beginning
		
		//remove
		array_splice($files, $i);
		
		//move to front
		array_unshift($t);
	}
	
}


?>