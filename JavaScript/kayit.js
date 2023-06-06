var firebaseConfig = {
    apiKey: "AIzaSyD3bC2FfWYn_oQ9vXJ2FrmwMpGPL12CK5A",
    authDomain: "test-fac3c.firebaseapp.com",
    projectId: "test-fac3c",
    storageBucket: "test-fac3c.appspot.com",
    messagingSenderId: "504622197254",
    appId: "1:504622197254:web:819038bd089e3d91883187",
    databaseURL: "https://test-fac3c-default-rtdb.europe-west1.firebasedatabase.app"
};

var eposta = false;
function validateEmail() {
    var input = document.getElementById("email").value;
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {

        eposta = true;
    }else{
        eposta = false;
    }
}

firebase.initializeApp(firebaseConfig);
var firebaseRef = firebase.database().ref('Kullanicilar');
var database = firebase.database()

document.querySelector("#send").addEventListener("click",()=>{
    validateEmail();
    if (eposta == true) {
        if (document.getElementById("email").value == "" || 
        document.getElementById("password").value == "" ||
        document.getElementById("No").value == "" ||
        document.getElementById("name1").value == ""
        ){
            console.log("Boş Bırakma")
        }else{
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const No = document.getElementById("No").value;
            const Name1 = document.getElementById("name1").value;

            database.ref().once('value').then(function(snapshot) {
                var index = 0;
                // Veriler snapshot olarak alınır
                var data = snapshot.val();
                var arrayindex = Object.values(data["Kullanicilar"]);
                arrayindex.unshift(null);
                
                for (var i = 1; i < arrayindex.length; i++) {
                if (username == arrayindex[i]["name"] ) {
                    index = 1;
                    break
                }else{
                    index = 0;
                }
                }
                if (index == 0) {
                    var veri = {
                        name : username,
                        email : email,
                        password : password,
                        telNo : No,
                        isYeri: Name1,
                    }
                    firebaseRef.push(veri);
                }
                window.location.href = "giriş.html";
            }).catch(function(error) {
            
                // Hata durumunda hata mesajını görüntüleyin
                console.log("Veri alınamadı: " + error.message);
            
            });
        }
    }
    else{
        console.log("geçerli değil")
    }
  }
)