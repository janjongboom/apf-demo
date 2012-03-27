<?php

$words = array(
    "accordion", "action", "actiontracker", "appsettings", "auth", "bar", "bindings", 
    "browser", "button", "caldropdown", "calendar", "checkbox", "datagrid", "dragdrop", 
    "dropdown", "errorbox", "frame", "grid", "hbox", "img", "insert", "jslt", "karamba",
    "label", "list", "load", "menu", "method", "modalwindow", "model", "notifier",
    "offline", "output", "page", "panel", "progressbar", "quad damage", "radiobutton", 
    "ref", "repeat", "rpc", "slider", "spinner", "spreadsheet", "state", "statusbar", 
    "submission", "tab", "teleport", "text", "textarea", "textbox", "toolbar", "tree",
    "unique", "upload", "variable", "window", "xearo", "yamato", "zerg"
);
$POST = $_POST;
$word = isset($_POST["word"]) ? $_POST["word"] : null;
$result = '';

if ($word) {
    $firstLetter = substr($word, 0, 1);
    for ($i = 0; $i < count($words); $i++) {
        if ($firstLetter == substr($words[$i], 0, 1)) {
            $result .= $i == 0 ? $words[$i] : '|'.$words[$i];
        }
    }
    if ($result == '') {
        $result .= 'No results';
    }
}
else {
    $result .= 'No results';
}

echo $result;


?>