// Onderstaande methode wordt aangeroepen als er op de login-knop gedrukt wordt.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      facebookInlogStatus(response);
    });
  }

  // Onderstaande methode wordt aangeroepen met het resultaat van FB.getLoginstatus() uit de SDK.
  function facebookInlogStatus(response) {

    // Haal sections op:
    var voerHandnaamIn = document.getElementById("wedstrijdSection");
    var nogNietIngelogd = document.getElementById("nogNietIngelogd");
    var handSubmittedMessage = document.getElementById("handSubmitted");
    var shareKnoppen = document.getElementById("shareSection");

    if (response.status === 'connected') {
      voerHandnaamIn.style.display = "block"; // Handnaam kan je niet invoeren als je niet ingelogd bent
      nogNietIngelogd.style.display = "none"; // Inlog-gedeelte verbergen wanneer ingelogd
    }
    else { // Niet geautoriseerd of nog niet ingelogd
      voerHandnaamIn.style.display = "none";
      nogNietIngelogd.style.display = "block";
      handSubmittedMessage.style.display = "none";
      shareKnoppen.style.display = "none";
      // Je kan de hand niet delen óf meedoen met de competitie als je niet ingelogd bent
    }
  }

function vulNaamIn(){
  var handname = document.getElementById("handName").value;

  if(handname == "") {
    alert("Voer alsjeblieft een handnaam in voordat je deelneemt aan de wedstrijd!");
    return false; // Als er een error in de code zit, wordt het 'default' uitgevoerd.
  }

  // Bij true: hand wordt opgeslagen (Teije)
  save_screenshot();
  save_model();
}

document.write('<script src="../scripts/global.js.variables.js" type="text/javascript"></script>');
function submitAndShare()
{
  var handname = document.getElementById("handName").value;

  if(handname == "") {
    alert("Voer alsjeblieft een handnaam in voordat je hem gaat delen!");
    return false; // Als er een error in de code zit, wordt het 'default' uitgevoerd.
  }

  else {
    FB.api('/me', function(response) {
      var fbname = response.name;               // imagenaam is een globale variabele
      var afbeelding = "http://552779.infhaarlem.nl/handimg/" + ftpimage; // Let op: image moet minimaal 200x200pix zijn
      var titel = 'Check de hand ' + handname + ' van ' + fbname;
      var beschrijving = fbname + ' heeft deze hand ontworpen om het goede doel Child Surgery Vietnam onder de aandacht te brengen. Doneer snel en ontwerp ook een hand!';

      overrideMetaData(titel, beschrijving, afbeelding);
    });
  }
}

function overrideMetaData(overrideTitle, overrideDescription, overrideImage)
{
	FB.ui({
		method: 'share_open_graph',
		action_type: 'og.shares',
		action_properties: JSON.stringify({
			object: {
				'og:title': overrideTitle,
				'og:description': overrideDescription,
				'og:image': overrideImage
			}
		})
	});
}

function shareDetail(id, overrideTitle, overrideDescription, overrideImage){
  // FB.ui({
  //   method: 'share',
  //   href: 'http://127.0.0.1/Project2.4/PHP/detail.php?id=' + id
  //   }, function(response){});
  FB.ui({
		method: 'share_open_graph',
		action_type: 'og.shares',
		action_properties: JSON.stringify({
			object: {
        'og:url': 'http://127.0.0.1/Project2.4/PHP/detail.php?id=' + id,
				'og:title': overrideTitle,
				'og:description': overrideDescription,
        'og:image': overrideImage
			}
		})
  })
}

function tweetTweet(){
    FB.api('/me', function(response) {
      var handname = document.getElementById("handName").value;
      var url      = "https://twitter.com/intent/tweet";
      var FBuserName = response.name;
      var TWuserName = "userName";
      var text     = FBuserName + ' heeft de hand ' + handname + ' ontworpen om het goede doel Child Surgery Vietnam onder de aandacht te brengen. Doneer snel en ontwerp ook een hand! Bekijk hem hier http://552779.infhaarlem.nl/handimg/' + ftpimage;
      var hashtags = "csvn, 100handen, childsurgeryvietnam";
      window.open(url + "?text=" + text + ";hashtags=" + hashtags + ";via=" + TWuserName, "", "width=800, height=600");
    });
}
