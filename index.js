"use strict";

const { Octokit } = require("@octokit/core");

async function main() {
const octokit = new Octokit({auth: `787b7faf634784d01ce27c19d52482442a87b771`});

const response = await octokit.request("POST /repos/gg-restock/pcc-checker/deployments", {
    payload: {test: "test"}
})

}
main();