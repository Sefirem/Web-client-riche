var nbcar = 0;
var maj = 0;
var min = 0;
var chiffre = 0;
var autre = 0;

var age = document.getElementById("age");
var identifiant = document.getElementById("identifiant");
var mdp = document.getElementById("mdp");
var vmdp = document.getElementById("vmdp");
var cgu = document.getElementById("cgu");

age.addEventListener(keypress, verifAge());
identifiant.addEventListener(keypress, verifId());
mdp.addEventListener(keypress, verifMdp());

function verifId()
{
    var regexp = /[A-Z]/gi;
    var tab = identifiant.value.match(regexp);

    if (identifiant.value.length < 1 || identifiant.value.length > 12)
    {
        color(identifiant, true);
    } else {
        var temp = tab === null ? 0 : tab.length;
        if (temp !== identifiant.value.length) {
            color(identifiant, true);
        } else {
            color(identifiant, false);
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

function verifAge()
{
    var regexp = /[A-Z]/gi;
    var tab = age.value.match(regexp);

    if (age.value < 18 || tab !== null || age.value > 150)
    {
        color(age, true);
    } else {
        color(age, false);
    }
}

function verifMdp()
{
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
}

function verifVmdp() {

}

function avancement(val) {
    var ava = document.getElementById("avancement");
    if ((ava.value + val) <= ava.max && (ava.value + val) >= 0)
    {
        ava.value += val;
    }
    var prc = document.getElementById("pourcentage");
    prc.innerHTML = ava.value + "%";
}

