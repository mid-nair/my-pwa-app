// app.js

// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Install PWA Button functionality
let deferredPrompt;

const installButton = document.getElementById('installButton');
installButton.style.display = 'none'; // Hide the install button by default

// Show install button when the app is ready to be installed
window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
            installButton.style.display = 'none'; // Hide button after installation
        });
    });
});
