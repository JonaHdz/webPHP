const form = document.querySelector("form");
const fileInput = form.querySelector(".file-input");
const progesoArea = document.querySelector(".progreso-area");
const subidoArea = document.querySelector(".subido-area");

form.addEventListener("dragover", e => {
    e.preventDefault();
});

form.addEventListener("drop", e => {
    e.preventDefault();

    fileInput.files = e.dataTransfer.files;
    let file = fileInput.files[0];
    preUploadFile(file);
});

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", ({ target }) => {
    let file = target.files[0];
    preUploadFile(file);
});

function preUploadFile(file) {
    if (file) {
        let filename = file.name;
        if (filename.length >= 12) {
            let splitName = filename.split('.');
            filename = splitName[0].substring(0, 12) + "... ." + splitName[1];
        }
        preUploadFile(filename);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/upload.php");

    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);
        let fileSize;
        (fileTotal < 1024) ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024 * 1024).toFixed(2) + " MB")
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="contenido">
                                    <div class="detallers">
                                        <span class="nombre">${name} &bullet; Subiendo</span>
                                        <span class="porcentaje">${fileLoaded}%</span>
                                    </div>
                                    <div class="progreso-bar">
                                        <div class="progreso" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;


        // linea para omitir el historia de subidas
        //subidoArea.innerHTML = "";
        subidoArea.classList.add("onprogress");
        progesoArea.innerHTML = progressHTML;
        if(loaded == total){
            progesoArea.innerHTML = "";
            let uploadedHTML = `<li class="row">
            <div class="contenido">
                <i class="fas fa-file-alt"></i>
                <div class="detalles">
                    <span class="nombre">${name} &bullet; Subido</span>
                    <span class="size">${fileSize}</span>
                </div>
            </div>
            <i class="fas fa-check"></i>
        </li>`;
        subidoArea.classList.remove("onprogress");

        // linea parar omitir el historias de subidas
        // subidoArea.innerHTML = uploadedHTML;
            subidoArea.insertAdjacentHTML("afterbegin",uploadedHTML);
        }
    });

    let formData = new formData(form);
    xhr.send(formData);
}