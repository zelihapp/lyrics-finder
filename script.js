async function getLyrics() {
    const artist = document.getElementById("artist").value.trim();
    const song = document.getElementById("song").value.trim();
    const lyricsDiv = document.getElementById("lyrics");

    if (!artist || !song) {
        lyricsDiv.innerText = "Lütfen sanatçı ve şarkı adını giriniz.";
        return;
    }

    // URL encoding eklenmiş hali
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Şarkı bulunamadı veya API cevap vermedi.");
        }

        const data = await response.json();

        // API bazen boş sonuç döndürebilir, onu da kontrol edelim
        if (!data.lyrics) {
            lyricsDiv.innerText = "Şarkı sözleri bulunamadı.";
        } else {
            lyricsDiv.innerText = data.lyrics;
        }

    } catch (error) {
        lyricsDiv.innerText = `Hata: ${error.message}`;
    }
}
