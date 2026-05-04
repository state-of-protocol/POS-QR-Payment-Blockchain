/**
 * script.js - Logik Utama Vendor
 */

// 1. Logik Keypad (Penting untuk butang nombor berfungsi)
let currentAmount = "";

function appendNum(num) {
    // Elak titik bertindih
    if (num === '.' && currentAmount.includes('.')) return;
    
    currentAmount += num;
    document.getElementById('current-amount').innerText = currentAmount;
}

function clearDisplay() {
    currentAmount = "";
    document.getElementById('current-amount').innerText = "0.00";
    document.getElementById('qr-display').innerHTML = "<p>Masukkan jumlah & tekan [JANA QR]</p>";
}

// 2. Fungsi Jana QR (Menggunakan data dari config.js)
function generateDynamicQR() {
    // Semak jika VENDOR_SETTINGS wujud (dari config.js)
    if (typeof VENDOR_SETTINGS === "undefined") {
        alert("Ralat: Fail config.js tidak dijumpai atau gagal dimuatkan!");
        return;
    }

    const wallet = VENDOR_SETTINGS.wallet_address;
    const prefix = VENDOR_SETTINGS.currency_prefix;
    
    // Gunakan jumlah dari skrin, jika kosong guna default dari config
    const displayAmount = parseFloat(currentAmount) || VENDOR_SETTINGS.default_myr;
    const amountLUM = displayAmount * VENDOR_SETTINGS.conversion_rate;

    const qrData = `${prefix}:${wallet}?amount=${amountLUM}`;
    
    // Panggil modul QR (dari qrcode-engine.js)
    if (typeof QREngine !== "undefined") {
        QREngine.generate('qr-display', qrData, 220);
        console.log(`QR dijana untuk RM ${displayAmount} (${amountLUM} unit LUM)`);
    } else {
        alert("Ralat: Modul QREngine tidak dijumpai!");
    }
}
