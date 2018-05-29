module.exports = [
	{
		"constant": true,
		"inputs": [],
		"name": "fetchFinalValue",
		"outputs": [
			{
				"name": "finVal",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "bets",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "place_bet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "updateOracle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "urlToFetch",
				"type": "string"
			},
			{
				"name": "jqFilter",
				"type": "string"
			}
		],
		"name": "fetch",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "callback",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "urlToFetch",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "jqFilter",
				"type": "string"
			}
		],
		"name": "UrlToFetch",
		"type": "event"
	}
]
