function formatDateBaloon(date = new Date(year, month, day, hour, minute)) {
    function check(elem) {
        if(elem < 10) elem = '0' + elem;
    }

    let dd = date.getDate();
    check(dd)

    let mm = date.getMonth() + 1;
    check(mm)

    let yy = date.getFullYear();
    let se = date.getSeconds();
    check(se)

    let mi = date.getMinutes();
    check(mi)

    let hr = date.getHours();
    check(hr)

    return `${yy}.${mm}.${dd} ${hr}:${mi}:${se}`;
}
function formatDateModal(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
}

export {
    formatDateBaloon,
    formatDateModal
}