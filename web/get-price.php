<?php

@include "config.php";
@include "method_heap.php";

/*$_POST['name'] = "As Foretold";
$_POST['set'] = "AKH";
$_POST['foil'] = "0";*/

$code = getCodeFromLongname($_POST['set']);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$query = "SELECT price_avg_mtggoldfish FROM cards WHERE cardname = '" . $_POST['name'] .
           "' AND code = '" . $code . "' AND foil = " . $_POST['foil'];

$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row['price_avg_mtggoldfish'];
    }
} else {
    echo "ERR";
}

$conn->close();