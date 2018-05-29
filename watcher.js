const Web3 = require('web3');
const fetch = require('node-fetch');
const jq = require('node-jq');
const abi = require('./abi');

const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));

var oracle = new web3.eth.Contract(abi);
oracle.options.address = "0x90d7752419f66be567861b5ad0b7d02da96e190c";

const fetchit = async (url) => {
  const req = await fetch(url);

  if (req.status === 404) {
    throw new Error('block not found');
  }

  return req.json();
};

var eventListener = oracle.events.UrlToFetch();

eventListener.on("data", async (event) => {
  const url = event.returnValues[0];
  const jqFilter = event.returnValues[1];

  console.log('got params:', url, jqFilter);
  try {
    const result = await fetchit(url);
  } catch (e) {
    console.log('fetch error (could just be no block yet)')
    console.log(e);
  }

  const valueOfInterest = await jq.run(jqFilter, result, {input: 'json'});

  console.log(valueOfInterest);

  const timestamp = new Date(valueOfInterest.replace(/\"/g, '')).getTime();

  console.log('timestamp', timestamp);

  const foo = await oracle.methods.callback(timestamp).send({from: '0xad38020a70a4fb1cd4269f5a981487561204e00e'});
  console.log('complete');
});

eventListener.on("error", (err) => {
  console.error('big bang', err);
})
