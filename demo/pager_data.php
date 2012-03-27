<?php
$page = intval($_GET["page"]);
$perpage = intval($_GET['perpage']);

$forum = array(
    array(
        "<item><title>Page 1, row 1</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 1, row 2</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 1, row 3</title><desc>Desc 1</desc><url>url1</url></item>"
    ),
    array(
        "<item><title>Page 2, row 1</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 2, row 2</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 2, row 3</title><desc>Desc 1</desc><url>url1</url></item>"
    ),
    array(
        "<item><title>Page 3, row 1</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 3, row 2</title><desc>Desc 1</desc><url>url1</url></item>",
        "<item><title>Page 3, row 3</title><desc>Desc 1</desc><url>url1</url></item>"
    )
);

$data = $forum[$page - 1];
$data_len = count($data);

$result = '<data current="'.$page.'" total="3" perpage="'.$perpage.'">';
for($i = 0; $i < $data_len || $i < $perpage; $i++) {
    $result .= $data[$i];
}
$result .= '</data>';

echo $result;
?>
