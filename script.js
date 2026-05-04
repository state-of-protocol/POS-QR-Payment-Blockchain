/**
 * script.js - Logik Utama Vendor
 */
const WALLET_VENDOR = "lum13fgcln9k7ft2pkndjh4xhzlv3y3l8e450vnztl";
const LUM_UNITS = "170000";

function generateDynamicQR() {
    const qrData = `lum:${WALLET_VENDOR}?amount=${LUM_UNITS}`;
    
    // Panggil modul QR yang kita cipta tadi
    QREngine.generate('qr-display', qrData, 220);
    
    console.log("QR Statik 170k LUM dijana secara modular.");
    // startMonitoring(); // Panggil fungsi pantau jika perlu
}
