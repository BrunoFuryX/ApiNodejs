const cityData = require('../data/cityData')

exports.getCity = function() {
    return cityData.getCity();
};

exports.getCityByCity = function(city) {
    return cityData.getCityByCity(city);
};

exports.getCityByCountry = function(country) {
    return cityData.getCityByCountry(country);
};
exports.getCityByID = function(id) {
    return cityData.getCityByID(id);
};

exports.saveCity = function(city) {
    return cityData.saveCity(city);
};

exports.deleteCity = function(id) {
    return cityData.deleteCity(id);
};

exports.updateCity = function(id, city) {
    return cityData.updateCity(id, city);
};