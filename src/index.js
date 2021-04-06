const { request } = require("@octokit/request");
const express = require('express')
const app = express()
const port = 8081

app.use(express.json());

app.post('/checker/deploy', async (req, res) => {

    process.on('unhandledRejection', _ => {});
    let status = await requestDeployment(req.body.URL_ITEM, req.body.ID_ITEM, req.body.MAX_PRICE);
    res.sendStatus(status);

});

async function requestDeployment(url, id, price) {
    let url = body.URL_ITEM
    let id = body.ID_ITEM
    let price = body.MAX_PRICE
    let deployName = body.DEPLOY_NAME

    request("POST /repos/{owner}/{repo}/deployments", {
        owner: "gg-restock",
        repo: "pcc-checker",
        ref: "main",
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`
        },
        payload: {  
            URL_ITEM: url,
            ID_ITEM: id,
            MAX_PRICE: price,
            DEPLOY_NAME: deployName
        }
    })
    .then(response => console.log(`${response.status} - Deployment created for product: ${url} with id: ${id} and max price: ${price}`))
    .catch(error => console.log(error));
}

app.listen(port, () => {
    console.log(`Server up, listening on ${port}`)
})
