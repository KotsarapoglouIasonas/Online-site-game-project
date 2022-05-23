<?php 
// Ένας χρήστης έκανε Login στην εφαρμογή μας
function startSession($conn,$username,$userID){
	$_SESSION["username"] = $username;
	$_SESSION["userID"] = $userID;
	$date = date("Y-m-d");
	$insertloginsql = "INSERT INTO login (`date`, userID)
    					VALUES ('$date','$userID')";
	$conn->exec($insertloginsql);
	$_SESSION["loginID"] = $conn->lastInsertId();
}
// Επιστροφή της στήλης του πίνακα για το gameID, το userID και το level των παραμέτρων
function getColumn($conn,$col,$gameID,$userID,$level){
	$sum=0;
	$sql = "SELECT * FROM gameevent where gameID='$gameID' and userID='$userID' and level='$level'";
	if ($row = $conn->query($sql)) {

		if ($row->fetchColumn() > 0) {
			
			foreach ($conn->query($sql) as $row) {
				$sum +=$row[$col];

			}

		}
	}

	return $sum;

}
// Επιστροφή αριθμού διαφορετικών ημερών που έχει παίξει ο χρήστης userID το παιχνίδι gameID
function getDays($conn,$gameID,$userID){
	$sql = "SELECT COUNT(DISTINCT date(startTimestamp)) as days from gameevent where gameID='$gameID' and userID='$userID'";
	if ($row = $conn->query($sql)) {

		if ($row->fetchColumn() > 0) {
			
			foreach ($conn->query($sql) as $row) {
				return $row['days'];

			}
		}
	}
	return 0;
} 

?>