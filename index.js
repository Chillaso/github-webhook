"use strict";

const { Octokit } = require("@octokit/core");
const express = require('express');
const app = express()
const port = 8081
const octokit = new Octokit({auth: `${process.env.AUTH_TOKEN}`});

app.use(express.json());

app.post('/checker/deploy', async (req, res) => {

    process.on('unhandledRejection', _ => {});
    console.log(req.body);
    let status = await requestDeployment(req.body.URL_ITEM, req.body.ID_ITEM, req.body.MAX_PRICE);
    res.sendStatus(status);

});

async function requestDeployment(url, id, price) {
    try{
        var response = await octokit.request("POST /repos/gg-restock/pcc-checker/deployments", {
            headers: {
                accept: "application/vnd.github.v3+json"
            },
            ref: "main",
            payload: {  
                URL_ITEM: url,
                ID_ITEM: id,
                MAX_PRICE: price
            }
        });
    } catch(error){
        console.log(error);
    }

    if(response.status == 201){
        console.log(`Deployed checker with url: ${url} --- id: ${id} and max price: ${price}`);
    } else {
        console.log('Failed to deploy checker');
    }
    return response.status;
}

app.listen(port, () => {
    console.log(`Server up, listening on ${port}`)
})