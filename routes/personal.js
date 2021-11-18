const express = require('express');
const jwt = require('jsonwebtoken');
const personal = express.Router();
const db = require('../config/database');

personal.post("/signin", async (req, res, next) => {
    const {p_name, p_email, p_password} = req.body;
    
    if (p_name && p_email && p_password) {
        let query = "INSERT INTO personal(p_name, p_email, p_password)";
        query += `VALUES ('${p_name}','${p_email}','${p_password}');`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

personal.post("/login", async (req, res, next) => {
    const { p_email, p_password} = req.body;
    const query = `SELECT * from personal WHERE p_email = '${p_email}' AND p_password = '${p_password}';`;
    const rows = await db.query(query);

    if (p_email && p_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                id: rows[0].id,
                p_password: rows[0].p_password
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else {
            return res.status(200).json({code: 401, message: "Usuario Y/O contraseña incorrectos"});
        }
    }
    return res.status(401).json({code: 500, message: "Campos incompletos"});   
});

personal.get('/', async(req, res, next) => {
    const usr = await db.query("SELECT * FROM personal");
    return res.status(200).json({code: 200, message: usr });
});

module.exports = personal;