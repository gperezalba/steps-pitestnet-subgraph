import { Address } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/templates/Wallet/Wallet"

import { 
    Wallet,
    Token,
    Transaction,
    BankTransaction,
    BankFee
} from "../generated/schema"

import { Token as TokenContract } from "../generated/templates/Token/Token"

import { createTransaction } from "./token"

export function handleTransfer(event: Transfer): void {
    let txId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let tx = Transaction.load(txId);

    if (tx == null) {
        let txId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
        createTransaction(
            txId, 
            event.address, 
            event.params.to, 
            event.address.toHexString(), 
            event.params.value.toBigDecimal(), 
            event.params.data, 
            event.block.timestamp, 
            event.transaction.gasUsed.toBigDecimal().times(event.transaction.gasPrice.toBigDecimal()),
            true
        );
    }

    /*let bankTxId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    let bankTransaction = BankTransaction.load(bankTxId);

    if (bankTransaction == null) {
        bankTransaction = new BankTransaction(bankTxId);
    }

    bankTransaction.transaction = tx.id;
    bankTransaction.kind = event.params.kind;
    bankTransaction.concept = event.params.data.toString();
    
    let bankFee = BankFee.load(bankTxId);

    if (bankFee == null) {
        bankFee = new BankFee(bankTxId);
    }

    bankFee.transaction = bankTransaction.id;
    bankFee.kind = event.params.kind;
    bankFee.fee = event.params.commission.toBigDecimal();

    bankFee.save();

    bankTransaction.bankFee = bankFee.id;

    bankTransaction.save();*/

    pushWalletBankTransaction(tx as Transaction, tx.to.toHexString());
    pushWalletBankTransaction(tx as Transaction, tx.from.toHexString());
}

export function pushWalletTransaction(tx: Transaction, walletAddress: string): void {
    let currency = tx.currency as string;
    let token = Token.load(currency);

    if (token !== null) {

        let wallet = loadWallet(Address.fromString(walletAddress));
        let txs = wallet.transactions;
    
        if (!txs.includes(tx.id)) {
            wallet.transactions.push(tx.id);
        }
    
        wallet.save();
    }
}

export function pushWalletBankTransaction(tx: Transaction, walletAddress: string): void {
    let currency = tx.currency as string;
    let token = Token.load(currency);

    if (token !== null) {

        /*let wallet = loadWallet(Address.fromString(walletAddress));
    
        if (!wallet.bankTransactions.includes(tx.id)) {
            wallet.bankTransactions.push(tx.id);
        }*/

        //let wallet = new Wallet(walletAddress);
    
        //wallet.save();
    }

    let wallet = new Wallet(walletAddress);
    
    wallet.save();
}

export function loadWallet(address: Address): Wallet {
    let wallet = Wallet.load(address.toString());
    
    if (wallet == null) {
        wallet = new Wallet(address.toString());
    }

    wallet.save();

    return wallet as Wallet;
}