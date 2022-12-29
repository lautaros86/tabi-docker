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
                puntosLoc: punto ? 1 : 0,
                barriosLoc: barrio ? 1 : 0,
                habitantesLoc: total
            },
            puntosDep: punto ? 1 : 0,
            barriosDep: barrio ? 1 : 0,
            habitantesDep: total
        },
        puntosProv: punto ? 1 : 0,
        barriosProv: barrio ? 1 : 0,
        habitantesProv: total
    };
}

function initDepto(dataByZone, prov, depto, loc, barrio, total, punto) {
    dataByZone[prov][depto] = {
        [loc]: {
            puntosLoc: punto ? 1 : 0,
            barriosLoc: barrio ? 1 : 0,
            habitantesLoc: total
        },
        puntosDep: punto ? 1 : 0,
        barriosDep: barrio ? 1 : 0,
        habitantesDep: total
    };
    if (barrio) {
        dataByZone[prov].barriosProv = dataByZone[prov].barriosProv + 1
        dataByZone[prov].habitantesProv = dataByZone[prov].habitantesProv + total
    }
    if (punto) {
        dataByZone[prov].puntosProv = dataByZone[prov].puntosProv + 1
    }
}

function initLoc(dataByZone, prov, depto, loc, barrio, total, punto) {
    dataByZone[prov][depto][loc] = {
        puntosLoc: punto ? 1 : 0,
        barriosLoc: barrio ? 1 : 0,
        habitantesLoc: total
    }
}

function increaseData(dataByZone, prov, depto, loc, barrio, total, punto) {
    if (barrio) {
        dataByZone[prov][depto][loc].barriosLoc = dataByZone[prov][depto][loc].barriosLoc + 1
        dataByZone[prov][depto][loc].habitantesLoc = dataByZone[prov][depto][loc].habitantesLoc + total
        dataByZone[prov][depto].barriosDep = dataByZone[prov][depto].barriosDep + 1
        dataByZone[prov][depto].habitantesDep = dataByZone[prov][depto].habitantesDep + total
        dataByZone[prov].barriosProv = dataByZone[prov].barriosProv + 1
        dataByZone[prov].habitantesProv = dataByZone[prov].habitantesProv + total
    }
    if (punto) {
        dataByZone[prov][depto][loc].puntosLoc = dataByZone[prov][depto][loc].puntosLoc + 1
        dataByZone[prov][depto].puntosDep = dataByZone[prov][depto].puntosDep + 1
        dataByZone[prov].puntosProv = dataByZone[prov].puntosProv + 1
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
    let totalizers = ["barriosProv", "habitantesProv", "puntosProv", "barriosDep", "habitantesDep", "puntosDep", "barriosLoc", "habitantesLoc", "puntosLoc",]
    Object.keys(dataByZone).forEach(provName => {
        if (!totalizers.includes(provName)) {
            let provincia = {
                nombre: provName,
                barriosProv: dataByZone[provName].barriosProv,
                habitantesProv: dataByZone[provName].habitantesProv,
                puntosProv: dataByZone[provName].puntosProv,
                departamentos: [],
            }
            Object.keys(dataByZone[provName]).forEach(depto => {
                if (!totalizers.includes(depto)) {
                    let departamento = {
                        nombre: depto,
                        barriosDep: dataByZone[provName][depto].barriosDep,
                        habitantesDep: dataByZone[provName][depto].habitantesDep,
                        puntosDep: dataByZone[provName][depto].puntosDep,
                        localidades: [],
                    }
                    Object.keys(dataByZone[provName][depto]).forEach(loc => {
                        if (!totalizers.includes(loc)) {
                            let localidad = {
                                nombre: loc,
                                barriosLoc: dataByZone[provName][depto][loc].barriosLoc,
                                habitantesLoc: dataByZone[provName][depto][loc].habitantesLoc,
                                puntosLoc: dataByZone[provName][depto][loc].puntosLoc,
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