const shortenBtn = document.getElementById("shortenBtn");
const urlInput = document.getElementById("urlInput");
const result = document.getElementById("result");
const shortUrl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");
shortenBtn.addEventListener("click", async () => {

    const url = urlInput.value;
    if(!url){
        alert("Please enter a URL");
        return;
    }

    const response = await fetch("/shorten",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            url
        })
    });

    const data = await response.json();
    if(data.success){
        result.classList.remove("hidden");
        shortUrl.textContent = data.data.shortUrl;
        shortUrl.href = data.data.shortUrl;
        copyBtn.onclick = ()=>{
            navigator.clipboard.writeText(data.data.shortUrl);
            alert("Copied!");
        };
        openBtn.onclick = ()=>{
            window.open(data.data.shortUrl);
        };
    }

    else{
        alert(data.message);
    }
});