let gerarQr = document.getElementById('qr-generate');
let qrCodeDive = document.getElementById('qr-code');
let erro = document.getElementById('erro');
let baixar = document.getElementById('baixar-qr');
let input = document.getElementById('inputtexto')

gerarQr.addEventListener('click', () => {
    let valorinput = input.value


    if (( valorinput !== "") && (valorinput !==null) && (valorinput !== undefined)) {
        erro.style.color ="green";
        qrCodeDive.innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x2008&date=${encodeURLCioponent(text)}">';
        setTimeout(() => {
            baixar.style.display = "block"
        }, 500);  
        input.value = "";
        input.focus(); 
        erro.innerHTML = "Qr criado com sucesso!"

    
    }
    else {     
        erro.textContent = "Preencha este campo!", alert (" A lista não pode estar vasia!");
         erro.style.color ="red";
        baixar.style.display = "none";
        qrCodeDive.innerHTML = ""
    };

});

//usando oenter para clicar
input.addEventListener("keyup", function (evento) {
    if (evento.keyCode === 13) {
        gerarQr.click();
    };
});

//Função para baixar o QR
baixar.addEventListener('click', () => {
    let imagem = document.querySelector('.de-momento');
    if (imagem) {
        let link = document.createElement('a');
        link.href = imagem.src;
        link.download = "qrcode.png";
        link.click();
    }
});