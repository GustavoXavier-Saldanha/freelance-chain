// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContratoFreelancer is Ownable {
    AggregatorV3Interface internal precoAggregator;

    address public contratante;
    address public freelancer;
    uint public valorEmDolares;
    uint public prazo;
    bool public contratoFinalizado;

    event ContratoFinalizado(uint valorPago);

    constructor(address _precoAggregatorAddress, address _freelancer, uint _valorEmDolares, uint _prazo) {
        precoAggregator = AggregatorV3Interface(_precoAggregatorAddress);
        contratante = msg.sender;
        freelancer = _freelancer;
        valorEmDolares = _valorEmDolares;
        prazo = _prazo;
        contratoFinalizado = false;
    }

    function finalizarContrato() external onlyOwner {
        require(!contratoFinalizado, "O contrato já foi finalizado");
        
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = precoAggregator.latestRoundData();

        uint valorEmEther = valorEmDolares / uint(price);
        payable(freelancer).transfer(valorEmEther);

        contratoFinalizado = true;
        emit ContratoFinalizado(valorEmEther);
    }
}
