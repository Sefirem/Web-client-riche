var btnplus = document.getElementById("plus");
btnplus.addEventListener('click', bPlus);

setHeure();
function setHeure() {
    var heure = new Date();
	var min = heure.getMinutes();
	if(min < 10)
	{
		min = '0' + min; 
	}
	var sec = heure.getSeconds();
	if(sec < 10)
	{
		sec = '0' + sec; 
	}
    document.getElementById("heure").innerHTML = heure.getHours() + ':' + min + ':' + sec;
    checkReveil(heure);
}
setInterval(function () {
    setHeure();
}, 1000);

function bPlus() {
    var div = document.getElementById("event");
    var ligne = document.createElement("div");
    var check = document.createElement("input");
    var heure = document.createElement("input");
    var minute = document.createElement("input");
    var champ = document.createElement("input");
    var choix = document.createElement("select");
    var s1 = document.createElement("option");
    var s2 = document.createElement("option");
    var s3 = document.createElement("option");
    var moin = document.createElement("button");

    check.setAttribute("type", "checkBox");
    check.setAttribute("class", "check");

    champ.setAttribute("class", "title");

    heure.setAttribute("type", "number");
    heure.setAttribute("min", "0");
    heure.setAttribute("max", "23");
    heure.setAttribute("value", "0");
    heure.setAttribute("class", "h");

    minute.setAttribute("type", "number");
    minute.setAttribute("min", "0");
    minute.setAttribute("max", "59");
    minute.setAttribute("value", "0");
    minute.setAttribute("class", "min");

    s1.setAttribute("value", "son1");
    s1.appendChild(document.createTextNode("son 1"));
    s2.setAttribute("value", "son2");
    s2.appendChild(document.createTextNode("son 2"));
    s3.setAttribute("value", "son3");
    s3.appendChild(document.createTextNode("son 3"));

    moin.appendChild(document.createTextNode("-"));
    moin.setAttribute("class", "moin");

    check.addEventListener('click', function (evt) {
        var ch = evt.target;
        if (ch.checked)
        {
            var divParent = ch.parentNode;
            var h = divParent.getElementsByClassName("h")[0];
            var m = divParent.getElementsByClassName("min")[0];
            var t = divParent.getElementsByClassName("title")[0];
            var c = divParent.getElementsByClassName("choix")[0];
            h.disabled = true;
            m.disabled = true;
            t.disabled = true;
            c.disabled = true;
            divParent.style.backgroundColor = "#01A9DB";
        } else {
            var divParent = ch.parentNode;
            var h = divParent.getElementsByClassName("h")[0];
            var m = divParent.getElementsByClassName("min")[0];
            var t = divParent.getElementsByClassName("title")[0];
            var c = divParent.getElementsByClassName("choix")[0];
            h.disabled = false;
            m.disabled = false;
            t.disabled = false;
            c.disabled = false;
            divParent.style.backgroundColor = "#BDBDBD";
        }

    });

    moin.addEventListener('click', function (evt) {
        var suppr = evt.target;
        var divParent = suppr.parentNode;
        divParent.parentNode.removeChild(divParent);
    });

    choix.setAttribute("class", "choix");

    div.appendChild(ligne);
    ligne.appendChild(check);
    ligne.appendChild(heure);
    ligne.appendChild(document.createTextNode(":"));
    ligne.appendChild(minute);
    ligne.appendChild(champ);
    ligne.appendChild(choix);
    choix.appendChild(s1);
    choix.appendChild(s2);
    choix.appendChild(s3);
    ligne.appendChild(moin);
}

function checkReveil(heure) {
    var div = document.getElementById("event");
    var reveil = div.getElementsByTagName("div");
    for (var i = 0; i < reveil.length; i += 1) {
        var check = reveil[i].getElementsByClassName("check")[0];
        if (check.checked) {
            var h = reveil[i].getElementsByClassName("h")[0];
            var m = reveil[i].getElementsByClassName("min")[0];
            var choix = reveil[i].getElementsByClassName("choix")[0];
            var champ = reveil[i].getElementsByClassName("title")[0];
            var msg = document.getElementById("msg");
            if (parseInt(heure.getHours()) === parseInt(h.value) && parseInt(heure.getMinutes()) === parseInt(m.value) && parseInt(0) === parseInt(heure.getSeconds())) {
                var audio = new Audio('sound/' + choix.value + '.mp3');
				var btnStop = document.createElement("button");
				audio.loop = true;
				audio.play();
				setTimeout(function() {
					audio.pause();
					msg.textContent = "";
					btnStop.parentNode.removeChild(btnStop);
				}, 30000);
                msg.textContent = champ.value;
				var btnStop = document.createElement("button");
				btnStop.appendChild(document.createTextNode("Stop"));
				btnStop.setAttribute("class", "stop");
				
				reveil[i].appendChild(btnStop);
				
				btnStop.addEventListener('click', function (evt) {
					audio.pause();
					var suppr = evt.target;
					suppr.parentNode.removeChild(suppr);
				});
            }
        }
    }
}