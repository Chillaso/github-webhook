const { request } = require("@octokit/request");

async function requestDeployment(url, id, price) {
    request("POST /repos/{owner}/{repo}/deployments", {
        owner: "gg-restock",
        repo: "pcc-checker",
        ref: "main",
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: "token 47c7bd0c666d97f376b0a9e5c097f29574d897b5"
        },
        payload: {  
            URL_ITEM: url,
            ID_ITEM: id,
            MAX_PRICE: price
        }
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
}

requestDeployment("a", "1", "2");
