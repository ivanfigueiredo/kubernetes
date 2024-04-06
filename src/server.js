const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT ?? 9000;
const date = new Date();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("src", "src/")
app.engine("ejs", require('ejs').__express);

app.get('/', (req, res) => {
    res.json({
        OK: true,
        Service: "B"
    });
});

app.get('/healthz', (req, res) => {
    const duration = date.getSeconds();
    if (duration < 20) {
        res.status(500).json({error: 'Internal Server Error', duration});
    }
    res.status(200).json({OK: true, timestamp: date.toISOString()});
});

app.listen(PORT, () => {console.log(`Rodando na porta ${PORT}`)});