/**
 * script.js - Logik Utama Vendor
 */
function generateDynamicQR() {
    // Ambil data dari config.js
    const wallet = VENDOR_SETTINGS.wallet_address;
    const amountLUM = VENDOR_SETTINGS.default_myr * VENDOR_SETTINGS.conversion_rate;
    const prefix = VENDOR_SETTINGS.currency_prefix;

    const qrData = `${prefix}:${wallet}?amount=${amountLUM}`;
    
    // Panggil modul QR
    QREngine.generate('qr-display', qrData, 220);
    
    console.log(`QR dijana untuk ${wallet} berjumlah ${amountLUM} units.`);
}
