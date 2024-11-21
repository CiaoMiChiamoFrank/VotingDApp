// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Voting {
    
    uint256 carmine;
    uint256 pix;
    mapping(address => bool) accounts;
    mapping(address => bool) voto;

    function votazione(string memory _value) public dontExistAccount(){
        require(voto[msg.sender] == false, "Voto already exist");
        if (keccak256(bytes(_value)) == keccak256(bytes("carmine"))) {
            carmine = carmine + 1;
        } else if(keccak256(bytes(_value)) == keccak256(bytes("pix"))) {
            pix = pix +1;
        }
        voto[msg.sender] = true;
    }

    function createAccount () public existAccount() {
        accounts[msg.sender] = true;
        voto[msg.sender] = false;
    }

    modifier existAccount() {
        require(accounts[msg.sender] == false, "L'account already exist");
        _;
    }

    modifier dontExistAccount() {
        require(accounts[msg.sender] == true, "L'account don't exist");
        _;
    }

    function getCarmine () public view returns(uint256) {
        return carmine;
    }

    function getPix () public view returns(uint256) {
        return pix;
    }

    function isAccount () public view returns (bool){
        return accounts[msg.sender];
    }

}