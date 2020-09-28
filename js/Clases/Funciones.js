import Citas from './Citas.js';
import UI from './UI.js';

import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './Selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

//Objeto con la información del turno médico veterinario

const citaObjeto = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e){
    citaObjeto[e.target.name] = e.target.value;

}

//Valida y agrega un nuevo turno médico 

export function nuevaCita(e){
    e.preventDefault();

    //Extraer la información del Objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObjeto;

    //Validar información
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto a modo edición

        administrarCitas.editarCita({...citaObjeto});

        //Volver el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Desactivar modo edición
        editando = false;

    } else {
        //Generar un id único

        citaObjeto.id = Date.now();

        //Creando una nueva cita

        administrarCitas.agregarCita({...citaObjeto});

        //Mensaje de agregado correctamente 
        ui.imprimirAlerta('Se agregó correctamente');
    }

    //Reiniciar el objeto para la validación
    reinicarObjeto();

    //Resetear el formulario 
    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reinicarObjeto(){
    citaObjeto.mascota = '';
    citaObjeto.propietario = '';
    citaObjeto.telefono = '';
    citaObjeto.fecha = '';
    citaObjeto.hora = '';
    citaObjeto.sintomas = '';
}

export function eliminarCita(id){
    //Eliminar las citas

    administrarCitas.eliminarCita(id);

    //Mostrar un mensaje

    ui.imprimirAlerta('El turno se eliminó correctamente');
    
    //Refresca la página y los turnos
    ui.imprimirCitas(administrarCitas);
}

//Cargar los datos y el modo de edición

export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas} = cita;
    
    //Llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el Objeto 
    citaObjeto.mascota = mascota;
    citaObjeto.propietario = propietario;
    citaObjeto.telefono = telefono;
    citaObjeto.fecha = fecha;
    citaObjeto.hora = hora;
    citaObjeto.sintomas = sintomas;

    //Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar';

    editando = true;
}
