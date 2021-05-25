const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasfromDB(tareasDB);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareasByEstado();
        break;
      case "4":
        tareas.listarTareasByEstado(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoTareas);
        tareas.toggleEstadoTarea(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoTareas);
        if (id !== "0") {
          const resp = await confirmar("¿Está seguro?");
          if (resp) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
      default:
        break;
    }
    guardarDB(tareas.listadoTareas);
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};
main();
