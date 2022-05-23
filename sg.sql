-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2019 at 03:59 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sg`
--

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `gameID` int(11) NOT NULL,
  `name` varchar(40) CHARACTER SET greek COLLATE greek_bin NOT NULL,
  `description` text CHARACTER SET greek COLLATE greek_bin NOT NULL,
  `instructions` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`gameID`, `name`, `description`, `instructions`, `time`) VALUES
(1, 'Εύρεση Μοτίβου', 'Ο χρήστης πρέπει να προσπαθήσει να θυμηθεί σε ποια θέση βρισκόταν κάθε σκιασμένο κουτί που προτάθηκε από την εφαρμογή ως μοτίβο', 'Πρόκειται για μία οθόνη με εννέα τετράγωνα κουτιά, από τα οποία σε κάθε γύρο θα χρωματίζονται με διαφορετικό χρώμα από δύο μέχρι τέσσερα κουτιά για 3 δευτερόλεπτα και στη συνέχεια θα επαναφέρονται στο αρχικό τους χρώμα (Εικόνα 17). Ο χρήστης πρέπει να προσπαθήσει να θυμηθεί σε ποια θέση βρισκόταν κάθε σκιασμένο κουτί που προτάθηκε από την εφαρμογή ως μοτίβο σε 10 secs. Τα επίπεδα δυσκολίας διακρίνονται από συνδυασμούς των δύο, τριών και τεσσάρων σκιασμένων κουτιών. Στον πρώτο γύρο είναι πιο εύκολο να αναγνωριστεί η θέση των δύο κουτιών, στα υπόλοιπα, και πιο συγκεκριμένα για τα επίπεδα τριών και τεσσάρων συνδυασμών, θα πρέπει να αυξηθεί η προσοχή του χρήστη ώστε να θυμηθεί τους συνδυασμούς των θέσεων που χρωματίστηκαν.', 10),
(2, 'Εύρεση Θέσης Αντικειμένου', 'Ζητά από τον χρήστη να θυμηθεί τη θέση που εμφανίστηκε ένα συγκεκριμένο αντικείμενο', 'Το παιχνίδι αυτό ζητά από τον χρήστη να θυμηθεί τη θέση που εμφανίστηκε ένα συγκεκριμένο αντικείμενο. Στο εύκολο επίπεδο δυσκολίας εμφανίζονται για 3 δευτερόλεπτα τρία αντικείμενα, τα οποία ο χρήστης πρέπει να προσέξει καλά καθώς στη συνέχεια αποκρύπτονται. Στη συνέχεια του ζητείται να υποδείξει τη θέση που εμφανίζονταν ένα από αυτά (π.χ. «Βρες το γραφείο») σε 10 secs. Στο μεσαίο επίπεδο τα αντικείμενα αυξάνουν σε 4 και στο προχωρημένο επίπεδο σε 5 και έτσι το παιχνίδι γίνεται πιο απαιτητικό σε ότι αφορά την προσοχή και κατά συνέπεια διεγείρει περισσότερο τη λειτουργία της μνήμης (Εικόνα 18). Σε περίπτωση λάθος απάντησης τα ίδια αντικείμενα ξαναεμφανίζονται στιγμιαία ώστε ο χρήστης να βοηθηθεί στην επόμενη επιλογή.', 10),
(3, 'Βρες το Διαφορετικό', 'ο χρήστης βλέπει κάποια αντικείμενα από τα οποία μπορεί ένα ή περισσότερα να ανήκουν σε διαφορετική κατηγορία', 'Στην κατηγορία της προσοχής εντάσσεται η εύρεση ενός αντικειμένου που δεν ταιριάζει με τα υπόλοιπα. Πιο συγκεκριμένα ο χρήστης βλέπει κάποια αντικείμενα από τα οποία μπορεί ένα ή περισσότερα να ανήκουν σε διαφορετική κατηγορία (Εικόνα 20). Για παράδειγμα μπορεί να εμφανιστούν πέντε αντικείμενα από τα οποία τα τέσσερα αφορούν στο είδος μεταφορικό μέσο και ένα αντικείμενο που αφορά στο είδος ηλεκτρονική συσκευή. Ο χρήστης στη συνέχεια θα πρέπει να επιλέξει εκείνο που δεν ταιριάζει με την πλειοψηφία, δηλαδή το αντικείμενο της κατηγορίας ηλεκτρονική συσκευή σε 15 secs.\r\n', 15),
(4, 'Γλώσσα', 'Ο χρήστης θα πρέπει να βρει συνώνυμα και αντώνυμα λέξεων που δίνονται', 'Στο παιχνίδι Γλώσσα ο χρήστης θα πρέπει να βρει συνώνυμα και αντώνυμα λέξεων που δίνονται σε 01:30 λεπτά (Εικόνα 14). Ο χρήστης πρώτα επιλέγει τις λέξεις και μετά επιλέγει το πλήκτρο ΕΛΕΓΧΟΣ. Το εύκολο επίπεδο ζητά 2 συνώνυμα, το μεσαίο επίπεδο ζητά 2 αντώνυμα και το προχωρημένο επίπεδο ζητά ένα συνώνυμο και ένα αντώνυμο.', 90),
(5, 'Λογική Σειρά', 'Ο χρήστης θα πρέπει να σκεφτεί και να επιλέξει το σωστό μοτίβο για να συμπληρώσει λογικά μία σειρά', 'Στο παιχνίδι Λογική Σειρά ο χρήστης θα πρέπει να σκεφτεί και να επιλέξει το σωστό μοτίβο για να συμπληρώσει λογικά την πάνω σειρά σε 01:30 λεπτά (Εικόνα 15). Ο χρήστης πρώτα επιλέγει μια από τις 2 δοθείσες επιλογές και μετά πατά το πλήκτρο ΕΛΕΓΧΟΣ. Όσο αυξάνεται το επίπεδο δυσκολίας η λογική σειρά διακρίνεται δυσκολότερα.', 90),
(6, 'Βρες τη Λέξη', 'Ο χρήστης πρέπει να επιλέξει γράμματα και να τα μετακινεί μέχρι να σχηματίσει τη σωστή λέξη', 'Στο παιχνίδι «Βρες τη λέξη» μία αναγραμματισμένη λέξη εμφανίζεται στην οθόνη του χρήστη (Εικόνα 19). Στη συνέχεια ο χρήστης πρέπει να επιλέξει γράμματα και να τα μετακινεί μέχρι να σχηματίσει τη σωστή λέξη σε 02:30 λεπτά. Ο χρήστης επιλέγει ένα γράμμα και στη συνέχεια επιλέγει ένα δεύτερο για να ανταλλάξουν θέση. Στο εύκολο επίπεδο δυσκολίας οι λέξεις είναι 4 γραμμάτων στο μεσαίο 5 και στο προχωρημένο 6 γραμμάτων.', 150);

-- --------------------------------------------------------

--
-- Table structure for table `gameevent`
--

CREATE TABLE `gameevent` (
  `gameEventID` int(11) NOT NULL,
  `gameID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `hit` int(11) NOT NULL,
  `miss` int(11) NOT NULL,
  `quit` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `accuracy` float NOT NULL,
  `AvgSpeed` float DEFAULT NULL,
  `playTime` int(11) DEFAULT NULL,
  `level` enum('Όλα τα επίπεδα','Εύκολο','Μεσαίο','Προχωρημένο','Εύκολο έως Μεσαίο') CHARACTER SET utf8 NOT NULL,
  `startTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endTimestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `loginID` int(11) NOT NULL,
  `date` date NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginID`, `date`, `userID`) VALUES
