const db = require('../infra/db');

exports.getClient = function(){
    return  db.query('select * from blueone.client');
};

exports.getClientByID = function(id){
    return db.one('select * from blueone.client where id=$1',[id]);
};

exports.getClientByName = function(name){
    return db.query('select * from blueone.client where name=$1',[name]);
};

exports.saveClient = function(client){
    return db.one('insert into blueone.client (name, gender, born, age, city) values ($1, $2, $3, $4, $5) returning *', [client.name, client.gender, client.born, client.age, client.city] );
};

exports.deleteClient = function(id){
    return db.none('delete from blueone.client where id=$1', [id]);
}

exports.updateClient = function(id, client){
    return db.none('update blueone.client set name=$1, gender=$2, born=$3, age=$4, city=$5 where id=$6', [client.name, client.gender, client.born, client.age, client.city, id]);
}