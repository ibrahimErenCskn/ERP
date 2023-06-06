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
    var data = snapshot.val();
    var name = Object.values(data)[0]["name"];
    database.ref(name+"/satisRaporu").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var finansBilgi = Object.values(data);
        console.log(finansBilgi)
    
        var table = document.getElementById("satisRaporu");
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
    
            cell1.innerHTML = finansBilgi[i]["urunAdi"];
            cell2.innerHTML = finansBilgi[i]["urunFiyati"];
            cell3.innerHTML = finansBilgi[i]["satisAdedi"];
            cell4.innerHTML = finansBilgi[i]["satisAdedi"];
        }
    })
})

document.querySelector("#send").addEventListener("click",()=>{
    var urunAdi = document.getElementById("urunAdi").value;
    var urunFiyati = document.getElementById("urunFiyati").value;
    var satisAdedi = document.getElementById("satisAdedi").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        veri = {
            urunAdi : urunAdi,
            urunFiyati : urunFiyati,
            satisAdedi : satisAdedi,
        }
        var firebaseRef = database.ref(name+'/satisRaporu');
        firebaseRef.push(veri);
        database.ref(name+"/satisRaporu").once('value').then(function(snapshot) {
            var data = snapshot.val();
            var finansBilgi = Object.values(data);
            console.log(finansBilgi)
        
            var table = document.getElementById("satisRaporu");
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
                
                cell1.innerHTML = finansBilgi[i]["urunAdi"];
                cell2.innerHTML = finansBilgi[i]["urunFiyati"];
                cell3.innerHTML = finansBilgi[i]["satisAdedi"];
                cell4.innerHTML = finansBilgi[i]["satisAdedi"];
            }
        })
    })
})