(3, '2019-06-27', 16),
(4, '2019-06-27', 17),
(5, '2019-06-29', 16),
(6, '2019-06-29', 18),
(7, '2019-06-29', 18),
(8, '2019-06-29', 18),
(9, '2019-06-30', 18),
(10, '2019-07-01', 16),
(11, '2019-07-01', 16),
(12, '2019-07-01', 16),
(13, '2019-07-02', 16),
(14, '2019-07-22', 17),
(15, '2019-07-22', 16);

-- --------------------------------------------------------

--
-- Table structure for table `statistic`
--

CREATE TABLE `statistic` (
  `statisticID` int(11) NOT NULL,
  `userID` int(20) NOT NULL,
  `gameID` int(20) NOT NULL,
  `rounds` int(20) NOT NULL,
  `hit` int(20) NOT NULL,
  `miss` int(20) NOT NULL,
  `quits` int(20) NOT NULL,
  `score` int(11) NOT NULL,
  `accuracy` double NOT NULL,
  `AvgSpeed` double NOT NULL,
  `playTotalTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `surveyanswer`
--

CREATE TABLE `surveyanswer` (
  `aID` int(11) NOT NULL,
  `qID` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `loginID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `surveyanswer`
--

INSERT INTO `surveyanswer` (`aID`, `qID`, `answer`, `userID`, `loginID`) VALUES
(3, 1, 4, 18, 9),
(4, 2, 2, 18, 9),
(5, 3, 1, 18, 9),
(6, 4, 5, 18, 9),
(7, 5, 1, 18, 9),
(8, 6, 4, 18, 9),
(9, 7, 5, 18, 9),
(10, 8, 1, 18, 9),
(11, 9, 5, 18, 9),
(12, 10, 1, 18, 9);

-- --------------------------------------------------------

--
-- Table structure for table `surveyquestion`
--

CREATE TABLE `surveyquestion` (
  `qID` int(11) NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `surveyquestion`
--

INSERT INTO `surveyquestion` (`qID`, `description`) VALUES
(1, 'Νομίζω ότι θα ήθελα να χρησιμοποιώ αυτά τα παιχνίδια συχνά'),
(2, 'Βρήκα αυτά τα παιχνίδια αδικαιολόγητα περίπλοκα'),
(3, 'Σκέφτηκα ότι αυτά τα παιχνίδια ήταν εύκολα στη χρήση'),
(4, 'Νομίζω ότι θα χρειαστώ βοήθεια από κάποιον ειδικό για να μπορέσω να χρησιμοποιήσω αυτά τα παιχνίδια'),
(5, 'Βρήκα τις διάφορες λειτουργίες σ’ αυτά τα παιχνίδια καλά ενσωματωμένες'),
(6, 'Σκέφτηκα ότι υπήρχε μεγάλη ασυνέπεια στη λειτουργία των παιχνιδιών'),
(7, 'Φαντάζομαι ότι οι περισσότεροι άνθρωποι θα μάθουν να χρησιμοποιούν αυτά τα παιχνίδια πολύ γρήγορα'),
(8, 'Βρήκα αυτά τα παιχνίδια πολύ δύσκολα/περίπλοκα στη χρήση'),
(9, 'Ένιωσα πολύ σίγουρος/η χρησιμοποιώντας αυτά τα παιχνίδια'),
(10, 'Χρειάστηκε να μάθω πολλά πράγματα πριν να μπορέσω να ξεκινήσω με αυτά τα παιχνίδια');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gender` enum('Άρεν','Θήλυ','','') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `city` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `birthdate` date NOT NULL,
  `education` enum('Καμία','Δημοτικό','Γυμνάσιο','Λύκειο','Πανεπιστήμιο') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `difficulty_level` enum('Όλα τα επίπεδα','Εύκολο','Μεσαίο','Προχωρημένο','Εύκολο έως Μεσαίο') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `gender`, `city`, `birthdate`, `education`, `difficulty_level`) VALUES
(16, 'aa', 'aa', 'Άρεν', 'Καρλόβασι Σάμου', '2001-01-01', 'Καμία', 'Εύκολο'),
(17, 'bb', 'bb', 'Θήλυ', 'Καρλόβασι Σάμου', '2001-01-01', 'Πανεπιστήμιο', 'Εύκολο'),
(18, 'cc', 'cc', 'Θήλυ', 'Καρλόβασι, Σάμος', '2005-05-05', 'Γυμνάσιο', 'Προχωρημένο');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`gameID`);

--
-- Indexes for table `gameevent`
--
ALTER TABLE `gameevent`
  ADD PRIMARY KEY (`gameEventID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`loginID`);

--
-- Indexes for table `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`statisticID`);

--
-- Indexes for table `surveyanswer`
--
ALTER TABLE `surveyanswer`
  ADD PRIMARY KEY (`aID`);

--
-- Indexes for table `surveyquestion`
--
ALTER TABLE `surveyquestion`
  ADD PRIMARY KEY (`qID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `gameID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gameevent`
--
ALTER TABLE `gameevent`
  MODIFY `gameEventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `loginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `statistic`
--
ALTER TABLE `statistic`
  MODIFY `statisticID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `surveyanswer`
--
ALTER TABLE `surveyanswer`
  MODIFY `aID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `surveyquestion`
--
ALTER TABLE `surveyquestion`
  MODIFY `qID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
