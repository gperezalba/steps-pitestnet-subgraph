import { Address, BigDecimal } from "@graphprotocol/graph-ts"
import { TokenCreated } from "../generated/TokenFactory/TokenFactory"
import { Token } from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"

export function handleTokenCreated(event: TokenCreated): void {
    let token = Token.load(event.params._address.toHexString());

    if (token == null) {
        token = new Token(event.params._address.toHexString());
        let contract = TokenContract.bind(event.params._address);
        //let contract = Token.bind(event.params._address);
    
        token.tokenSymbol = contract.symbol();
        token.tokenName = contract.name();
        token.tokenDecimals = contract.decimals();
        token.totalSupply = contract.totalSupply().toBigDecimal();
    }

    token.save();
}