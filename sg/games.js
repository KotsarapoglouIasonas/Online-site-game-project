var canvas; 	// Ο καμβάς
var context;	// Για ζωγράφισμα στον καμβά
var w;			// Μήκος καμβά
var h;			// Ύψος καμβά
// Timestamps στην εκκίνηση και τερματισμό του παιχνιδιού
var startTimestamp;	
var endTimestamp;
var gameID;		// Παιχνίδι που παίζεται αυτήν την στιγμή
var totaltime;	// Συνολικός χρόνος παιχνιδιού, τον κρατάμε για το σύστημα πόντων
var playtime	// Χρόνος που έκανε ο χρήστης για όλους τους γύρους του παιχνιδιού
var time;		// Χρόνος παιχνιδιού
var firsttime;	// Αρχικά δίνεται χρόνος στον παίκτη να δει το νούμερο, μοτίβο, εικόνες κτλ. (3 ή 0 secs)
var timeid;		// Στοιχείο html στο οποίο καταγράφεται ο χρόνος
var dif_level;	// Επίπεδο δυσκολίας που έχει επιλεγεί από τον παίκτη
var hit;		// Επιτυχημένα παιχνίδια
var miss;		// Αποτυχημένα παιχνίδια
var quit;		// Παιχνίδια που δεν ολοκληρώθηκαν
var score;		// Συνολικό σκορ παιχνιδιού
var level;		// Επίπεδο
var turn=0;		// τρέχον γύρος παιχνιδιού
var gameplaying;// Το παιχνίδι τρέχει, αν ο χρήστης πατήσει επόμενο σημαίνει ότι το παράτησε
var timer;		// Βασικό χρονόμετρο παιχνιδιού
var firsttimer;	// Βοηθητικό χρονόμετρο για τον αρχικό χρόνο.
var drawtimer;	// Με το που ξεκινάει το βασικό χρονόμετρο ζωγραφίζονται συνεχώς όλα τα αντικείμενα του καμβά.
var objects = new Array();	// Αντικείμενα που υπάρχουν στην οθόνη 

var game;		// Στιγιμιότυπο παιχνιδιού
// Βασικό αντικείμενο παιχνιδιού
class Game{

