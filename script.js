let currentAmount = "";
const WALLET_VENDOR = "lum13fgcln9k7ft2pkndjh4xhzlv3y3l8e450vnztl";

function appendNum(num) {
    currentAmount += num;
    document.getElementById('current-amount').innerText = currentAmount;
}

function clearDisplay() {
    currentAmount = "";
    document.getElementById('current-amount').innerText = "0.00";
    document.getElementById('qr-display').innerHTML = "<p>Masukkan jumlah & tekan [JANA QR]</p>";
}

function generateDynamicQR() {
    const amount = currentAmount || "0.00";
    const memo = document.getElementById('memo-input').value || "Bayaran Terminal";
    const qrArea = document.getElementById('qr-display');

    if (parseFloat(amount) <= 0) return alert("Sila masukkan jumlah!");

    // Bina URI Format
    const qrData = `lum://${WALLET_VENDOR}?amount=${amount}&memo=${encodeURIComponent(memo)}`;

    // Jana QR
    qrArea.innerHTML = "";
    new QRCode(qrArea, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark : "#4A3728"
    });

    // Simulasi Soundbox (Dinyalakan selepas scan dikesan di ledger)
    // Untuk demo, kita bunyikan sekarang:
    announcePayment(amount);
}

function announcePayment(amount) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Bayaran berjaya diterima, ${amount} Ringgit`;
    speech.lang = 'ms-MY'; 
    window.speechSynthesis.speak(speech);
}
