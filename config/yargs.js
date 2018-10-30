const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado/pendiente alguna tarea.'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra todos los elementos por hacer que estan en la lista de tareas por hacer', {
        completado: {
            alias: 'c',
            desc: 'Marca como completado/pendiente alguna tarea.'
        }
    })
    .command('borrar', 'Elimina un elemento por hacer de la lista de tareas por hacer', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}