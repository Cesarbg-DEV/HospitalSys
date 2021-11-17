const morgan = require('morgan');
const express = require('express'); 
const app = express();
const pacientes = require('./routes/pacientes');
const personal = require('./routes/personal');
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/personal", personal);
app.use(auth);
app.use("/pacientes", pacientes );
app.use(notFound);


app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrado" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});