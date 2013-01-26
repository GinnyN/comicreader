function loading(url, filename){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    filesystem = fs;
    imagePath = fs.root.fullPath + "/" + filename
    var fileTransfer = new FileTransfer();

    fileTransfer.download(url, imagePath, function (entry) {
        /* Llenar guardar en la Base de Datos */
    });
  });
}