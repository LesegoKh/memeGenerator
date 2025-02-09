const toggleButton = document.getElementById("darkModeToggle");
const downloadButton = document.getElementById("download-btn");

if(localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.removeItem("dark-mode");
    }
});

const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const imageInput = document.getElementById("imageInput");

const memeImage = document.getElementById("memeImage");
const topTextDisplay = document.getElementById("topTextDisplay");
const bottomTextDisplay = document.getElementById("bottomTextDisplay");

topTextInput.addEventListener("input", updateMeme);
bottomTextInput.addEventListener("input", updateMeme);

imageInput.addEventListener("change", function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        memeImage.src = e.target.result;
    memeImage.onload = updateMeme;
    }
    reader.readAsDataURL(file);
});

function updateMeme() {
    topTextDisplay.innerText = topTextInput.value.toUpperCase();
    bottomTextDisplay.innerText = bottomTextInput.toUpperCase();
}


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

downloadButton.addEventListener('click', () => {
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;

    ctx.drawImage(memeImage, 0, 0);

    ctx.font = "48px";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.Baseline = "top";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 10);
    ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 10);

    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
    ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);

    
    const memeDataUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = memeDataUrl;
    link.download = "meme.png"; 
    link.click();
}); 


function updateMeme() {
    topTextDisplay.innerText = topTextInput.value.toUpperCase();
    bottomTextDisplay.innerText = bottomTextInput.value.toUpperCase();
    
    
    downloadButton.style.display = "block";
}




