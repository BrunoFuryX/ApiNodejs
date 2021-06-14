const db = require('../infra/db');

exports.getCity = function(){
    return db.query('select * from blueone.city');
};

exports.getCityByID = function(id){
    return db.query('select * from blueone.city where id=$1',[id]);
};

exports.getCityByCity = function(city){
    return db.query('select * from blueone.city where city=$1',[city]);
};

exports.getCityByCountry = function(country){
    return db.query('select * from blueone.city where country=$1',[country]);
};

exports.saveCity = function(city){
    return db.one('insert into blueone.city (city, country) values ($1, $2) returning *', [city.city, city.country]);
};

exports.deleteCity = function(id){
    return db.none('delete from blueone.city where id=$1', [id]);
};

exports.updateCity = function(id, city){
    return db.none('update blueone.city set city=$1, country=$2 where id=$3', [city.city, city.country, id]);
};