//Variable de verification mot de passe
var nbcar = 0;
var maj = 0;
var min = 0;
var chiffre = 0;
var autre = 0;

//Variable de verification des champs
var ageIsCorrect = false;
var idIsCorrect = false;
var mdpIsCorrect = false;
var vmdpIsCorrect = false;

//Récupération des elements 
var age = document.getElementById("age");
var identifiant = document.getElementById("identifiant");
var mdp = document.getElementById("mdp");
var vmdp = document.getElementById("vmdp");
var cgu = document.getElementById("cgu");
var soumettre = document.getElementById("soumettre");
var ava = document.getElementById("avancement");

//disable le bouton
soumettre.disabled = true;

//Ajout des évènement a chque champs
age.addEventListener('keyup', verifAge);
identifiant.addEventListener('keyup', verifId);
mdp.addEventListener('keyup', verifMdp);
vmdp.addEventListener('keyup', verifVmdp);
cgu.addEventListener('click', vcgu);

function verifId(){
    var regexp = /[A-Z]/gi;
    var tab = identifiant.value.match(regexp);

    if (identifiant.value.length < 1 || identifiant.value.length > 12)
    {
        color(identifiant, true);
		idIsCorrect = false;
		enableSoumettre();
    } else {
        var temp = tab === null ? 0 : tab.length;
        if (temp !== identifiant.value.length) {
            color(identifiant, true);
			idIsCorrect = false;
			enableSoumettre();
        } else {
            color(identifiant, false);
			idIsCorrect = true;
			enableSoumettre();
        }
    }
}

function color(champ, error) {

    if (error) {
        champ.style.backgroundColor = '#ff0000';
    } else {
        champ.style.backgroundColor = '#00ff00';
    }
}

function verifAge() {
    var regexp = /[A-Z]/gi;
    var tab = age.value.match(regexp);

    if (age.value < 18 || tab !== null || age.value > 150)
    {
        color(age, true);
		ageIsCorrect = false;
		enableSoumettre();
    } else {
        color(age, false);
		ageIsCorrect = true;
        enableSoumettre();
    }
}

function verifMdp() {
    var regexp = /[A-Z]/g;
    var tab = mdp.value.match(regexp);

    var regexp = /[a-z]/g;
    var tab1 = mdp.value.match(regexp);

    var regexp = /[0-9]/g;
    var tab2 = mdp.value.match(regexp);

    if (mdp.value.length >= 8 && nbcar === 0)
    {
        avancement(20);
        nbcar = 1;
    }
    else if (mdp.value.length < 8 && nbcar === 1) {
        avancement(-20);
        nbcar = 0;
    }

    if (maj === 0 && tab !== null)
    {
        avancement(20);
        maj = 1;
    }
    else if (tab === null && maj === 1) {
        avancement(-20);
        maj = 0;
    }

    if (min === 0 && tab1 !== null)
    {
        avancement(20);
        min = 1;
    }
    else if (tab1 === null && min === 1) {
        avancement(-20);
        min = 0;
    }

    if (chiffre === 0 && tab2 !== null)
    {
        avancement(20);
        chiffre = 1;
    }
    else if (tab2 === null && chiffre === 1) {
        avancement(-20);
        chiffre = 0;
    }

    var temp = tab !== null ? tab.length : 0;
    temp = tab1 !== null ? tab1.length + temp : temp;
    temp = tab2 !== null ? tab2.length + temp : temp;
    if (temp !== mdp.value.length && autre === 0)
    {
        avancement(20);
        autre = 1;
    } else if (temp === mdp.value.length && autre === 1) {
        avancement(-20);
        autre = 0;
    }
    
    if(ava.value === 100) {
        color(mdp, false);
		mdpIsCorrect = true;
    } else if(ava.value !== 100) {
        color(mdp, true);
		mdpIsCorrect = false;
    }
	verifVmdp();
	enableSoumettre();
}

function verifVmdp() {
    if (vmdp.value !== mdp.value) {
        color(vmdp, true);
		vmdpIsCorrect = false;
		enableSoumettre();
    } else {
        color(vmdp, false);
		vmdpIsCorrect = true;
        enableSoumettre();
    }
}

function avancement(val) {
    
    if ((ava.value + val) <= ava.max && (ava.value + val) >= 0)
    {
        ava.value += val;
    }
    var prc = document.getElementById("pourcentage");
    prc.innerHTML = ava.value + "%";
}

function vcgu() {
	enableSoumettre();
}

function enableSoumettre() {
    if (cgu.checked && ageIsCorrect && idIsCorrect && mdpIsCorrect && vmdpIsCorrect) {
        soumettre.disabled = false;
    } else {
        soumettre.disabled = true;
    }	
}