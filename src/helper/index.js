export const numberWithCommas = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
}

export const convertDate = (date) => {
    let bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    let tanggal = date.getDate();
    let _bulan = bulan[date.getMonth()]; 
    let _tahun = date.getYear();
    let tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
    return `${tanggal} ${_bulan} ${tahun}` 
}