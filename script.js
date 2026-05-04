/**
 * script.js - Vendor Soundbox (Versi Statik RM 10)
 */

const WALLET_VENDOR = "lum13fgcln9k7ft2pkndjh4xhzlv3y3l8e450vnztl";
const FIXED_AMOUNT_MYR = "10.00";
const FIXED_AMOUNT_LUM = "170000"; // 170k unit LUM

// Paparkan nilai statik terus apabila laman dimuatkan
window.onload = function() {
    document.getElementById('current-amount').innerText = FIXED_AMOUNT_MYR;
};

// Fungsi Jana QR Statik
function generateDynamicQR() {
    const qrArea = document.getElementById('qr-display');
    const memo = "Bayaran RM10 (170k LUM)";

    // Format data QR (Menggunakan nilai LUM mengikut permintaan anda)
    const qrData = `lum://${WALLET_VENDOR}?amount=${FIXED_AMOUNT_LUM}&memo=${encodeURIComponent(memo)}`;
    
    qrArea.innerHTML = "";
    
    // Pastikan library QRCode.js sudah ada dalam HTML anda
    try {
        new QRCode(qrArea, { 
            text: qrData, 
            width: 220, 
            height: 220, 
            colorDark : "#4A3728" 
        });
        
        console.log("QR Statik RM 10 dijana.");
        startMonitoring(); // Mula memantau transaksi
    } catch (err) {
        alert("Sila pastikan library QRCode.js telah dimasukkan dalam fail HTML!");
    }
}

// Fungsi lain (startMonitoring & announcePayment) kekal sama seperti kod asal anda
