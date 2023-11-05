<?php
    $filename = $_FILES['file']['name'];
    $tmp_name = $FILES['file']['tmp_name'];
    $file_up_name = time() . $filename;
    move_uploaded_file($tmp_name,"files/" . $file_up_name);

?>