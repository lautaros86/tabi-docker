function quitarAcentos(cadena) {
    const acentos = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U'
    };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}

function getTotalHabitantes(barrio) {
    let masc = barrio.personas_genero_masc ? barrio.personas_genero_masc : 0
    let fem = barrio.personas_genero_fem ? barrio.personas_genero_fem : 0
    let otro = barrio.personas_genero_otrx ? barrio.personas_genero_otrx : 0
    return masc + fem + otro
}

function initProv(dataByZone, prov, depto, loc, barrio, total, punto) {
    dataByZone[prov] = {
        [depto]: {
            [loc]: {
                puntos: punto ? 1 : 0,
                barrios: barrio ? 1 : 0,
                habitantes: total
            },
            puntos: punto ? 1 : 0,
            barrios: barrio ? 1 : 0,
            habitantes: total
        },
        puntos: punto ? 1 : 0,
        barrios: barrio ? 1 : 0,
        habitantes: total
    };
}

function initDepto(dataByZone, prov, depto, loc, barrio, total, punto) {
    dataByZone[prov][depto] = {
        [loc]: {
            puntos: punto ? 1 : 0,
            barrios: barrio ? 1 : 0,
            habitantes: total
        },
        puntos: punto ? 1 : 0,
        barrios: barrio ? 1 : 0,
        habitantes: total
    };
    if (barrio) {
        dataByZone[prov].barrios = dataByZone[prov].barrios + 1
        dataByZone[prov].habitantes = dataByZone[prov].habitantes + total
    }
    if (punto) {
        dataByZone[prov].puntos = dataByZone[prov].puntos + 1
    }
}

function initLoc(dataByZone, prov, depto, loc, barrio, total, punto) {
    dataByZone[prov][depto][loc] = {
        puntos: punto ? 1 : 0,
        barrios: barrio ? 1 : 0,
        habitantes: total
    }
}

function increaseData(dataByZone, prov, depto, loc, barrio, total, punto) {
    if (barrio) {
        dataByZone[prov][depto][loc].barrios = dataByZone[prov][depto][loc].barrios + 1
        dataByZone[prov][depto][loc].habitantes = dataByZone[prov][depto][loc].habitantes + total
        dataByZone[prov][depto].barrios = dataByZone[prov][depto].barrios + 1
        dataByZone[prov][depto].habitantes = dataByZone[prov][depto].habitantes + total
        dataByZone[prov].barrios = dataByZone[prov].barrios + 1
        dataByZone[prov].habitantes = dataByZone[prov].habitantes + total
    }
    if (punto) {
        dataByZone[prov][depto][loc].puntos = dataByZone[prov][depto][loc].puntos + 1
        dataByZone[prov][depto].puntos = dataByZone[prov][depto].puntos + 1
        dataByZone[prov].puntos = dataByZone[prov].puntos + 1
    }
}

function processData(data, dataByZone, objectType) {
    let isBarrio = objectType === "barrio";
    let isPunto = objectType === "punto";
    if (data.departamento == null) data.departamento = data.localidad
    let prov = quitarAcentos(data.provincia)
    let depto = quitarAcentos(data.departamento)
    let loc = quitarAcentos(data.localidad)
    let total = getTotalHabitantes(data)

    if (!dataByZone[prov]) {
        initProv(dataByZone, prov, depto, loc, isBarrio, total, isPunto);
    } else {
        if (!dataByZone[prov][depto]) {
            initDepto(dataByZone, prov, depto, loc, isBarrio, total, isPunto);
        } else {
            if (!dataByZone[prov][depto][loc]) {
                initLoc(dataByZone, prov, depto, loc, isBarrio, total, isPunto);
            } else {
                increaseData(dataByZone, prov, depto, loc, isBarrio, total, isPunto);
            }
        }
    }
}

function convertDataToClass(dataByZone) {
    let response = []
    let totalizers = ["barrios", "habitantes", "puntos"]
    Object.keys(dataByZone).forEach(provName => {
        if (!totalizers.includes(provName)) {
            let provincia = {
                nombre: provName,
                barrios: dataByZone[provName].barrios,
                habitantes: dataByZone[provName].habitantes,
                puntos: dataByZone[provName].puntos,
                departamentos: [],
            }
            Object.keys(dataByZone[provName]).forEach(depto => {
                if (!totalizers.includes(depto)) {
                    let departamento = {
                        nombre: depto,
                        barrios: dataByZone[provName][depto].barrios,
                        habitantes: dataByZone[provName][depto].habitantes,
                        puntos: dataByZone[provName][depto].puntos,
                        localidades: [],
                    }
                    Object.keys(dataByZone[provName][depto]).forEach(loc => {
                        if (!totalizers.includes(loc)) {
                            let localidad = {
                                nombre: loc,
                                barrios: dataByZone[provName][depto][loc].barrios,
                                habitantes: dataByZone[provName][depto][loc].habitantes,
                                puntos: dataByZone[provName][depto][loc].puntos,
                            }
                            departamento.localidades.push(localidad)
                        }
                    })
                    provincia.departamentos.push(departamento)
                }
            })
            response.push(provincia)
        }
    })
    return response
}

function getDataByZone(puntos, barrios) {
    let dataByZone = {};
    barrios.data.forEach(barrio => processData(barrio, dataByZone, "barrio"))
    puntos.data.forEach(punto => processData(punto, dataByZone, "punto"))
    return convertDataToClass(dataByZone);
}

module.exports = {
    getDataByZone,
}