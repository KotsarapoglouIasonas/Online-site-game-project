<?php session_start(); ?>
<?php include "connect_db.php"; ?>
<?php include "phpfunctions.php"; ?>
<?php
$gameID = $_GET['gameID'];
$userID = $_SESSION["userID"];
$hit = $_GET['hit'];
$miss = $_GET['miss'];
$quit = $_GET['quit'];
$score = $_GET['score'];
$accuracy = $hit/($hit+$miss+$quit);
$avgspeed = $_GET['avgspeed'];
$playtime = $_GET['playtime'];
$level = $_GET['level'];
$startTimestamp = $_GET['startTimestamp'];
$endTimestamp = $_GET['endTimestamp'];
$turn = $_GET['turn'];
$insertgamesql = "INSERT INTO gameevent (gameID, userID, hit, miss, quit, score,accuracy,
              AvgSpeed,playTime,level, startTimestamp,endTimestamp)
              VALUES ('$gameID', '$userID', '$hit', '$miss', '$quit', '$score', '$accuracy','$avgspeed','$playtime','$level',FROM_UNIXTIME('$startTimestamp'*0.001),FROM_UNIXTIME('$endTimestamp'*0.001))";
$conn->exec($insertgamesql);

$sql = "SELECT COUNT(*) FROM statistic WHERE userID='$userID' and gameID='$gameID'";
      if ($res = $conn->query($sql)) {
        // Ο ίδιος παίκτης έχει ξαναπαίξει ήδη το παιχνίδι, γίνεται ενημέρωση της εγγραφής
        if ($res->fetchColumn() > 0) {
          $sql = "SELECT * FROM statistic WHERE userID='$userID' and gameID='$gameID'";
            foreach ($conn->query($sql) as $row) {
              $statisticID = $row['statisticID'];
              $rounds = $row['rounds']+$turn;
              $hit = $row['hit']+$hit;
              $miss = $row['miss']+$miss;
              $quits = $row['quits']+$quit;
              $score = $row['score']+$score;
              // Συνολική ακρίβεια μετά την προσθήκη των νέων δεδομένων με ακρίβεια δύο ψηγίων
              $accuracy = number_format($hit/($hit+$miss+$quits), 2, '.', '');;
              $playTotalTime = $row['playTotalTime']+$playtime;
              // Συνολική μέση ταχύτητα μετά την προσθήκη των νέων δεδομένων
              $AvgSpeed = $playTotalTime/$rounds;
              $updatestatsql = "UPDATE statistic SET rounds = '$rounds',
                        hit = '$hit',miss = '$miss',quits='$quits',score='$score',
                        accuracy='$accuracy', AvgSpeed='$AvgSpeed', playTotalTime='$playTotalTime' WHERE statisticID='$statisticID'";
              $conn->exec($updatestatsql);
            }
        }
        // Ο παίκτης παίζει πρώτη φορά το παιχνίδι, εισάγεται η εγγραφή στον πίνακα
        else{
          $insertstatsql = "INSERT INTO statistic (userID, gameID, rounds, hit, miss, quits, score,accuracy,AvgSpeed,playTotalTime)
              VALUES ('$userID', '$gameID','$turn', '$hit', '$miss', '$quit', '$score', '$accuracy','$avgspeed','$playtime')";
          $conn->exec($insertstatsql);
        }
      }
    	?>
<script>
            alert("Τελειώσατε επιτυχημένα το παιχνίδι! Δείτε στατιστικά του");window.location = "stats.php?id="+<?php echo $gameID;?>;
            </script>