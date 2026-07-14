const shortenBtn = document.getElementById("shortenBtn");
const urlInput = document.getElementById("urlInput");
const result = document.getElementById("result");
const shortUrl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");
const customCodeInput = document.getElementById("customCode");
const expiry = document.getElementById("expiry");
const qrContainer = document.getElementById("qrcode");
const downloadQR = document.getElementById("downloadQR");

shortenBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert("Please enter a URL");
        return;
    }
    try {
        shortenBtn.disabled = true;
        shortenBtn.textContent = "Generating...";

        const response = await fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url,
                customCode: customCodeInput.value.trim(),
                expiry: expiry.value
            })
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        result.classList.remove("hidden");

        shortUrl.textContent = data.data.shortUrl;
        shortUrl.href = data.data.shortUrl;

        // Clear previous QR
        qrContainer.innerHTML = "";

        // Generate QR Code
        new QRCode(qrContainer, {
            text: data.data.shortUrl,
            width: 180,
            height: 180,
        });

        // Copy Button
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(data.data.shortUrl);
            alert("Link copied!");
        };

        // Open Button
        openBtn.onclick = () => {
            window.open(data.data.shortUrl, "_blank");
        };

    } catch (err) {

        alert(err.message);

    } finally {

        shortenBtn.disabled = false;
        shortenBtn.textContent = "SHORTEN";

    }

});

downloadQR.addEventListener("click", () => {

    const img = document.querySelector("#qrcode img");

    if (!img) {
        alert("Generate a QR code first.");
        return;
    }

    const link = document.createElement("a");

    link.href = img.src;
    link.download = "tinyweb-qr.png";

    link.click();

});