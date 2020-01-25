const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const Connection = require('./models/Connection');

let io;

module.exports = {
    async setupWebsocket(server) {
        io = socketio(server);

        io.on('connection', async (socket) => {
            const { latitude, longitude, techs } = socket.handshake.query;

            let id = socket.id;

            let connection = await Connection.findOne({ id });

            if (!connection) {
                await Connection.create({
                    id,
                    techs: parseStringAsArray(techs),
                    coordinates: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                });
            }
        });
    },

    async findConnections(coordinates, techs) {
        const { latitude, longitude } = coordinates;

        const connections = await Connection.find({
            techs: {
                $in: techs
            },
            coordinates: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return connections;
    },

    sendMessage(to, message, data) {
        to.forEach(connection => {
            io.to(connection.id).emit(message, data);
        });
    }
}