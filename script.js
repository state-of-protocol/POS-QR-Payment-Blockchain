/**
 * script.js - Vendor Soundbox Logic
 * Memantau transaksi masuk dari Ledger Ringgit-Tap
 */

let currentAmount = "";
const WALLET_VENDOR = "lum13fgcln9k7ft2pkndjh4xhzlv3y3l8e450vnztl";
let lastKnownTxId = null; // Penanda untuk elak bunyi berulang

// 1. Logik Keypad
function appendNum(num) {
    currentAmount += num;
    document.getElementById('current-amount').innerText = currentAmount;
}

function clearDisplay() {
    currentAmount = "";
    document.getElementById('current-amount').innerText = "0.00";
    document.getElementById('qr-display').innerHTML = "<p>Masukkan jumlah & tekan [JANA QR]</p>";
}

// 2. Jana QR Offline
function generateDynamicQR() {
    const amount = currentAmount || "0.00";
    const memo = document.getElementById('memo-input').value || "Bayaran Terminal";
    const qrArea = document.getElementById('qr-display');

    if (parseFloat(amount) <= 0) return alert("Sila masukkan jumlah!");

    const qrData = `lum://${WALLET_VENDOR}?amount=${amount}&memo=${encodeURIComponent(memo)}`;
    qrArea.innerHTML = "";
    new QRCode(qrArea, { text: qrData, width: 220, height: 220, colorDark : "#4A3728" });

    // Mula memantau bayaran masuk
    startMonitoring();
}

// 3. Sistem Soundbox (Polling Ledger)
function startMonitoring() {
    console.log("Soundbox sedang memantau bayaran...");
    
    const checkInterval = setInterval(async () => {
        try {
            // Kita panggil ledger.json dari repository Ringgit-Tap anda
            const response = await fetch('https://githubusercontent.com');
            const data = await response.json();
            
            // Ambil transaksi paling terakhir
            const latestTx = data.transactions[data.transactions.length - 1];

            // Syarat bunyi: Transaksi baru, penerima adalah vendor, dan ID berbeza
            if (latestTx && latestTx.id !== lastKnownTxId && latestTx.recipient === WALLET_VENDOR) {
                lastKnownTxId = latestTx.id;
                announcePayment(latestTx.amount_myr);
                clearInterval(checkInterval); // Berhenti pantau selepas berjaya
            }
        } catch (err) {
            console.error("Gagal semak ledger:", err);
        }
    }, 5000); // Semak setiap 5 saat
}

// 4. Voice Alert (Soundbox)
function announcePayment(amount) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Bayaran berjaya diterima, Ringgit Malaysia ${amount}`;
    speech.lang = 'ms-MY'; 
    window.speechSynthesis.speak(speech);
}
