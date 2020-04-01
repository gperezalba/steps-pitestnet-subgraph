import { Address } from "@graphprotocol/graph-ts"
import { TokenCreated } from "../generated/TokenFactory/TokenFactory"
import { Token } from "../generated/schema"

export function handleCreatedToken(event: TokenCreated): void {
    let token = Token.load(event.param._address.toHexString());

    if (token == null) {
        token = new Token(event.param._address.toHexString());
        token.tokenSymbol = "TK"
        token.tokenName = "nametk"
        token.tokenDecimals = 18;
        token.totalSupply = 1000000000 as BigDecimal;
    }

    token.save();
}