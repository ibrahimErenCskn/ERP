var firebaseConfig = {
    apiKey: "AIzaSyD3bC2FfWYn_oQ9vXJ2FrmwMpGPL12CK5A",
    authDomain: "test-fac3c.firebaseapp.com",
    projectId: "test-fac3c",
    storageBucket: "test-fac3c.appspot.com",
    messagingSenderId: "504622197254",
    appId: "1:504622197254:web:819038bd089e3d91883187",
    databaseURL: "https://test-fac3c-default-rtdb.europe-west1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
database.ref("Giris").once('value').then(function(snapshot1) {
  
  var data11 = snapshot1.val();
  var loginName1 = Object.values(data11);
  document.getElementById("username").value = loginName1[0]["name"];
});

var eposta = false;
function validateEmail() {
    var input = document.getElementById("email").value;
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        eposta = true;
    }else{
        eposta = false;
    }
}

document.querySelector("#send_").addEventListener("click",()=>{
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const No = document.getElementById("No").value;
  const Name1 = document.getElementById("name1").value;
  validateEmail()
  if (eposta == true) {
    if (document.getElementById("email").value == "" || 
      document.getElementById("password").value == "" ||
      document.getElementById("No").value == "" ||
      document.getElementById("name1").value == ""
      ){
        console.log("Boş Bırakmayınız")
      }else{
        database.ref("Kullanicilar").once('value').then(function(snapshot) {
          // Veriler snapshot olarak alınır
          database.ref("Giris").once('value').then(function(snapshot1) {
  
            var data1 = snapshot1.val();
            var loginName = Object.values(data1);
            var data = snapshot.val();
        
            // Verilerin benzersiz kimliklerini alın
            var idVeriable = Object.values(data);
            var idKey = Object.keys(data)
    
            for (var i = 0; i < idVeriable.length; i++) {
              if (loginName[0]["name"] == idVeriable[i]["name"]) {
    
                // Veriyi silin
                var veriYolu = "Kullanicilar/"+idKey[i];
                database.ref(veriYolu).remove()
                  .then(function() {
                    console.log("Veri başarıyla silindi.");
                  })
                  .catch(function(error) {
                    console.error("Veri silme hatası:", error);
                  });
                  //Eski Kayıt silindi Yeni Kayit olusturuldu
                  var veri = {
                    name : loginName[0]["name"],
                    email : email,
                    password : password,
                    telNo : No,
                    isYeri: Name1,
                }
                var firebaseRef = database.ref('Kullanicilar');
                firebaseRef.push(veri);
              }else{
        
                console.log("Verilerin Benzersiz Kimlikleri:", idVeriable[0]["name"]);
        
              }
            }
            location.href = location.href
          })
        
        }).catch(function(error) {
          // Hata durumunda hata mesajını görüntüleyin
          console.log("Veriler alınamadı: " + error.message);
      });
    }
  }else{
    console.log("Eposta Geçersiz.")
  }
}) 