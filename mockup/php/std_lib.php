<?php
/*	Properties:
		[ Protected ]
		<NUM> static $GO_ONLINE = a flag to mark the current mode is online or local
		<STR> $fileRoot = the root of files in the file system
		<STR> $domain = the website domain
		<ARR> $webModulePath = the table of paths to web modules
		<ARR> protected $cssURL = the table of urls to CSS resources
		<ARR> protected $jsURL  = the table of urls to JS resources
	Methods:
		[ Public ] 
		> static function isDBG() : Tell if page is in the debug mode or not
		> function getPath2WebModule($moduleID) : Get the path to the specified web module
		> function includeWebModule($moduleID, $once = true) : Include the specified web module. This is similar to call PHP's include/include_once but with some extra little work.
		> function getURL2CSS($cssID) : Get the url to the specified css resource file
		> function includeCSS($cssID) : Include the specified CSS resources for page's use. This has nothing to do with PHP's include function!!!
		> function getURL2JS($jsID) : Get the url to the specified js resource file
		> function includeJS($jsID) : Include the specified JS resources for page's use. This has nothing to do with PHP's include function!!!
*/
class VB_PageManager {
	
	/*	Return:
			@ In the debug mode: true
			@ Not in the debug mode: false
	*/
	public static function isDBG() {
		return true;
	}
	
	static protected $GO_ONLINE = 0;
	
	function __construct() {

		$this->fileRoot = substr(__FILE__, 0, stripos(__FILE__, "php")-1);
		
		$this->domain = self::$GO_ONLINE ? "https://vibox-demo.herokuapp.com/mockup" : "http://localhost/videoDemo"; // Legacy: http://fischerliu.net63.net/viboxdemo
		
		$this->webModulePath[self::WEB_MODULE_HEADER] = $this->fileRoot . $this->webModulePath["rootDir"] . "/header.php";
		$this->webModulePath[self::WEB_MODULE_FOOTER] = $this->fileRoot . $this->webModulePath["rootDir"] . "/footer.php";
		$this->webModulePath[self::WEB_MODULE_NAV_PANEL] = $this->fileRoot . $this->webModulePath["rootDir"] . "/nav_panel.php";
		$this->webModulePath[self::MOBILE_MODULE_HEADER] = $this->fileRoot . $this->mobileModulePath["rootDir"] . "/header.php";
		
		$this->cssURL[self::CSS_STD] = $this->domain . $this->cssURL["rootDir"] . "/std.css";
		$this->cssURL[self::CSS_WEB_STD] = $this->domain . $this->cssURL["rootDir"] . "/web_std.css";
		$this->cssURL[self::CSS_MOBILE_STD] = $this->domain . $this->cssURL["rootDir"] . "/mobile_std.css";
		
		$this->jsURL[self::JS_STD] = array("/std.js");		
		if (self::isDBG()) {
			$this->jsURL[self::JS_STD][] = "/std_webModule.jsx.js";
		}		
		
		$this->jsURL[self::JS_WEB_STD] = array("/web_std.js");
		if (self::isDBG()) {
		}
		
		$this->jsURL[self::JS_MOBILE_STD] = "/mobile_std.js";	
		if (self::isDBG()) {
		}
	}
	
	protected $domain = "";
	protected $fileRoot = "";
	protected $webModulePath = array(
		"rootDir" => "/webapp/webmodule" // This is only the root dir of web modules, not of all the files.
	);
	protected $mobileModulePath = array(
		"rootDir" => "/mobileapp/webmodule" // This is only the root dir of web modules, not of all the files.
	);
	protected $cssURL = array(
		"rootDir" => "/css" // This is only the root dir of css resources, not of all the files.
	);
	protected $jsURL = array(
		"rootDir" => "/js/build", // This is only the root dir of js resources, not of all the files.
		
		// The required js libs
		// react.min.js, mustache.js, JSXTransformer.js (for local test)
		"requireJS" => array("/externaLib.js")
	);
	
	const WEB_MODULE_HEADER = "WEB_MODULE_HEADER";
	const WEB_MODULE_FOOTER = "WEB_MODULE_FOOTER";
	const WEB_MODULE_NAV_PANEL = "WEB_MODULE_NAV_PANEL";
	const MOBILE_MODULE_HEADER = "MOBILE_MODULE_HEADER";
	
