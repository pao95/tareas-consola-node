const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  get listadoTareas() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  listadoCompleto() {
    for (let index = 0; index < this.listadoTareas.length; index++) {
      const idx = `${index + 1}.`.green;
      console.log(
        `${idx} ${this.listadoTareas[index].desc} :: ${
          this.listadoTareas[index].completadoEn
            ? "Completado".green
            : "Pendiente".red
        }`
      );
    }
  }
  cargarTareasfromDB(tareas) {
    for (let index = 0; index < tareas.length; index++) {
      this._listado[tareas[index].id] = tareas[index];
    }
  }
  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  listarTareasByEstado(completadas = true) {
    const tareasCompletadas = [];
    const tareasIncompletas = [];

    this.listadoTareas.forEach((tarea) => {
      tarea.completadoEn
        ? tareasCompletadas.push(tarea)
        : tareasIncompletas.push(tarea);
    });

    completadas
      ? tareasCompletadas.forEach((tarea, i) => {
          const idx = `${i + 1}.`.green;
          const estado = `Completado`.green;

          console.log(`${idx} ${tarea.desc} :: ${estado}`);
        })
      : tareasIncompletas.forEach((tarea, i) => {
          const idx = `${i + 1}.`.green;
          const estado = `Pendiente`.red;

          console.log(`${idx} ${tarea.desc} :: ${estado}`);
        });
  }

  toggleEstadoTarea(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoTareas.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
