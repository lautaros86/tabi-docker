
function quitarAcentos(cadena) {
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();
}
function incrementarProvDepto(object, prov, depto) {
    object[prov][depto].totalDepartamento = object[prov][depto].totalDepartamento + 1;
    object[prov].totalProvincia = object[prov].totalProvincia + 1;
}
function getPointsByZone(rawdata) {
    let pointsByZone = {};
    rawdata.data.forEach(punto => {
        if(punto.departamento == null) punto.departamento = punto.localidad
        let prov = quitarAcentos(punto.provincia)
        let depto = quitarAcentos(punto.departamento)
        let loc = quitarAcentos(punto.localidad)
        if (!pointsByZone[prov]) {
            pointsByZone[prov] = { totalProvincia: 1, [depto]: { [loc]: 1, totalDepartamento: 1 } };
        } else {
            if (!pointsByZone[prov][depto]) {
                pointsByZone[prov][depto] = { [loc]: 1, totalDepartamento: 1 }
                pointsByZone[prov].totalProvincia = pointsByZone[prov].totalProvincia + 1;
            } else {
                pointsByZone[prov][depto][loc] = !pointsByZone[prov][depto][loc] ? 1 : pointsByZone[prov][depto][loc] + 1;
                incrementarProvDepto(pointsByZone, prov, depto)
            }
        }
    })
    return pointsByZone;
}

module.exports = {
    getPointsByZone,
}