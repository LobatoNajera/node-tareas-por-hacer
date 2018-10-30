const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (error) => {
        if (error) {
            throw new Error(`No se pudieron registrar los cambios`, error);
        }
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const getListadoCompletado = (completado) => {
    cargarDB();
    let valorCompletado = false;

    if (completado == "si") {
        valorCompletado = true;
    }

    let nuevoListado = listadoPorHacer.filter((tarea) => tarea.completado === valorCompletado);
    return nuevoListado;
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return true;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);
    let nuevoListado = listadoPorHacer.filter((tarea) => tarea.descripcion !== descripcion);
    /*let nuevoListado = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion !== descripcion;
    });*/

    if (listadoPorHacer.length !== nuevoListado.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

module.exports = {
    crear,
    actualizar,
    getListado,
    getListadoCompletado,
    borrar
}