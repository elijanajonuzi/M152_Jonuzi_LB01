<?php

 require_once("./include_mysql/db_connection.php");

if($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET)) {
        $sql = "select job_data_id, title from job_data;";

        try {
            $stm = $dbconn->prepare($sql);
            if ($stm->execute() === false) {
                $msg = 'Error selecting the job titles.';
                echo $msg;
            } else {
              $titles = $stm->fetchAll(PDO::FETCH_ASSOC);
              header('Content-Type: application(json)');
              echo json_encode($titles);
            }
        } catch (PDOException $e) {
            echo 'fail ' . $e->getMessage();
            die();
        }

        header('Content-Type: application/json');
    }
}


?>
