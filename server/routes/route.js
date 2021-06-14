const express = require('express')
const router = express.Router();
const clientService = require('../service/clientService')
const cityService = require('../service/cityService')

// City Route
    router.get('/city', async function( req, res){
        const city = await cityService.getCity();
        res.json(city)
    });

    router.get('/city/city/:city', async function( req, res){
        const province = req.params.city
        const city = await cityService.getCityByCity(province);
        res.json(city)
    });

    router.get('/city/country/:country', async function( req, res){
        const country = req.params.country
        const city = await cityService.getCityByCountry(country);
        res.json(city)
    });

    router.post('/city', async function( req, res){
        const data = req.body
        const city = await cityService.saveCity(data);
        res.json(city)
    });

    router.put('/city/:id', async function( req, res){
        const id = req.params.id
        const data = req.body
        await cityService.updateCity(id, data);
        res.end()
    });

    router.delete('/city/:id', async function( req, res){
        const id = req.params.id
        console.log(id)
        await cityService.deleteCity(id);
        res.end()
    });


// Client Route
    router.get('/client', async function( req, res){
        const client = await clientService.getClient();
        res.json(client)
    });

    router.get('/client/id/:id', async function( req, res){
        const id = req.params.id
        const client = await clientService.getClientByID(id);
        res.json(client)
    });

    router.get('/client/name/:name', async function( req, res){
        const name = req.params.name
        const client = await clientService.getClientByName(name);
        res.json(client)
    });

    router.post('/client', async function( req, res){
        const data = req.body
        const client = await clientService.saveClient(data);
        res.json(client)
    });

    router.put('/client/:id', async function( req, res){
        const id = req.params.id
        const data = req.body
        await clientService.updateClient(id, data);
        res.end()
    });

    router.delete('/client/:id', async function( req, res){
        const id = req.params.id
        await clientService.deleteClient(id);
        res.end()
    });


module.exports = router;