import fs from 'fs';
import http from 'http';
import https from 'https';
import pLimit from 'p-limit';

// Fungsi untuk mengecek URL dan mengembalikan true jika status code adalah 200
function checkUrl(url) {
  return new Promise((resolve) => {
    // Pilih modul yang sesuai berdasarkan protokol (http atau https)
    const client = https;
    
    const req = client.get(url, (res) => {
      const statusCode = res.statusCode;
      // Jika status code 200, file dianggap ditemukan
      if (statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    // Tangani kemungkinan error pada request (misalnya masalah koneksi)
    req.on('error', (err) => {
      console.error(`Error pada URL ${url}: ${err.message}`);
      resolve(false);
    });
    
    req.end();
  });
}

// Membaca file JSON yang berisi array objek
const filePath = './file_url.json';
const rawData = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(rawData);

// Membatasi concurrency, misalnya hanya 10 request bersamaan
const limit = pLimit(10);

(async () => {
  // Untuk setiap objek JSON, cek apakah URL file-nya ada
  const cekPromises = jsonData.map(data =>
    limit(() =>
      checkUrl(data.url)
        .then(exists => ({ ...data, exists }))
    )
  );
  
  const results = await Promise.all(cekPromises);
  
  // Menampilkan hasil pengecekan di console
  results.forEach(result => {
    console.log(
      `URL: ${result.url} => ${result.exists ? 'File ditemukan' : 'File tidak ditemukan'}`
    );
  });
  
  // Opsional: Simpan hasil pengecekan ke file baru
  fs.writeFileSync('./results.json', JSON.stringify(results, null, 2));
})();
