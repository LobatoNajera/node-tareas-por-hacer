const argv = require('./config/yargs').argv;
let colors = require('colors');
const porHacer = require('./por_hacer/por_hacer');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);

        if (tarea) {
            console.log(`La tarea '${ argv.descripcion }' se registro correctamente`.green);
        }

        break;

    case 'listar':

        let listado;

        if (argv.completado == "si" | argv.completado == "no") {
            listado = porHacer.getListadoCompletado(argv.completado);
        } else {
            listado = porHacer.getListado();
        }

        console.log(`////////////////////////////////////////////////////////////////////////////////////////////////`.yellow);
        console.log(`_________________________________________ Inicio: Listar _______________________________________\n`.yellow);

        for (let tarea of listado) {
            if (tarea.completado) {
                console.log(`======================== Tarea completada =======================`.green);
                console.log(`Tarea: ${tarea.descripcion}`.green);
                console.log(`Estado: ${ tarea.completado }`.green);
                console.log(`=================================================================`.green);
            } else {
                console.log(`======================== Tarea no completada =======================`.red);
                console.log(tarea.descripcion);
                console.log(`Estado: ${ tarea.completado }`);
                console.log(`====================================================================`.red);
            }
        }

        console.log(`\n_________________________________________ Fin: Listar _______________________________________`.yellow);
        console.log(`////////////////////////////////////////////////////////////////////////////////////////////////`.yellow);

        break;

    case 'actualizar':
        let resultado = porHacer.actualizar(argv.descripcion, argv.completado);

        if (resultado) {
            console.log(`La tarea '${ argv.descripcion }' se actualizo correctamente`.green);
        } else {
            console.log(`Error... la tarea '${ argv.descripcion }' no se pudo actualizar`.red);
        }

        break;

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);

        if (borrar) {
            console.log(`La tarea '${ argv.descripcion }' se elimino correctamente`.green);
        } else {
            console.log(`Error... La tarea por hacer '${ argv.descripcion }' no se pudo eliminar`.red);
        }
        break;

    default:
        console.log(`Comando no reconocido`);
}