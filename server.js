var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var uri = "mongodb+srv://system:admin@cluster01-rf8sy.mongodb.net/test?retryWrites=true&w=majority";

var db = mongoose.connect(uri, { useNewUrlParser: true }).then(function(err, response) {
    if (err) { console.log(err); } else { console.log('Conectado a ' + db + ' + ' + response); }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongoose.Schema;

var personaSchema = new Schema({
    documento: { type: Number },
    nombre: { type: String },
    apellido: { type: String },
    fecha_inicio: { type: String },
    fecha_fin: { type: String },
    hora_inicio: { type: String },
    hora_fin: { type: String },
    hora_inicio_extra: { type: String },
    hora_fin_extra: { type: String }
}, { versionKey: false });

var model = mongoose.model('personas', personaSchema, 'personas');

app.post("/api/registrarPersona", function(req, res) {
    var mod = new model(req.body);
    mod.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: "Registro insertado" });
        }
    });
});

app.post("/api/actualizarHora", function(req, res) {
    var mod = new model(req.body);
    model.findByIdAndUpdate(req.body._id, { hora_inicio_extra: req.body.hora_inicio_extra, hora_fin_extra: req.body.hora_fin_extra },
        function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Registro actualizado" });
            }
        });
});

app.get("/api/listaPersonas", function(req, res) {
    model.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.listen(8081, function() {
    console.log('API escuchando en puerto 8081');
});