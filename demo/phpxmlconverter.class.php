<?php
class phpxmlconverter {
    private $paths         = array();
    private $recursive     = true;
    private $log           = true;
    private $prohibitedDir = array('.', '..');
    private $lookUpFile    = 'example.php';
    
    public function __construct() {
        
    }
    
    public function setPath($path) {
        $this->paths[] = $path;
    }
    
    public function setPathList($pathArray) {
        $this->paths = array_merge($this->paths, $pathArray);
    }
    
    public function setRecursive($value) {
        $this->recursive = (boolean) $value;
    }
    
    public function setProhibitedDir($name) {
        $this->prohibitedDir[] = $name;
    }
    
    public function setProhibitedDirList($nameArray) {
        $this->prohibitedDir = array_merge($this->prohibitedDir, $nameArray);
    }

    public function setLog($value) {
        $this->log = (boolean) $value;
    }
    
    private function createPath($pathfinder) {
        $path = '';
        
        $len = count($pathfinder);
        for ($i = 0; $i < $len; $i++) {
            $path .= ($i > 0 ? '/' : '').$pathfinder[$i];
        }
        
        return $path;
    }
    
    private function scanDirectory($path) {
        $pathfinder[] = $path;
        $currentPath = $this->createPath($pathfinder);
        
        //is directory exists ?
        if (is_dir($path)) {
            //look for file in root directory
            if(in_array($path, $this->paths)) {
                $this->fileExist($currentPath);
            }

            //scan directory
            $dir = scandir($currentPath);
            $dir_len = count($dir);

            for ($j = 0; $j < $dir_len; $j++) {
                $pathfinder[] = $dir[$j];
                $currentPath = $this->createPath($pathfinder);
                
                //looking for prohibited directorys
                if (!in_array($dir[$j], $this->prohibitedDir) && strpos($dir[$j], ".") === false) {
                    $this->fileExist($currentPath);
                    if ($this->recursive)
                        $this->scanDirectory($currentPath);
                }

                array_pop($pathfinder);
            }
        }
        else {
            if ($this->log) {
                echo 'Directory: '.$currentPath.' doesn\'t exist<br />';
            }
        }
        
        array_pop($pathfinder);
    }
    
    private function fileExist($path) {
        $pathToFile = $path.'/'.$this->lookUpFile;
        
        if (file_exists($pathToFile)) {
            require_once($pathToFile);
            
            $example = isset($example) ? $example : array();
            $seealso = isset($seealso) ? $seealso : array();
            $js = isset($js) ? $js : array();
            $xml = isset($xml) ? $xml : array();
            
            $this->createXmlFile($path, $example, $seealso, $js, $xml);
            
            if ($this->log) {
                echo $this->lookUpFile.' has been found in '.$pathToFile.'. Convertion complete.<br />';
            }
        }
    }
    
    private function replaceTags($source, $tabs) {
        $tabPattern = "\r\n";
        
        for ($i = 0; $i < $tabs; $i++) {
            $tabPattern .= "\t";
        }
        
        $source = str_replace("    ", "\t", $source);
        $source = str_replace("\r\n", $tabPattern, $source);
        //<![CDATA should be removed unless its in a script tag then it should be //<!--
        //same for closing but then //-->
        
        //@todo it should be rewritten to REG_EXP
        $source = str_replace("<a:script><![CDATA[", "<a:script>//<!--", $source);
        $source = str_replace("]]></a:script>", "//--></a:script>", $source);
        $source = str_replace("<![CDATA", "", $source);
        $source = str_replace("]]>", "", $source);
        
        return $source;
    }
    
    private function createXmlFile($path, $examples, $seealso, $js, $xml) {
        $fh = fopen($path."/example.xml", "w");

        if ($fh == false) {
            echo 'Unable to create file in following location: '.$path.'/example.xml<br />';
        }
        else {
            $something_before = false;
            //preparing the name from $path
            $nameArray = explode("/", $path);
            
            for($i = count($nameArray) - 1, $name = ''; $i >= 0; $i--) {
                $name .= ($i == count($nameArray) - 1 ? '' : ' ').ucfirst($nameArray[$i]);
            }
            
            $content = '<examples name="'.$name.'" xmlns:a="http://ajax.org/2005/aml">'."\n";
            //convert examples
            $examples_len = count($examples);
            
            if ($examples_len > 0) {
                $something_before = true;
                
                for ($i = 0; $i < $examples_len; $i++) {
                    $content .= "\t".'<example>'."\n";
                        $content .= "\t\t".'<description>'.$examples[$i]["description"].'</description>'."\n";
                        $content .= "\t\t".'<source><![CDATA['."\n";
                            $content .= "\t\t\t".$this->replaceTags($examples[$i]["source"], 3)."\n";
                        $content .= "\t\t".']]></source>'."\n";
                    
                        //convert JS, XML codes
                        $codes = array("js", "xml");
                        
                        for($k = 0; $k < count($codes); $k++) {
                            $row = $$codes[$k];
                            $len = count($row[$i]);
                            
                            if ($len > 0) {
                                $something_before = true;

                                for ($j = 0; $j < $len; $j++) {
                                    $content .= "\t\t".'<'.$codes[$k].'>'."\n";
                                        $content .= "\t\t\t".'<caption>'.$row[$i][$j]["caption"].'</caption>'."\n";
                                        $content .= "\t\t\t".'<source><![CDATA['."\n";
                                            $content .= "\t\t\t\t".$this->replaceTags($row[$i][$j]["source"], 4)."\n";
                                        $content .= "\t\t\t".']]></source>'."\n";
                                    $content .= "\t\t".'</'.$codes[$k].'>'."\n";
                                }
                                
                            }
                        }
                    $content .= "\t".'</example>'."\n";
                }
            }

            //convert see also
            $seealso_len = count($seealso);
            if ($seealso_len > 0) {
                if ($something_before) {
                    $content .= "\n";
                }
                for ($i = 0; $i < $seealso_len; $i++) {
                    $content .= "\t".'<seealso menu="'.$seealso[$i]["menu"].'" sub="'.$seealso[$i]["sub"].'" name="'.$seealso[$i]["name"].'" display="'.$seealso[$i]["display"].'" title="'.$seealso[$i]["title"].'" />'."\n";
                }
            }

            $content .= '</examples>'."\n";

            fwrite($fh, $content);
        }

    }
    
    public function run() {
        $len = count($this->paths);
        for ($i = 0; $i < $len; $i++) {
            $this->scanDirectory($this->paths[$i]);
        }
        
        if ($this->log) {
            echo '============================<br />';
            echo 'Convertion process complete.<br />';
        }
    }
}
?>