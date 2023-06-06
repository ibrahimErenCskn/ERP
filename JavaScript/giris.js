var firebaseConfig = {
    apiKey: "AIzaSyD3bC2FfWYn_oQ9vXJ2FrmwMpGPL12CK5A",
    authDomain: "test-fac3c.firebaseapp.com",
    projectId: "test-fac3c",
    storageBucket: "test-fac3c.appspot.com",
    messagingSenderId: "504622197254",
    appId: "1:504622197254:web:819038bd089e3d91883187",
    databaseURL: "https://test-fac3c-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.querySelector("#send").addEventListener("click",()=>{
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  database.ref().once('value').then(function(snapshot) {

    // Veriler snapshot olarak alınır
    var data = snapshot.val();
    var arrayindex = Object.values(data["Kullanicilar"]);
    arrayindex.unshift(null);

    for (var i = 1; i < arrayindex.length; i++) {
      if (username == arrayindex[i]["name"] && password == arrayindex[i]["password"] ) {
        window.location.href = "sistem.html";
        var veri = {
          name : username,
          email : arrayindex[i]["email"],
          password :arrayindex[i]["password"],
          telNo : arrayindex[i]["telNo"],
          isYeri: arrayindex[i]["isYeri"],
        }
        database.ref("Giris").remove()
          .then(function() {
            console.log("Veri başarıyla silindi.");
          })
          .catch(function(error) {
            console.error("Veri silme hatası:", error);
          });
        var firebaseRef = database.ref('Giris');
        firebaseRef.push(veri);
      }else{

        console.log("Kullanıcı adı Veya Şİfre Uymuyor");

      }
    }

  }).catch(function(error) {

    // Hata durumunda hata mesajını görüntüleyin
    console.log("Veri alınamadı: " + error.message);

  });
})