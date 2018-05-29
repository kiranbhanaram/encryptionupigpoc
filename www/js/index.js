document.addEventListener('deviceready', onApplicationStarted, false);
document.addEventListener('resume', onApplicationStarted, false);

function onApplicationStarted() {
  // Function to update the certificate to the iOS key-chain
  function updateCertificate() {
    cordova.plugin.rsacertificate.updateCertificate(
      function(newCertificateInstalled) {
        if (newCertificateInstalled) {
          cordova.plugin.rsacertificate.deleteDataFiles(function() {
            alert('Successfully installed the new cerficate!\n\nPlease select a data file and use the Open in... functionality in order to use this application.');
          });
        } else {
          getData();
        }
      }.bind(this),
      function(errorMessage) {
        alert(errorMessage);
      }
    );
  }

  // Function to decrypt the data file
  function getData() {
    cordova.plugin.rsacertificate.decryptFile(
      function(fileContent) {
        alert(fileContent);
      },
      function(errorMessage) {
        alert(errorMessage);
      }
    );
  }

  updateCertificate();
}