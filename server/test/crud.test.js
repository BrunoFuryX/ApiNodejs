const crypto = require('crypto');
const { test, expect } = require("@jest/globals");
const axios = require('axios');
const clientService = require('../service/clientService');
const cityService = require('../service/cityService');

const PORT = process.env.PORT || 3000;

const base_url = `http://localhost:${PORT}`

const generator = function(){
    return crypto.randomBytes(10).toString('hex')
};

const generatorInt = function(){
    return Math.floor(Math.random() * 100).toString();
};

const testDate = '25/01/2001'

const request = function(url, method, data){
    return axios({ url, method, data});
};


test('Client Get', async function(){
    //given
    const infos = { name: generator(), gender: generator(), born: testDate, age: generatorInt(), city: generator() };
    const client = await clientService.saveClient( infos );
    // when
    const response = await request(`${base_url}/client` , 'get');
    const responseData = response.data;
    // then
    expect(responseData);
    await request(`${base_url}/client/${client.id}` , 'delete');

});

test('Client Save', async function(){
    //given
    const infos = { name: generator(), gender: generator(), born: testDate, age: generatorInt(), city: generator() };
    // when
    const response = await request(`${base_url}/client` , 'post', infos);
    const responseData = response.data;
    // then
    expect(responseData.name).toBe(infos.name);
    expect(responseData.gender).toBe(infos.gender);
    expect(responseData.city).toBe(infos.city);

    await request(`${base_url}/client/${responseData.id}` , 'delete');
});

test('Client Update', async function(){
    //given
    const infos = { name: generator(), gender: generator(), born: testDate, age: generatorInt(), city: generator() };
    const client = await clientService.saveClient( infos );
    // when
    client.name = generator()
    await request(`${base_url}/client/${client.id}` , 'put', client);
    
    const get = await clientService.getClientByID( client.id );
    // then
    expect(client.name).toBe(get.name);
    await request(`${base_url}/client/${client.id}` , 'delete');
});


test('City Get', async function(){
    //given
    const infos = { city: generator(), country: generator() };
    const post1 = await cityService.saveCity( infos );
    // when
    const response = await request(`${base_url}/city` , 'get');
    const responseData = response.data;
    // then
    expect(responseData);
    await cityService.deleteCity(post1.id);

});

test('City Save', async function(){
    //given
    const infos = { city: generator(), country: generator() };
    // when
    const response = await request(`${base_url}/city` , 'post', infos);
    const responseData = response.data;
    // then
    expect(responseData[0].city).toBe(infos.city);
    expect(responseData[0].country).toBe(infos.country);
    await cityService.deleteCity(responseData[0].id);
});

test('City Update', async function(){
    //given
    const infos =  { city: generator(), country: generator() };
    const city = await cityService.saveCity( infos );
    // when
    city.city = generator()
    await request(`${base_url}/city/${city.id}` , 'put', city);
    const get = await cityService.getCityByID( city.id );
    // then
    expect(city.city).toBe(get[0].city);
    await cityService.deleteCity(get[0].id);
});
