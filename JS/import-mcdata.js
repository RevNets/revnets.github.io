document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/mcapp-data.json')
        .then(response => response.json())
        .then(data => {
            const appGrid = document.getElementById('app-grid');
            data.apps.forEach(app => {
                const appItem = document.createElement('div');
                appItem.classList.add('app-item');
                appItem.innerHTML = `
                    <img src="${app.iconSrc}" alt="${app.name} Icon" class="app-icon">
                    <h3>${app.name}</h3>
                    <p>Version: ${app.version}</p>
                    <a href="#" class="download-link" data-url="${app.downloadUrl}">Download</a>
                `;
                appGrid.appendChild(appItem);
            });

            // Re-initialize download links
            initializeDownloadLinks();
        })
        .catch(error => console.error('Error loading app data:', error));
});

function initializeDownloadLinks() {
    const downloadLinks = document.querySelectorAll('.download-link');
    const modal = document.getElementById('download-modal');
    const confirmButton = document.getElementById('confirm-download');
    const cancelButton = document.getElementById('cancel-download');
    let currentUrl = '';

    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentUrl = link.getAttribute('data-url');
            modal.style.display = 'block';
        });
    });

    confirmButton.addEventListener('click', () => {
        window.location.href = currentUrl;
        modal.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