	// Επόμενος γύρος παιχνιδιού, ανάλογα το παιχνίδι αλλάζει και η πίστα ή τερματίζει
	nextTurn(){
		turn++;
		if (dif_level=="Όλα τα επίπεδα"){
			if ((turn+1)%2==0){
				level++;
			}
			if (turn==6){
				return false;
			}
			return true;
		}
		else if (dif_level=="Εύκολο έως Μεσαίο"){
			if ((turn+1)%2==0){
				level++;
			}
			if (turn==4){
				return false;
			}
			return true;
		}
		else{
			if (turn==3){
				return false;
			}
				return true;
		}
	}
}
// Παιχνίδι "Εύρεση Μοτίβου"
class Game1 extends Game{
	// Κατασκευαστής
	constructor(){
		super();
		this.patterns = [
			[	// Εύκολο
				[true,false,false,false,false,false,false,false,true],
				[false,true,false,false,false,false,false,true,false],
				[false,false,false,true,false,true,false,false,false],
				[false,false,true,false,false,false,true,false,false]
			],
			[	// Μέτριο
				[true,false,false,false,true,false,false,false,true],
				[false,false,true,false,true,false,true,false,false],
				[false,true,false,false,true,false,false,true,false],
				[false,false,false,true,true,true,false,false,false],
				[true,false,false,false,true,false,true,false,false],
				[false,false,true,false,true,false,false,false,true]
			],
			[	// Δύσκολο
				[false,true,false,true,true,true,false,false,false],
				[false,false,false,true,true,true,false,true,false],
				[false,true,false,true,true,false,false,true,false],
				[false,true,false,false,true,true,false,true,false],
				[true,false,true,false,false,false,true,false,true]
			]
		];
		this.patternview = true;
	}
	// Εκκίνηση παιχνιδιού
	start(){
		var max = this.patterns[level-1].length;
		var min = 0;
		var index = Math.floor(Math.random() * (max - min) + min);
		this.pattern = this.patterns[level-1][index];
		var size = 60;
		var dist = 10;
		// Κεντράρουμε στη μέση τα ορθογώνια
		var x= (w - 3*(dist+size) - dist)/2;
		var y = 10;
		for(var i=0;i<this.pattern.length;i++){
			var r = new ClickableRectangle(x,y,size,size,this.pattern[i]);
			objects.push(r);
			if ((i+1)%3==0){
				y+=size+dist;
				x=(w - 3*(dist+size) - dist)/2;
			}
			else
				x+=size+dist;
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση ο παίκτης νικάει
	check(){
		var win = true;
		for(var i=0;i<this.pattern.length;i++){
			if (objects[i].isInPattern!=objects[i].selected){
				win = false;
				break;
			}
		}
		return win;
	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		this.patternview = false;
	}
	
}
// Παιχνίδι "Εύρεση Θέσης Αντικειμένου"
class Game2 extends Game{
	// Κατασκευαστής
	constructor(){
		super();
		// Εικόνες που θα εμφανιστούν
		this.images = ["images/bear.png","images/dog.png","images/goat.png","images/kangaroo.png",
				"images/leopard.png","images/lion.png","images/mouse.png",
				"images/owl.png","images/penguin.png","images/pig.png",
				"images/plesiosaur.png","images/rhino.png","images/rooster.png",
				"images/sheep.png"];
		// Όνομα εικόνας (για εμφάνιση μηνύματος)
		this.names = ["Βρες την αρκούδα","Βρες τον σκύλο","Βρες την κατσίκα","Βρες το καγκουρό",
				"Βρες την λεοπάρδαλη","Βρες το λιοντάρι","Βρες το ποντίκι",
				"Βρες την κουκουβάγια","Βρες τον πιγκουίνο","Βρες το γουρούνι",
				"Βρες την δεινόσαυρο","Βρες τον ρινόκερο","Βρες τον κόκορα",
				"Βρες το πρόβατο"];
	}
	start(){
		var max = this.images.length;
		var min = 0;
		var noofobjects = level+2;
		this.indexes = [];
		// Παράγουμε τόσους τυχαίους αριθμούς όσους απαιτεί η πίστα (3,4 ή 5)
		// Οι αριθμοί είναι διαφορετικοί για να μην έχουμε την ίδια εικόνα και 
		// αποθηκεύονται στον πίνακα indexes
		for(i=0;i<noofobjects;i++){
			var index = Math.floor(Math.random() * (max - min) + min);
			while (this.indexes.indexOf(index)!=-1){
				index = Math.floor(Math.random() * (max - min) + min);
			}
			this.indexes.push(index);
		}
		// Η εικόνα που θα αναζητήσουμε
		max = noofobjects;
		min = 0;
		this.imageindex = Math.floor(Math.random() * (max - min) + min);
		var size = 100;
		var dist = 10;
		// Κεντράρουμε στη μέση τις εικόνες
		var x= (w - 3*(dist+size) - dist)/2;
		var y = 10;
		for(var i=0;i<this.indexes.length;i++){
			var r = new ClickableImage(x,y,size,size,this.images[this.indexes[i]]);
			objects.push(r);
			if ((i+1)%3==0){
				y+=size+dist;
				x=(w - (noofobjects-3)*(dist+size) - dist)/2;
			}
			else
				x+=size+dist;
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση ο παίκτης νικάει
	check(){
		for(var i=0;i<objects.length-1;i++){
			objects[i].setVisible(true);
		}
		// Κερδίζει αν η εικόνα που αναζητούμε είναι η επιλεγμένη
		return objects[this.imageindex].selected;

	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		for(var i=0;i<objects.length;i++){
			objects[i].setVisible(false);
		}
		var l = new ClickableWord(150,222,200,30,this.names[this.indexes[this.imageindex]],false,false);
		objects.push(l);
	}
	
}
// Παιχνίδι "Βρες το Διαφορετικό"
class Game3 extends Game{
	// Κατασκευαστής
	constructor(){
		super();
		// Η τελευταία εικόνα είναι πάντα η διαφορετική (θα ανακατευτούν πριν την εμφάνιση)
		this.images = [
		[	// Εύκολο
			["images/1.png","images/2.png","images/4.png","images/5.png","images/a.png"], // Δεν είναι αριθμός
			["images/a.png","images/g.png","images/k.png","images/l.png","images/1.png"]  // Δεν είναι γράμμα
		],
		[	// Μέτριο
			["images/g.png","images/q.png","images/r.png","images/l.png","images/e.png"],	// Δεν είναι σύμφωνο
			["images/a.png","images/e.png","images/i.png","images/y.png","images/g.png"]	// Δεν είναι φωνήεν
		],  
		[	// Δύσκολο
			["images/1.png","images/3.png","images/5.png","images/9.png","images/4.png"],	// Δεν είναι περιττός
			["images/2.png","images/4.png","images/6.png","images/8.png","images/3.png"]	// Δεν είναι άρτιος
		]
		];
		// Δείχνει την σωστή απάντηση (πάντα τελευταία)
		this.different = [false,false,false,false,true];
	}
	start(){
		var max = this.images[level-1].length;
		var min = 0;
		var index = Math.floor(Math.random() * (max - min) + min);
		this.imgssrc = this.images[level-1][index];
		shuffleTwo(this.imgssrc,this.different);

		// Μέγεθος εικόνας
		var size = 100;
		// Πόσο απέχουν οι εικόνες μεταξύ τους
		var dist = 5;

		// Κεντράρουμε στη μέση τις εικόνες
		var x= (w - this.imgssrc.length*(dist+size) - dist)/2;
		var y=20;
		for(var i=0;i<this.imgssrc.length;i++){
			var l = new ClickableImage(x,y,size,size,this.imgssrc[i]);
			objects.push(l);
			x+=size+dist;
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση ο παίκτης νικάει
	check(){
		var win = true;
		for(var i=0;i<objects.length;i++){
			if (objects[i].selected!=this.different[i]){
				win = false;
				break;
			}
		}
		return win;
	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		// Δεν υπάρχει κάποια ενέργεια
	}
	
}
// Παιχνίδι "Γλώσσα"
class Game4 extends Game{
	// Κατασκευαστής
	constructor(){
		super();
		// Συνώνυμα και αντώνυμα. Πρώτη είναι η λέξη που ψάχνουμε και δεύτερη 
		// η σωστή από τις λέξεις (θα ανακατευτούνε στην συνέχεια)
		this.synonyms = [
			["ΑΒΑΤΟΣ","ΑΔΙΑΒΑΤΟΣ","ΒΑΤΟΣ","ΑΠΡΟΣΕΚΤΟΣ","ΥΠΟΦΕΡΤΟΣ","ΒΛΑΒΕΡΟΣ","ΒΟΛΙΚΟΣ"],
			["ΓΝΗΣΙΟΣ","ΑΛΗΘΙΝΟΣ","ΨΕΥΤΙΚΟΣ","ΣΤΑΣΙΜΟΣ","ΠΛΑΣΤΟΣ","ΡΗΧΟΣ","ΑΓΝΟΣ"],
			["ΑΚΡΙΒΟΣ","ΠΟΛΥΤΙΜΟΣ","ΚΟΝΤΟΣ","ΨΗΛΟΣ","ΠΛΟΥΣΙΟΣ","ΦΤΩΧΟΣ","ΟΜΟΡΦΟΣ"],
			["ΚΟΝΤΟΣ","ΜΙΚΡΟΣΩΜΟΣ","ΑΣΧΗΜΟΣ","ΟΜΟΡΦΟΣ","ΠΛΟΥΣΙΟΣ","ΦΤΩΧΟΣ","ΑΚΡΙΒΟΣ"],

		];
		this.antonyms = [
			["ΑΒΑΤΟΣ","ΒΑΤΟΣ","ΑΠΡΟΣΕΚΤΟΣ","ΑΔΙΑΒΑΤΟΣ","ΥΠΟΦΕΡΤΟΣ","ΒΛΑΒΕΡΟΣ","ΒΟΛΙΚΟΣ"],
			["ΓΝΗΣΙΟΣ","ΠΛΑΣΤΟΣ","ΨΕΥΤΙΚΟΣ","ΣΤΑΣΙΜΟΣ","ΑΛΗΘΙΝΟΣ","ΡΗΧΟΣ","ΑΓΝΟΣ"],
			["ΨΗΛΟΣ","ΚΟΝΤΟΣ","ΑΣΧΗΜΟΣ","ΟΜΟΡΦΟΣ","ΠΛΟΥΣΙΟΣ","ΦΤΩΧΟΣ","ΑΚΡΙΒΟΣ"],
			["ΚΟΝΤΟΣ","ΨΗΛΟΣ","ΑΣΧΗΜΟΣ","ΟΜΟΡΦΟΣ","ΠΛΟΥΣΙΟΣ","ΦΤΩΧΟΣ","ΑΚΡΙΒΟΣ"],
			["ΑΣΧΗΜΟΣ","ΟΜΟΡΦΟΣ","ΚΟΝΤΟΣ","ΨΗΛΟΣ","ΠΛΟΥΣΙΟΣ","ΦΤΩΧΟΣ","ΑΚΡΙΒΟΣ"],
		];
	}
	start(){
		var max;
		var min;
		var index,index2;
		var phrase;

		var height;
		var width;
		var distx;
		var disty;

		var x;
		var y;
		var l;
		if (level==1 || level==3){
			max = this.synonyms.length;
			min = 0;
			index = Math.floor(Math.random() * (max - min) + min);
			// Η πρώτη λέξη που ψάχνουμε και η σωστή απάντηση
			this.firstword =  this.synonyms[index][0];
			this.firstanswer = this.synonyms[index][1];
			this.firstwords = this.synonyms[index].slice(1);
			phrase = "Βρες το συνώνυμο της λέξης "+this.firstword;
		}
		else{
			max = this.antonyms.length;
			min = 0;
			index = Math.floor(Math.random() * (max - min) + min);
			// Η πρώτη λέξη που ψάχνουμε και η σωστή απάντηση
			this.firstword =  this.antonyms[index][0];
			this.firstanswer = this.antonyms[index][1];
			this.firstwords = this.antonyms[index].slice(1);
			phrase = "Βρες το αντώνυμο της λέξης "+this.firstword;
		}
		shuffle(this.firstwords);
		// Ύψος λέξης
		height = 30;
		// Πλάτος λέξης
		width = 115;
		// Πόσο απέχουν Οι λέξεις μεταξύ τους
		distx = 20;
		disty = 5;
		
		x= (w - 300)/2;
		y=10;
		l = new ClickableWord(x,y,300,height,phrase,true,false);
		objects.push(l);
		y+=height+disty;
		// Κεντράρουμε στη μέση τις λέξεις
		x= (w - this.firstwords.length/2*(distx+width) - distx)/2;
		for(var i=0;i<this.firstwords.length;i++){
			l = new ClickableWord(x,y,width,height,this.firstwords[i],true,true);
			objects.push(l);
			if (i==2){
				x= (w - this.firstwords.length/2*(distx+width) - distx)/2;
				y+=height+disty;
			}
			else{
				x+=width+distx;
			}
		}

		y+=height+disty;


		if (level==1){
			max = this.synonyms.length;
			min = 0;
			index2 = Math.floor(Math.random() * (max - min) + min);
			while(index==index2){
				index2 = Math.floor(Math.random() * (max - min) + min);
			}
			// Η δεύτερη λέξη που ψάχνουμε και η σωστή απάντηση
			this.secondword =  this.synonyms[index2][0];
			this.secondanswer = this.synonyms[index2][1];
			this.secondwords = this.synonyms[index2].slice(1);
			phrase = "Βρες το συνώνυμο της λέξης "+this.secondword;
		}
		else{
			max = this.antonyms.length;
			min = 0;
			index2 = Math.floor(Math.random() * (max - min) + min);
			while(level==2 && index==index2){
				index2 = Math.floor(Math.random() * (max - min) + min);
			}
			// Η δεύτερη λέξη που ψάχνουμε και η σωστή απάντηση
			this.secondword =  this.antonyms[index2][0];
			this.secondanswer = this.antonyms[index2][1];
			this.secondwords = this.antonyms[index2].slice(1);
			phrase = "Βρες το αντώνυμο της λέξης "+this.secondword;
		}
		shuffle(this.secondwords);
		
		x= (w - 300)/2;
		l = new ClickableWord(x,y,300,height,phrase,false,false);
		objects.push(l);
		y+=height+disty;
		// Κεντράρουμε στη μέση τις λέξεις
		x= (w - this.secondwords.length/2*(distx+width) - distx)/2;
		for(var i=0;i<this.secondwords.length;i++){
			l = new ClickableWord(x,y,width,height,this.secondwords[i],false,true);
			objects.push(l);
			if (i==2){
				x= (w - this.secondwords.length/2*(distx+width) - distx)/2;
				y+=height+disty;
			}
			else{
				x+=width+distx;
			}
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση (επιλεγμένες λέξεις) ο παίκτης νικάει
	check(){
		var win = false;
		for(var i=0;i<objects.length/2;i++){
			if (objects[i].selected){
				if (objects[i].word==this.firstanswer){
					win = true;
					break;
				}
				else
					return false;
			}
		}
		if (win==false)
			return false;
		for(var i=objects.length/2;i<objects.length;i++){
			if (objects[i].selected){
				if (objects[i].word==this.secondanswer){
					return true;
				}
				else
					return false;
			}
		}

		return false;
	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		// Δεν υπάρχει κάποια ενέργεια
	}
	
}
// Παιχνίδι "Λογική Σειρά"
class Game5 extends Game{
	// Κατασκευαστής
	constructor(){
		super();
		// Τα πρώτα δύο είναι για να βρει ο παίκτης την ακολουθία
		// το τρίτο είναι το σωστό και το τέταρτο το λάθος
		this.patterns = [
			[ // Εύκολο
				[
				[false,false,false,false,false,false,true,false,false],
				[false,false,false,false,true,false,false,false,false],
				[false,false,true,false,false,false,false,false,false],
				[true,false,false,false,false,false,false,false,false]
				],
				[
				[false,false,true,false,false,false,false,false,false],
				[false,false,false,false,true,false,false,false,false],
				[false,false,false,false,false,false,true,false,false],
				[false,false,false,false,false,false,false,false,true]
				],
				[
				[false,true,false,false,false,false,false,false,false],
				[false,false,false,false,true,false,false,false,false],
				[false,false,false,false,false,false,false,true,false],
				[false,false,false,false,false,false,false,false,true]
				],
				[
				[true,false,false,false,false,false,false,false,false],
				[false,false,false,true,false,false,false,false,false],
				[false,false,false,false,false,false,true,false,false],
				[false,false,false,false,false,false,false,false,true]
				]
			],
			[ // Μέτριο
				[
				[true,true,true,false,false,false,false,false,false],
				[false,false,false,true,true,true,false,false,false],
				[false,false,false,false,false,false,true,true,true],
				[true,false,false,true,false,false,true,false,false]
				],
				[
				[true,true,true,false,false,false,false,false,false],
				[true,false,false,false,true,false,false,false,true],
				[true,false,false,true,false,false,true,false,false],
				[false,false,true,false,false,true,false,false,true]
				]
				,
				[
				[true,false,false,true,false,false,true,false,false],
				[false,true,false,false,true,false,false,true,false],
				[false,false,true,false,false,true,false,false,true],
				[true,false,false,true,false,false,true,false,false]
				]
			],
			[ // Δύσκολο			
				[
				[false,false,true,false,false,false,true,false,false],
				[false,false,false,true,false,true,false,false,false],
				[true,false,false,false,false,false,false,false,true],
				[false,false,true,false,false,false,true,false,false]
				],
				[
				[true,false,false,false,false,false,false,false,true],
				[false,false,false,true,false,true,false,false,false],
				[true,false,false,false,false,false,false,false,true],
				[false,false,true,false,false,false,true,false,false]
				],
				[
				[true,false,false,false,false,false,false,false,false],
				[true,false,false,false,true,false,false,false,false],
				[true,false,false,false,true,false,false,false,true],
				[true,false,false,false,false,false,false,false,false]
				],
			]

		];
	}
	start(){
		var max = this.patterns[level-1].length;
		var min = 0;
		var index = Math.floor(Math.random() * (max - min) + min);
		var pattern = this.patterns[level-1][index];
		var size = 100;
		var dist = 10;
		// Κεντράρουμε στη μέση τα τετράγωνα
		var x= (w - 2*(dist+size) - dist)/2;
		var y = 10;
		// Τα πρώτα δύο δεν κλικάρονται
		for(var i=0;i<2;i++){
			
			var r = new ClickableSquare(x,y,size,size,pattern[i],false);
			objects.push(r);
			x+=size+dist;
		}
		// τα τελευταία δύο είναι για επιλογή του παίκτη
		y+=size+dist*3;
		x= (w - 2*(dist+size) - dist)/2;
		max = 2;
		min = 0;
		// Ποιο από τα δύο θα μπει πρώτο
		var which = Math.floor(Math.random() * (max - min) + min);
		var r;
		if (which==0){
			x= (w - 2*(dist+size) - dist)/2;
			r = new ClickableSquare(x,y,size,size,pattern[2],true);
			objects.push(r);
			x+=size+dist;
			r = new ClickableSquare(x,y,size,size,pattern[3],true);
			objects.push(r);
		}
		else{
			x= (w - 2*(dist+size) - dist)/2+size+dist;
			r = new ClickableSquare(x,y,size,size,pattern[2],true);
			objects.push(r);
			x= (w - 2*(dist+size) - dist)/2;
			r = new ClickableSquare(x,y,size,size,pattern[3],true);
			objects.push(r);
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση ο παίκτης νικάει
	check(){
		return objects[2].selected;
	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		// Δεν υπάρχει κάποια ενέργεια
	}
	// Επόμενος γύρος παιχνιδιού, ανάλογα το παιχνίδι αλλάζει και η πίστα ή τερματίζει
	nextTurn(){
		turn++;
		if (dif_level=="Όλα τα επίπεδα"){
			level++;
			if (turn==3){
				return false;
			}
			return true;
		}
		else if (dif_level=="Εύκολο έως Μεσαίο"){
				level++;
			if (turn==2){
				return false;
			}
			return true;
		}
		else{
			if (turn==2){
				return false;
			}
			return true;
		}
	}
}
// Παιχνίδι "Βρες τη λέξη"
class Game6 extends Game{
	constructor(){
		super();
		this.words = [
				["ΕΝΑΣ","ΕΠΤΑ","ΔΕΚΑ","ΟΚΤΩ","ΤΡΙΑ"],
				["ΠΕΝΤΕ","ΕΝΝΙΑ","ΜΗΔΕΝ"],
				["ΚΙΝΗΤΟ","ΓΥΑΛΙΑ","ΜΟΛΥΒΙ"]
		];	// Λέξεις για εύρεση από τον χρήστη
	}
	// Εκκίνηση παιχνιδιού
	start(){
		var max = this.words.length;
		var min = 0;
		var index = Math.floor(Math.random() * (max - min) + min);
		this.word = this.words[level-1][index];
		this.shuffledword = this.word.split("");
		shuffle(this.shuffledword);

		// Μέγεθος γράμματος
		var size = 70;
		// Πόσο απέχουν τα γράμματα μεταξύ τους
		var dist = 5;

		// Κεντράρουμε στη μέση τα γράμματα
		var x= (w - this.shuffledword.length*(dist+size) - dist)/2;
		var y=50;
		for(var i=0;i<this.shuffledword.length;i++){
			var l = new ClickableLetter(x,y,size,size,this.shuffledword[i]);
			objects.push(l);
			x+=size+dist;
		}
	}
	// έλεγχος αν με την τρέχουσα κατάσταση ο παίκτης νικάει
	check(){
		var win = true;
		for(var i=0;i<this.word.length;i++){
			if (this.word[i]!=objects[i].letter){
				win = false;
				break;
			}
		}
		return win;
	}
	// Ενέργειες μετά τον αρχικό χρόνο
	firstTimerStopped(){
		// Δεν υπάρχει κάποια ενέργεια
	}
	// Επόμενος γύρος παιχνιδιού, ανάλογα το παιχνίδι αλλάζει και η πίστα ή τερματίζει
	nextTurn(){
		turn++;
		if (dif_level=="Όλα τα επίπεδα"){
			level++;
			if (turn==3){
				return false;
			}
			return true;
		}
		else if (dif_level=="Εύκολο έως Μεσαίο"){
				level++;
			if (turn==2){
				return false;
			}
			return true;
		}
		else{
			if (turn==2){
				return false;
			}
			return true;
		}
	}
}
// Αντικείμενα τα οποία μπορεί κανείς να επιλέξει (όλα τα αντικείμενα κληρονομούν από αυτό)
class ClickableObject{
	// Απαιτείται η θέση τους (x,y) και το πλάτος και ύψος. 
	// Αρχικά κάθε αντικείμενο είναι μη επιλεγμένο.
	// Κάποια αντικείμενα δεν μπορούν να επιλεγούν (clickable = false)
	constructor(x,y,width,height,clickable){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clickable = clickable;
		this.selected = false;
	}
	isClicked(mousex,mousey){
		return this.clickable && mousex>this.x && mousex<this.x+this.width && mousey>this.y && mousey<this.y+this.height; 
	}
}
// Εικόνες που μπορούν να γίνουν click. Επιπλέον απαιτούν το src της εικόνας
class ClickableImage extends ClickableObject{
	constructor(x,y,width,height,src){
		super(x,y,width,height,true);
		this.src = src;
		this.visible = true;
	}
	draw(){
		var img = new Image();
		img.src = this.src;
		if (this.visible)
			context.drawImage(img, this.x, this.y, this.width, this.height);
		if (this.selected)
			context.strokeStyle = "red";
		else
			context.strokeStyle = "gray";
		context.strokeRect(this.x, this.y, this.width, this.height);
	}
	// Γίνεται click σε κάποια εικόνα. 
	// Όλες οι υπόλοιπες εικόνες αποεπιλέγονται
	// Επιλέγεται η συγκεκριμένη
	clicked(){
		objects.forEach(function(element) {
			element.selected = false;
		        
	    	});
		this.selected = true;
	}
	// Θέτει το αν η εικόνα θα φαίνεται ή όχι 
	// (για το παιχνίδι "Εύρεση ΄θέσης αντικειμένου")
	setVisible(visible){
		this.visible = visible;
	}
}
// Γράμματα που μπορούν να γίνουν click. Επιπλέον απαιτούν το γράμμα
class ClickableLetter extends ClickableObject{
	constructor(x,y,width,height,letter){
		super(x,y,width,height,true);
		this.letter = letter;
	}
	draw(){
		context.beginPath();
		context.lineWidth = "2";
		context.strokeStyle = "red";
		context.rect(this.x, this.y, this.width, this.height); 
		context.stroke();
		context.beginPath();
		if (this.selected)
			context.fillStyle = "red";
		else
			context.fillStyle = "orange";
		context.rect(this.x+2, this.y+2, this.width-4, this.height-4); 
		context.fill();
		context.fillStyle = "white";
		context.font = "25px Georgia";
		context.fillText(this.letter, this.x+30, this.y+this.height-30);
	}
	// Γίνεται click σε κάποιο γράμμα. 
	// 1. Αν είναι επιλεγμένο αποεπιλέγεται
	// 2.1 Αν δεν είναι επιλεγμένο κανένα άλλο απλά επιλέγεται
	// 2.2 Αν υπάρχει άλλο επιλεγμένο γίνεται αντιμετάθεση των γραμμάτων
	clicked(){
		var selectedelement;
		if (this.selected==true)
			this.selected=false;
		else{
			selectedelement="none";
			objects.forEach(function(element) {
				if (element.selected){
		    		selectedelement = element;
				}
		        
	    	});

		    if (selectedelement=="none")
	    		this.selected = true;
	    	else{
	    		var letter = this.letter;
	    		this.letter = selectedelement.letter;
	    		selectedelement.letter = letter;
	    		this.selected = false;
	    		selectedelement.selected = false;
			}
		}
    }
}
// Ορθογώνια που μπορούν να γίνουν click
class ClickableRectangle extends ClickableObject{
	constructor(x,y,width,height,isInPattern){
		super(x,y,width,height,true);
		this.isInPattern = isInPattern;
	}
	draw(){
		context.beginPath();
		context.lineWidth = "2";
		context.strokeStyle = "red";
		context.rect(this.x, this.y, this.width, this.height); 
		context.stroke();
		context.beginPath();
		if ((game.patternview && this.isInPattern)|| this.selected)
			context.fillStyle = "red";
		else
			context.fillStyle = "orange";
		context.rect(this.x+2, this.y+2, this.width-4, this.height-4); 
		context.fill();
	}
	// Γίνεται click σε κάποιο ορθογώνιο. 
	// Αν είναι επιλεγμένο αποεπιλέγεται, αλλιώς επιλέγεται
	clicked(){
		this.selected = !this.selected;
	}
}
// Τετράγωνα (με 9 μικρά τετραγωνάκια) που μπορούν να γίνουν click
class ClickableSquare  extends ClickableObject{
	constructor(x,y,width,height,pattern,clickable){
		super(x,y,width,height,clickable);
		this.pattern = pattern;
	}
	draw(){
		context.beginPath();
		context.lineWidth = "2";
		if (this.selected)
			context.strokeStyle = "blue";
		else
			context.strokeStyle = "orange";
		context.rect(this.x, this.y, this.width, this.height); 
		context.stroke();
		
		for(var i=0;i<this.pattern.length;i++){
			context.beginPath();
			context.strokeStyle = "red";
			if (this.pattern[i])
				context.fillStyle = "blue";
			else
				context.fillStyle = "orange";
			context.rect((this.x+2)+(this.width-4)/3*(i%3), (this.y+2)+((this.height-4)/3)*Math.floor(i/3), (this.width-4)/3, (this.height-4)/3); 
			context.fill();
			context.stroke();
		}
		
		//context.rect(this.x+2, this.y+2, this.width-4, this.height-4);
	}
	// Γίνεται click σε κάποιο τετράγωνο. 
	// Όλα τα υπόλοιπα τετράγωνα αποεπιλέγονται
	// Επιλέγεται το συγκεκριμένο
	clicked(){
		objects.forEach(function(element) {
			element.selected = false;
		        
	    	});
		this.selected = true;
	}
}
// Λέξεις που μπορούν να γίνουν click
class ClickableWord extends ClickableObject{
	constructor(x,y,width,height,word,firstword,clickable){
		super(x,y,width,height,clickable);
		this.word = word;
		this.firstword = firstword;
	}
	draw(){

		context.beginPath();
		context.fillStyle = "white";
		context.lineWidth = "2";
		if (this.selected)
			context.strokeStyle = "red";
		else
			context.strokeStyle = "gray";
		context.strokeRect(this.x+2, this.y+2, this.width-4, this.height-4); 
		context.fillStyle = "black";
		context.font = "15px Georgia";
		context.fillText(this.word, this.x+10, this.y+this.height-10);
	}
	// Γίνεται click σε κάποια λέξη. 
	// Όλες οι υπόλοιπες αποεπιλέγονται και αυτή που έγινε click επιλέγεται
	clicked(){
		if (this.firstword)
			objects.forEach(function(element) {
				if (element.firstword==true)
					element.selected = false;
			        
		    	});
		else
			objects.forEach(function(element) {
				if (element.firstword==false)
					element.selected = false;
			        
		    	});
		this.selected = true;
	}
}
// Εκκίνηση παιχνιδιού (ο χρήστης πάτησε έναρξη ή επόμενο)
function startGame(game_ID,gametime, gamedif_level){
	// Σε περίπτωση που τα χρονόμετρα τρέχουν τα σταματά
	window.clearInterval(firsttimer);
	window.clearInterval(timer);
	// Πρώτος γύρος παιχνιδιού
	if (turn==0){
		
		document.getElementById("nextbutton").innerHTML="Επόμενο";
		setupGame(gametime, gamedif_level);
	}
	else{
		// Πάτησε το επόμενο ενώ το παιχνίδι έτρεχε, ο χρήστης "τα παράτησε"
		if (gameplaying==true){
			quit++;
		}
		gameplaying = true;
		window.clearInterval(firsttimer);
			window.clearInterval(timer);
		if (!game.nextTurn()){
			document.getElementById("nextbutton").innerHTML="Τέλος";
			document.getElementById("nextbutton").onclick=endGame;
		}
	}
	gameID = game_ID;
	totaltime = gametime;
	time = gametime;
	// Σε κάποια παιχνίδια υπάρχει ένας αρχικός χρόνος 
	// (που απεικονίζεται το μοτίβο ή φαίνονται τα αντικείμενα) 
	// και μετά αρχίζει το κυρίως παιχνίδι
	if (gameID==1 || gameID==2){
		firsttime = 3;
	}
	else{
		firsttime = 0;
	}
	startFirstTimer();
	// Κλήση αντίστοιχης μεθόδου εκκίνησης του παιχνιδιού ανάλογα το id
	// αφού δημιουργηθεί το αντίστοιχο αντικείμενο
	eval('game = new Game'+gameID+'()');
	objects = [];
	game.start();
}
// Αρχικοποίηση παιχνιδιού (ισχύει για όλα τα παιχνίδια)
function setupGame(gametime, gamedif_level){
	
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	
	dif_level = gamedif_level;
	if (dif_level=="Όλα τα επίπεδα" || dif_level=="Εύκολο" || dif_level=="Εύκολο έως Μεσαίο")
		level=1;
	else if (dif_level=="Μεσαίο")
		level=2;
	else
		level=3;
	turn=1;
	hit=0;
	miss=0;
	quit=0;
	score=0;
	playtime=0;
	gameplaying=true;
	startTimestamp=Date.now();
	drawtimer = window.setInterval(draw,10);
}
// Ανανεώνεται ο καμβάς, ξαναζωγραφίζονται όλα τα αντικείμενα
// καθώς και οι ετικέτες που δείχνουν σκορ Σωστά και λάθη
function draw(){
	context.clearRect(0, 0, w, h);
	context.fillStyle = "black";
	context.font = "15px Georgia";

	context.fillText("Γύρος:", w-100, h-110);
	context.fillText(turn, w-40, h-110);
	context.fillText("Επίπεδο:", w-100, h-90);
	context.fillText(level, w-40, h-90);
	context.fillText("Σκορ:", w-100, h-70);
	// Το σκορ με δύο ψηφία στο δεκαδικό μέρος όταν χρειάζεται
	context.fillText(Math.round(score * 100) / 100, w-40, h-70);
	context.fillText("Σωστά:", w-100, h-50);
	context.fillText(hit, w-40, h-50);
	context.fillText("Λάθη:", w-100, h-30);
	context.fillText(miss, w-40, h-30);
	context.fillText("Εγκατ.:", w-100, h-10);
	context.fillText(quit, w-40, h-10);
	objects.forEach(drawObject);

}
// Ένα αντικείμενο ζωγραφίζεται, καλείται η αντίστοιχή του ιδιότητα
function drawObject(item,index){
	item.draw();
}
// Εμφανίζει τα δευτερόλεπτα που απομένουν σε μορφή mm:ss, π.χ. 03:07
function setTimer(time,id){
	timeid = id;
	document.getElementById(timeid).innerHTML = (parseInt(time/60)<10?"0"+parseInt(time/60):parseInt(time/60))+":"+(time%60<10?"0"+time%60:time%60);
}
// Εκκίνηση βοηθητικού χρονομέτρου παιχνιδιού
function startFirstTimer(){
	firsttimer = window.setInterval(firstCountDown,1000);
}
// Τερματισμός βοηθητικού χρονομέτρου παιχνιδιού
function stopFirstTimer(){
	window.clearInterval(firsttimer);
}
// Αντίστροφη μέτρηση βοηθητικού χρονομέτρου
function firstCountDown(){
	firsttime--;
	if (firsttime<0){
		stopFirstTimer();
		startTimer();
	}
}
// Εκκίνηση βασικού χρονομέτρου παιχνιδιού, ξεκινά να "ακούει" και για clicks
function startTimer(){
	game.firstTimerStopped();
	
	timer = window.setInterval(countDown,1000);
	canvas.addEventListener('click', clickOnCanvas);
}
// Ο χρήστης έκανε click στον καμβά, όλα τα αντικείμενα (που έχουν οριστεί ως
// clickable ελέγχονται αν έγινε Click πάνω τους)
function clickOnCanvas(event){
	var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;

    // έλεγχος κάθε αντικειμένου στην λίστα αντικειμένου 
    // αν το σημείο του καμβά που έγινε click ανήκει στο αντικείμενο
    // κλήση της κατάλληλης μεθόδου
    objects.forEach(function(element) {
    	if (element.isClicked(x,y)){
            element.clicked();
        }
    });
}
// Τερματισμός βασικού χρονομέτρου παιχνιδιού. Σταματα να "ακούει" για clicks
function stopTimer() {
	window.clearInterval(timer);
	canvas.removeEventListener('click', clickOnCanvas);
}
// Αντίστροφη μέτρηση
function countDown(){
	time--;
	setTimer(time,timeid);
	if (time<0){
		stopTimer();
		alert("Τέλος Χρόνου");
		playtime +=totaltime-time;
		miss++;
		gameplaying=false;
		setTimer(0 ,timeid);
	}
}
// Ανακατεύει τον πίνακα που τον δίνουμε ως είσοδο, παράδειγμα γράμματα μίας λέξης
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Ανακατεύει δύο "παράλληλους πίνακες που δίνουμε ως είσοδο,
function shuffleTwo(array1,array2) {
  for (var i = array1.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array1[i], array1[j]] = [array1[j], array1[i]];
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
}
// Καλείται από το αντίστοιχο κουμπί ελέγχου για να δει ο χρήστης
// αν έχασε ή κέρδισε.
function check(){
	if (gameplaying){
		stopTimer();
		if(game.check()){
			playtime +=totaltime-time;
			hit++;
			score+=Math.pow(2,level-1)*10*(1-((totaltime-time)/time))
			alert("Σωστά!!!");
		}
		else{
			playtime +=totaltime-time;
			miss++;
			alert("Λάθος.");
		}
	}
	gameplaying=false;
}
// Το παιχνίδι τελειώνει. Στατιστικά στέλνονται στη βάση
function endGame(){
	// Πάτησε το τέλος ενώ το παιχνίδι έτρεχε, ο χρήστης "τα παράτησε"
	if (gameplaying==true){
		playtime +=totaltime-time;
		quit++;
	}
	// Μέσος χρόνος ολοκλήρωσης με δύο δεκαδικά ψηφία
	var avgspeed=Math.round(playtime/turn * 100) / 100;
	// Το σκορ με δύο ψηφία στο δεκαδικό μέρος όταν χρειάζεται
	s = Math.round(score * 100) / 100;

	endTimestamp=Date.now();
	window.location.href = 'gameend.php?gameID='+gameID+'&hit='+hit+'&miss='+miss+
			'&quit='+quit+'&score='+s+'&avgspeed='+avgspeed+
			'&playtime='+playtime+'&level='+dif_level+
			'&startTimestamp='+startTimestamp+
			'&endTimestamp='+endTimestamp+'&turn='+turn;
}