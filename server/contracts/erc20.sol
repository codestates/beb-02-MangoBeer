// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NewMangoToken is ERC20, Ownable {
    constructor() ERC20("NewMangoToken", "MANGO") {
    }

    function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        _approve(to, msg.sender, allowance(to, msg.sender) + amount);  // approve 추가

        return true;
    }

    function transferEach( address from, address to, uint256 amount) public onlyOwner returns (bool) {
        address spender = _msgSender(); // owner
        _spendAllowance(from, spender, amount); // allowance 차감(allowance 지불)
        _transfer(from, to, amount); // 토큰 교환(balance 차감)
        _approve(to, spender, allowance(to, spender) + amount); // approve 또 걸어줌
        return true;
    }
}
