const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const ConnectionSchema = new mongoose.Schema({
    id: String,
    techs: [String],
    coordinates: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Connection', ConnectionSchema);