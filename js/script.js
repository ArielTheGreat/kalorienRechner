let arrayDeOpcionesSelected = document.getElementsByClassName("option");
let geschlechte = ["Weiblich","Männlich"];
let objectiveVonUser = "Muskelaufbau";
let geschlechtVonUser = "Männlich";
arrayDeOpcionesSelected[0].classList.add("optionSelected");
document.getElementsByClassName("geslechtOptionen")[1].style.border="2px solid black";
for(let x = 0;x < arrayDeOpcionesSelected.length;x++){
    arrayDeOpcionesSelected[x].addEventListener("click", function(event){
        quitarLaClaseOptionSelected();
        this.classList.add("optionSelected");
        objectiveVonUser = this.id;
    });
}
let popup = document.getElementById("popup");
var span = document.createElement('span');
span.innerHTML = '<button onclick="schliessFenster()"> &times; </button>';

function quitarLaClaseOptionSelected(){
    for(let x = 0;x < arrayDeOpcionesSelected.length;x++){
            arrayDeOpcionesSelected[x].classList.remove("optionSelected");
    }
}

function geschlechtÄndert(number){
    document.getElementsByClassName("geslechtOptionen")[0].style.border="1px solid grey";
    document.getElementsByClassName("geslechtOptionen")[1].style.border="1px solid grey";
    document.getElementsByClassName("geslechtOptionen")[number].style.border="2px solid black";
    geschlechtVonUser = geschlechte[number];
}

function returnWieVieleKalorienBrauchMan(){
    let Stoffwechselrate = 0;
    if(document.getElementById("gewichtVonUser").value == "" | document.getElementById("grosseVonUser").value == "" | document.getElementById("alterVonUser").value == "")
    {
        alert("Please fill all the inputs required (Alter, Gewicht und Grösse)");
    }else{
        switch(geschlechtVonUser){
            case "Weiblich":
                Stoffwechselrate = 655+(9.6 * parseFloat(document.getElementById("gewichtVonUser").value)) + (1.8*parseFloat(document.getElementById("grosseVonUser").value) - (4.7 * parseInt(document.getElementById("alterVonUser").value)));
                break;
            case "Männlich":
                Stoffwechselrate = 66+(13.7 * parseFloat(document.getElementById("gewichtVonUser").value)) + (5*parseFloat(document.getElementById("grosseVonUser").value) - (6.8 * parseInt(document.getElementById("alterVonUser").value)));
                break;
        }
        let kaloricNumber = 0;
        let x = document.getElementById("arbeitsAktivitatsNiveau").value;
        let y = document.getElementById("wochentlicheSporteinheiten").value;
        if(parseFloat(x).toFixed(2) == 100.00 | parseFloat(y).toFixed(2) == 100.00)
        {
            kaloricNumber = Stoffwechselrate * 1.9;
        }
        else if(parseFloat(y) > 57 | parseFloat(x) > 66){
            kaloricNumber = Stoffwechselrate * 1.725;
        }else if(parseFloat(y) > 28 | parseFloat(x) > 33){
            kaloricNumber = Stoffwechselrate * 1.55;
        }else if(parseFloat(y) > 14 & parseFloat(x) > 33){
            kaloricNumber = Stoffwechselrate * 1.375;
        }else{
            kaloricNumber = Stoffwechselrate * 1.2;
        }

        switch(objectiveVonUser){
            case "Muskelaufbau":
                let subidaLenta = kaloricNumber + ((kaloricNumber * 10) / 100);
                let subidaModerada = kaloricNumber + ((kaloricNumber * 20) / 100);
                let subidaRapida = kaloricNumber + ((kaloricNumber * 30) / 100);
                desplegarInformacion(kaloricNumber,subidaLenta.toFixed(2),subidaModerada.toFixed(2),subidaRapida.toFixed(2),0);
                break;
            case "Abnehmen":
                let bajadaLenta = kaloricNumber - ((kaloricNumber * 10) / 100);
                let bajadaModerada = kaloricNumber - ((kaloricNumber * 20) / 100);
                let bajadaRapida = kaloricNumber - ((kaloricNumber * 30) / 100);
                desplegarInformacion(kaloricNumber,bajadaLenta.toFixed(2),bajadaModerada.toFixed(2),bajadaRapida.toFixed(2),1);
                break;
        }
    }
    
}

function desplegarInformacion(kaloricNeedsToMaintain,lenta,moderada,rapida,diferencia){ 
    document.getElementsByTagName("body")[0].classList.add("colorGreyBackground");
    document.getElementsByTagName("header")[0].classList.add("colorGreyBackground");
    popup.classList.add("popup");
    popup.appendChild(span);
    if(diferencia == 0){
        popup.innerHTML +="<p>"+ parseInt(kaloricNeedsToMaintain) + " Kilokalorien, die benötigt werden, um das Gewicht zu halten.</p><p>" + lenta + " Kilokalorien langsam ohne viel Fett zu klettern.</p><p>"+moderada+" Kilokalorien für moderate Gewichtszunahme</p><p>"+rapida+" Kilokalorien für einen schnellen Anstieg, ein Großteil davon wird fett sein</p>";
    }else{
        popup.innerHTML +="<p>"+ parseInt(kaloricNeedsToMaintain) + " Kilokalorien, die benötigt werden, um das Gewicht zu halten.</p><p>" + lenta + " Kilokalorien, um langsam abzunehmen.</p><p>"+moderada+" Kilokalorien für moderaten Gewichtsverlust</p><p>"+rapida+" Kilokalorien für schnellen Gewichtsverlust.</p>";
    }
}

function schliessFenster(){
    popup.innerHTML = '';
    popup.classList.remove("popup");
    document.getElementsByTagName("body")[0].classList.remove("colorGreyBackground");
    document.getElementsByTagName("header")[0].classList.remove("colorGreyBackground");
}