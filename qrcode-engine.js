/**
 * qrcode-engine.js - Modul penjanaan QR
 */
const QREngine = {
    generate: function(elementId, data, size = 200) {
        const container = document.getElementById(elementId);
        container.innerHTML = ""; // Bersihkan kawasan QR

        if (typeof QRCode === "undefined") {
            console.error("Library QRCode.js tidak dijumpai!");
            container.innerHTML = "<p style='color:red;'>Ralat Library</p>";
            return;
        }

        new QRCode(container, {
            text: data,
            width: size,
            height: size,
            colorDark: "#4A3728",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    }
};
