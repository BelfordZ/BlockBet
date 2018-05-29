pragma solidity ^0.4.0;

contract Oracle {
    //bytes public withJqFilter;
    //bytes public urlToFetch;

    event UrlToFetch(string urlToFetch, string jqFilter);

    function fetch(string urlToFetch, string jqFilter) public {
        emit UrlToFetch(urlToFetch, jqFilter);
    }
}

contract BlockBet is Oracle {
    mapping(address => uint) public bets;
    address[] participating_addresses;

    string urlToFetch = "https://gastracker.io/block/5895972.json";
    string jqFilter = ".block.timestamp";

    uint public finalValue;

    function updateOracle() public {
        fetch(urlToFetch, jqFilter);
    }

    function callback(uint timestamp) public {
        finalValue = timestamp;

        int smallest_delta = 9999999999999999;
        address smallest_delta_address;

        for (uint i; i < participating_addresses.length; i++) {
            address participant = participating_addresses[i];
            int delta = int(timestamp - bets[participating_addresses[i]]);
            if (delta < smallest_delta) {
                smallest_delta_address = participant;
            }
        }

        smallest_delta_address.transfer(address(this).balance);
    }

    function place_bet(uint timestamp) public payable {
        require(msg.value == 1 ether); // requires 1 eth for a bet
        require(bets[msg.sender] <= 0); // no double bet
        bets[msg.sender] = timestamp;
        participating_addresses.push(msg.sender);
    }
}