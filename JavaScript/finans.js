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

database.ref("Giris").once('value').then(function(snapshot) {
    var a = snapshot.val();
    var name = Object.values(a)[0]["name"];
    database.ref(name+"/Finans").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var finansBilgi = Object.values(data);
    
    
        var table = document.getElementById("nakit-akis");
        var tbody = table.tBodies[0];
    
        tbody.innerHTML = "";
    
        // İstediğiniz kadar satır eklemek için bir döngü kullanma
        for (var i = 0; i < finansBilgi.length; i++) {
            // Yeni bir satır oluşturma
            var newRow = tbody.insertRow();
    
            // Yeni hücreler oluşturma ve içeriklerini ayarlama
            var cell1 = newRow.insertCell();
            var cell2 = newRow.insertCell();
            var cell3 = newRow.insertCell();
            var cell4 = newRow.insertCell();
    
            cell1.innerHTML = finansBilgi[i]["Aciklama"];
            cell2.innerHTML = finansBilgi[i]["GelirGider"];
            cell3.innerHTML = finansBilgi[i]["GelirGider"];
            cell4.innerHTML = finansBilgi[i]["Tutar"];
        }
    })
})

document.querySelector("#send").addEventListener("click",()=>{
    var aciklama = document.getElementById("aciklama").value;
    var tutar = document.getElementById("tutar").value;
    var gelirGider = document.getElementById("tur").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        veri = {
            Aciklama : aciklama,
            Tutar : tutar,
            GelirGider : gelirGider
        }
        var firebaseRef = database.ref(name+'/Finans');
        firebaseRef.push(veri);
        database.ref(name+"/Finans").once('value').then(function(snapshot) {
            var data = snapshot.val();
            var finansBilgi = Object.values(data);
        
            var table = document.getElementById("nakit-akis");
            var tbody = table.tBodies[0];
        
            tbody.innerHTML = "";
        
            // İstediğiniz kadar satır eklemek için bir döngü kullanma
            for (var i = 0; i < finansBilgi.length; i++) {
                // Yeni bir satır oluşturma
                var newRow = tbody.insertRow();
        
                // Yeni hücreler oluşturma ve içeriklerini ayarlama
                var cell1 = newRow.insertCell();
                var cell2 = newRow.insertCell();
                var cell3 = newRow.insertCell();
                var cell4 = newRow.insertCell();
        
                cell1.innerHTML = finansBilgi[i]["Aciklama"];
                cell2.innerHTML = finansBilgi[i]["GelirGider"];
                cell3.innerHTML = finansBilgi[i]["GelirGider"];
                cell4.innerHTML = finansBilgi[i]["Tutar"];
            }
        })
    })
})

document.querySelector("#remove").addEventListener("click",()=>{
    var Sira = document.getElementById("removeid").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        database.ref(name+"/Finans").once('value').then(function(snapshot) {
            var removedata = snapshot.val();
            var removeBilgi = Object.values(removedata);
            for (let i = 0; i < removeBilgi.length; i++) {
                if (removeBilgi[i]["Aciklama"]==Sira) {
                    removeDataRef = database.ref(name+"/Finans/"+Object.keys(removedata)[i])
                        console.log(name+"/Finans/"+Object.keys(removedata)[i])
                        removeDataRef.remove()
                        location.href = location.href;
                        break
                }
            }
        })
    })
})