	const CSS_STD = "CSS_STD";
	const CSS_WEB_STD = "CSS_WEB_STD";
	const CSS_MOBILE_STD = "CSS_MOBILE_STD";
		
	const JS_STD = "JS_STD";
	const JS_WEB_STD = "JS_WEB_STD";
	const JS_MOBILE_STD = "JS_MOBILE_STD";
	
	/*	Arg:
			<STR> $moduleID = the web module identifier, refer to this::WEB_MODULE_* for the available modules
		Return:
			@ OK: <STR> the path to the specified web module
			@ NG: null
	*/
	function getPath2WebModule($moduleID) {
		if (   !empty($this->webModulePath[$moduleID])
			&& is_string($this->webModulePath[$moduleID])
		) {
			return $this->webModulePath[$moduleID];
		}
		return null;
	}
	/*	Arg:
			<STR> $moduleID = the identifier of web module to include, refer to this::getPath2WebModule for the available modules
			<BOO> [$once] = ture means using the PHP's include_once; false means the PHP'sinclude
	*/
	function includeWebModule($moduleID, $once = true) {
		$path = $this->getPath2WebModule($moduleID);
		if ($path) {
			if ($once) {
				include_once($path);
			} else {
				include($path);
			}
		}
	}
	/*	Arg:
			<STR> $cssID = the css resource identifier, refer to this::CSS_* for the available resources
		Return:
			@ OK: <STR> the url to the specified css resource
			@ NG: null
	*/
	function getURL2CSS($cssID) {
		if (   !empty($this->cssURL[$cssID])
			&& is_string($this->cssURL[$cssID])
		) {
			return $this->cssURL[$cssID];
		}
		return null;
	}
	/*	Arg:
			<STR|ARR> $cssID = the resource identifier of the css to include. If multiple, please put in one array. Refer to this::getURL2CSS for the available CSS resources;
	*/
	function includeCSS($cssID) {
		
		$url = null;
		$urls = array();
		
		if (is_string($cssID)) {
			
			$url = $this->getURL2CSS($cssID);
			if ($url) {
				$urls[] = $url;
			}
			
		} else if (is_array($cssID)) {
			
			foreach ($cssID as $id) {				
				$url = $this->getURL2CSS($id);
				if ($url) {
					$urls[] = $url;
				}
			}
		}
		
		if (count($urls) > 0) {
			foreach ($urls as $url) {
				echo '<link rel="stylesheet" type="text/css" href="' . $url . '">';
			}
		}
	}
	/*	Arg:
			<STR> $jsID = the js resource identifier, refer to this::JS_* for the available resources
		Return:
			@ OK: <ARR> the urls to the specified js resources in one array
			@ NG: null
	*/
	function getURL2JS($jsID) {
		
		if (!empty($this->jsURL[$jsID])) {
			
			$urls = array();
			
			foreach ($this->jsURL[$jsID] as $file) {		
				$urls[] = $this->domain . $this->jsURL["rootDir"] . $file;			
			}
			
			return $urls;
		}
		return null;
	}
	/*	Arg:
			<STR|ARR> $jsID = the resource identifier of the JS to include. If multiple, please put in one array. Refer to this::getURL2JS for the available JS resources;
	*/
	function includeJS($jsID) {
				
		if (is_string($jsID)) {
			$jsID = array($jsID);
		}
		
		if (is_array($jsID)) {
		
			array_unshift($jsID, "requireJS");
		
			echo '<script> var VIBOX_ROOT = "' . $this->domain . '", VIBOX_DBG = ' . (self::isDBG() ? "true" : "false") . ';</script>';
						
			foreach ($jsID as $id) {
				
				$urls = $this->getURL2JS($id);
				
				if ($urls) {
				
					foreach ($urls as $url) {
						
						if ($this->isFileTypeJSX($url)) {
							echo '<script type="text/jsx" src="' . $url . '"></script>';	
						} else {
							echo '<script src="' . $url . '"></script>';		
						}
					}
				}
			}
		}
	}
	/*
	*/
	function isFileTypeJSX($filename) {
	
		$tokens = explode('.', $filename);
		
		$num = count($tokens);
		
		return ($num >= 2 && $tokens[$num - 2] === "jsx" && $tokens[$num - 1] === "js");
	}
}


$pgMgr = new VB_PageManager();
?>
