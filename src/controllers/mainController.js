const express = require('express')
const path = require('path')
const Patient = require('../models/Patient')

const mainController = {
    indeX(req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    },

    showConsulta(req, res) {
        res.render('consultarPaciente')
    },

    findPatient(req, res) {
        const legajo = req.body.legajoMascota;

        try {
            Patient.findOne({legajo}, (err, paciente) => {
                if (err) {
                    console.log('Error buscando paciente', err)
                }

                if (!paciente) {
                    return res.render('NoPatientFounded', {legajo});
                }

                let year = paciente.fechaNacimiento.getFullYear();
                let month = paciente.fechaNacimiento.getMonth() + 1;
                let day = paciente.fechaNacimiento.getDay();

                

                let nacimiento = day + '/' + month + '/' + year;

                let hoy = new Date();
                //const cumpleanos = new Date(paciente.fechaNacimiento);
                let cumpleanos = new Date(paciente.fechaNacimiento)
                let edad = hoy.getFullYear() - cumpleanos.getFullYear();
                let m = hoy.getMonth() - cumpleanos.getMonth;
                

                if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                    edad--;
                    return edad
                }
               
                console.log("la edad es"+edad);

                const pacienteBuscado = {
                    legajo: legajo,
                    nombre: paciente.nombre,
                    tipoM: paciente.tipoMascota,
                    peso: paciente.pesoMascota,
                    fechaNa: paciente.fechaNacimiento,
                    nacimiento,
                    edad
                }
                return res.render('resultadoPaciente', pacienteBuscado);

            })


        } catch (e) {
            console.log(e)
            return res.render('404');
        }
    },

    showRegistro(req, res) {
        res.render('registrarPaciente')
    },

    createPatient(req, res) {
        const tipoMasc = req.body.tipoMascota
        const nomb = req.body.nombreMascota
        const leg = req.body.legajoMascota
        const fechaNac = req.body.bday
        const pesoMasc = req.body.pesoMascota

        const paciente = new Patient({
            tipoMascota: tipoMasc,
            nombre: nomb,
            legajo: leg,
            fechaNacimiento: fechaNac,
            pesoMascota: pesoMasc
        })

        paciente.save();

        res.redirect('/');
    },
    showAbout(req, res) {
        res.render('about')
    },
}

module.exports = mainController
