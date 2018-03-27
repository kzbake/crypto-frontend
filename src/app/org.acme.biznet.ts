import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.biznet{
   export class transfer {
      addressTo: string;
      Amount: number;
   }
   export class Wallet {
      address: string;
      Balance: number;
   }
   export class transferAsset extends Asset {
      transactionId: string;
      transfer: transfer;
      date: Date;
      Status: string;
      fromWallet: Wallet;
   }
   export class confirmTranswer extends Transaction {
      newStatus: string;
      transfer: transfer;
   }
   export class User extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
      wallet: Wallet;
   }
// }
