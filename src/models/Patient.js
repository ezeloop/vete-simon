const mongoose	= require('mongoose');
const Schema	= mongoose.Schema;

const pacienteSchema = Schema({
    tipoMascota: String,
    nombre: {
        type: String,
        required: [true, 'Porfavor no ingrese un nombre vacio']
    },
    legajo: {
        type: Number,
        required: [true, 'Porfavor no ingrese un legajo vacio']
    },
    fechaNacimiento: Date,
    pesoMascota: {
        type: Number,
        required: [true, 'Porfavor no ingrese un peso vacio']
    }
})

module.exports = mongoose.model('Paciente', pacienteSchema)