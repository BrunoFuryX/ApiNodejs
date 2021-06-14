const clientData = require('../data/clientData')

exports.getClient = function() {
    return clientData.getClient();
};

exports.getClientByID = function(id) {
    return clientData.getClientByID(id);
};

exports.getClientByName = function(name) {
    return clientData.getClientByName(name);
};

exports.saveClient = function(client) {
    return clientData.saveClient(client);
};

exports.deleteClient = function(id) {
    return clientData.deleteClient(id);
};

exports.updateClient = function(id, client) {
    return clientData.updateClient(id, client);
};