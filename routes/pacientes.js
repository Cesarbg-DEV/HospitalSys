const express = require('express');
const pacientes = express.Router();
const db = require('../config/database');

pacientes.post("/", async (req, res, next) => {
    const {pat_name, adm_date, alta, id, diagnostico} = req.body;
    
    if (pat_name && adm_date && alta && id && diagnostico) {
        let query = "INSERT INTO pacientes(pat_name, adm_date, alta, id, diagnostico)";
        query += `VALUES ('${pat_name}','${adm_date}','${alta}','${id}','${diagnostico}');`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pacientes.delete('/:pat_id([0-9]{1,3})', async (req, res, next) => {

    const query = `DELETE FROM pacientes WHERE pat_id = ${req.params.pat_id};`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Usuario borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Usuario no encontrado" });

});

pacientes.put('/:pat_id([0-9]{1,3})', async (req, res, next) => {
    const {pat_name, adm_date, alta, id, diagnostico} = req.body;

    if (pat_name && adm_date && alta && id && diagnostico) {
        let query = `UPDATE pacientes SET pat_name= '${pat_name}', adm_date='${adm_date}', alta='${alta}', id='${id}', diagnostico='${diagnostico}' `;
        query += `WHERE pat_id = ${req.params.pat_id};`;

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });

    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pacientes.patch('/:pat_id([0-9]{1,3})', async (req, res, next) => {

    if (req.body.id) {
        let query = `UPDATE pacientes SET id= '${req.body.id}' WHERE pat_id = ${req.params.pat_id}`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Usuario no encontrado" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

});


pacientes.get('/', async(req, res, next) => {
    const st = await db.query("SELECT * FROM pacientes ");
    return res.status(200).json({code: 200, message: st });
});

pacientes.get('/:pat_id([0-9]{1,3})', async (req, res, next) => {
    const pat_id = req.params.pat_id;
    if (pat_id >= 1 && pat_id <= 2) {
        const st = await db.query("SELECT * FROM pacientes  WHERE pat_id = "+pat_id+";")
        return res.status(200).json({code: 200, message: st})
    }
    return res.status(404).json({code: 404, message: "Usuario no encontrado"});
    
});


pacientes.get('/:pat_name([a-zA-Z_ ]*$)', async(req, res, next) => {
    const name = req.params.pat_name;
    const st = await db.query("SELECT * FROM pacientes  WHERE pat_name ='"+name+"';");
    if (st.length > 0) {
        return res.status(200).json({code: 200, message: st})
    }
    return res.status(404).json({code: 404, message: "Usuario no encontrado"});
        
});

module.exports = pacientes ;