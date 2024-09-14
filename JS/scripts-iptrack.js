async function getIPInfo(ip = '') {
    const apiKey = '342b9a20c0c640c4bb78f9c22c714e67';
    const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const ipInfoElement = document.getElementById('ip-info');
        ipInfoElement.innerHTML = `
            <h4>Informasi IP${ip ? ` untuk ${ip}` : ' Anda'}:</h4>
            <p><strong>IP Address:</strong> ${data.ip}</p>
            <p><strong>Hostname:</strong> ${data.hostname || 'Tidak tersedia'}</p>
            <p><strong>Benua:</strong> ${data.continent_name} (${data.continent_code})</p>
            <p><strong>Negara:</strong> ${data.country_name} (${data.country_code2})</p>
            <p><strong>Ibukota Negara:</strong> ${data.country_capital}</p>
            <p><strong>Provinsi:</strong> ${data.state_prov}</p>
            <p><strong>Kota:</strong> ${data.city}</p>
            <p><strong>Kode Pos:</strong> ${data.zipcode}</p>
            <p><strong>Latitude:</strong> ${data.latitude}</p>
            <p><strong>Longitude:</strong> ${data.longitude}</p>
            <p><strong>Bagian dari EU:</strong> ${data.is_eu}</p>
            <p><strong>Kode Panggilan:</strong> ${data.calling_code}</p>
            <p><strong>TLD Negara:</strong> ${data.country_tld}</p>
            <p><strong>Bahasa:</strong> ${data.languages}</p>
            <p><strong>Bendera Negara:</strong> <img src="${data.country_flag}" alt="${data.country_name} flag" style="width: 32px; height: auto;"></p>
            <p><strong>ISP:</strong> ${data.isp}</p>
            <p><strong>Tipe Koneksi:</strong> ${data.connection_type || 'Tidak tersedia'}</p>
            <p><strong>Organisasi:</strong> ${data.organization}</p>
            <p><strong>ASN:</strong> ${data.asn}</p>
            <p><strong>Mata Uang:</strong> ${data.currency.name} (${data.currency.code}) - ${data.currency.symbol}</p>
            <p><strong>Zona Waktu:</strong> ${data.time_zone.name}</p>
            <p><strong>Waktu Saat Ini:</strong> ${data.time_zone.current_time}</p>
        `;
    } catch (error) {
        console.error('Error fetching IP information:', error);
        document.getElementById('ip-info').innerHTML = '<p>Gagal memuat informasi IP. Silakan coba lagi nanti.</p>';
    }
}
window.addEventListener('load', () => getIPInfo());
document.getElementById('search-button').addEventListener('click', () => {
    const ipInput = document.getElementById('ip-input').value;
    getIPInfo(ipInput);
});
document.getElementById('ip-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const ipInput = document.getElementById('ip-input').value;
        getIPInfo(ipInput);
    }
});