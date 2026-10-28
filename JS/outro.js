const gerarQr = document.getElementById("qr-generate");
const qrCodeDiv = document.getElementById("qr-code");
const erro = document.getElementById("erro");
const baixar = document.getElementById("baixar-qr");
const input = document.getElementById("inputtexto");

// Gerar código QR
gerarQr.addEventListener("click", () => {
    const valorInput = input.value.trim();

    if (valorInput === "") {
        erro.textContent = "Preencha este campo!";
        erro.style.color = "red";
        baixar.style.display = "none";
        qrCodeDiv.innerHTML = "";
        return;
    }

    erro.textContent = "A gerar código QR...";
    erro.style.color = "blue";
    baixar.style.display = "none";

    const imagem = document.createElement("img");

    imagem.className = "de-momento";
    imagem.alt = "Código QR gerado";
    imagem.width = 200;
    imagem.height = 200;

    imagem.onload = () => {
        erro.textContent = "QR Code criado com sucesso!";
        erro.style.color = "green";
        baixar.style.display = "block";
    };

    imagem.onerror = () => {
        erro.textContent = "Erro ao gerar o QR Code. Verifique a sua internet.";
        erro.style.color = "red";
        baixar.style.display = "none";
    };

    imagem.src =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=200x200&data=" +
        encodeURIComponent(valorInput);

    qrCodeDiv.innerHTML = "";
    qrCodeDiv.appendChild(imagem);

    input.focus();
});

// Permitir gerar o QR Code com a tecla Enter
input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        gerarQr.click();
    }
});

// Descarregar o código QR
baixar.addEventListener("click", async () => {
    const imagem = qrCodeDiv.querySelector(".de-momento");

    if (!imagem || !imagem.complete || imagem.naturalWidth === 0) {
        erro.textContent = "Gere primeiro um código QR válido.";
        erro.style.color = "red";
        return;
    }

    try {
        const resposta = await fetch(imagem.src);

        if (!resposta.ok) {
            throw new Error("Não foi possível obter a imagem.");
        }

        const blob = await resposta.blob();
        const urlTemporario = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = urlTemporario;
        link.download = "qrcode.png";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(urlTemporario), 1000);

        erro.textContent = "QR Code descarregado com sucesso!";
        erro.style.color = "green";

    } catch (error) {
        // Alternativa caso o servidor bloqueie o descarregamento.
        erro.textContent =
            "Não foi possível descarregar automaticamente. A abrir a imagem...";

        erro.style.color = "red";
        window.open(imagem.src, "_blank");
    }
});