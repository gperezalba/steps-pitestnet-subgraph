import { Address, BigDecimal, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/templates/Token/Token"

import { 
    Transaction,
    Token,
    TokenBalance, 
    Wallet
} from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"

export function handleTransfer(event: Transfer): void {
    //addToken(event.address);
    newTransaction(event);
}

/***************************************************************/
// TRANSACTION
/***************************************************************/

export function newTransaction(event: Transfer): void {
    let txId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let tx = Transaction.load(txId);

    if (tx == null) {
        let txId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
        tx = createTransaction(
            txId, 
            event.params.from, 
            event.params.to, 
            event.address.toHexString(), 
            event.params.value.toBigDecimal(), 
            event.params.data, 
            event.block.timestamp, 
            event.transaction.gasUsed.toBigDecimal().times(event.transaction.gasPrice.toBigDecimal()),
            false
        );
    }

    /*if (event.params.from == Address.fromI32(0)) {
        handleTokenMint(event.address.toString(), event.params.value.toBigDecimal());
    }

    if (event.params.to == Address.fromI32(0)) {
        handleTokenBurn(event.address.toString(), event.params.value.toBigDecimal());
    }*/

    //pushWalletTransaction(tx as Transaction, event.params.to.toString());
    //pushWalletTransaction(tx as Transaction, event.params.from.toString());
}

export function createTransaction(
    txId: string,
    from: Address,
    to: Address,
    currency: string,
    amount: BigDecimal,
    data: Bytes,
    timestamp: BigInt,
    fee: BigDecimal,
    isBankTransaction: boolean
): 
    Transaction 
{
    let tx = new Transaction(txId);

    tx.from = from;
    tx.to = to;
    tx.currency = currency;
    tx.amount = amount;
    tx.data = data;
    tx.timestamp = timestamp;
    tx.fee = fee;
    tx.isBankTransaction = isBankTransaction;

    tx.save();

    return tx as Transaction;
}