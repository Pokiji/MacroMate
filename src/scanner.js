import ScanbotSDK from 'scanbot-web-sdk';

const myLicenseKey = "bV3rEkOKKctj5CzpC9IA3l1pe2nnrQ" +
    "m8OjJvN0VfjTOVTsj5TeGuttP2KsFZ" +
    "ES6FLfAUz40SE4N+dTmdMitrQhJ7Zb" +
    "S4gJwHGxiMZJxiGgXBiD5CLcScJDoH" +
    "0YrlWri01UCEElk4n0VJsSnspEEUqS" +
    "p3HgQTOpK7qHR2Yh7xW6haEZhk8PIA" +
    "bSkNrUnjOxbzfabCnBEv1BNDoWjU5S" +
    "QEDfXu216xzQNf8n1fyUzRLg+/XW5U" +
    "S2VmhaMq6D3NyWa/mbFp88L+A+xvZu" +
    "D5Qo7s2p4ERZZA4qKLYBzBBvLADx47" +
    "vueBuLFPqafJk9xKBgycuD9J7ebLPn" +
    "InEe9uDhFAIQ==\nU2NhbmJvdFNESw" +
    "psb2NhbGhvc3R8bWFjcm9mYWN0b3Iu" +
    "eHl6CjE3NDUwMjA3OTkKODM4ODYwNw" +
    "o4\n";

async function initializeScanbot() {
    const scanbotSDK = await ScanbotSDK.initialize({
        licenseKey: myLicenseKey,
        enginePath: '/path/to/scanbot-sdk-engine/'
    });

    console.log("Scanbot SDK initialized successfully!");

    const result = await scanbotSDK.createBarcodeScanner({
        containerId: 'barcode-scanner-container', // Add a container in your HTML
        onBarcodeDetected: async (barcode) => {
            console.log("Scanned Barcode:", barcode.text);
        }
    });

    return result;
}

initializeScanbot();