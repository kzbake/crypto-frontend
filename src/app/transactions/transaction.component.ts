import { Component, OnInit } from '@angular/core';
import {transferAssetService} from '../services/transferAsset.service'
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [transferAssetService]
})
export class TransactionComponent implements OnInit {

  public allAssets;
  public errorMessage;
  model: any = {};
  loading = false;
  status: string;
  error: string;
  constructor(private servicetransferAsset: transferAssetService) {

      this.servicetransferAsset.socket.on('send', (transaction) => {
          const message = "Transaction:<b>"+transaction.transactionId+"</b>>fetched to the DB";
          this.showNotification(transaction.transactionId, message)
      })

      this.servicetransferAsset.socket.on('fetch', (transaction) => {
          const message = "Transaction:<b>"+transaction.transactionId+"</b>>fetched to the Hyperledger";
          this.showNotification(transaction.transactionId, message);
          this.search();
      })

  }

  ngOnInit() {
      this.model.datelimit=7;
      this.search();
  }

    showNotification(transactionId, message){
        const type = ['','info','success','warning','danger'];
        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type[2],
            timer: 4000,
            placement: {
                from: 'bottom',
                align: 'right'
            }
        });
    }
    search() {
        let tempList = [];
        console.log(this.model);

        const address = this.model.address;
        const amountGT = this.model.amountGT;
        const amountLT = this.model.amountLT;
        const datelimit = this.model.datelimit;
        const d = new Date();
        d.setDate(d.getDate()-datelimit);

        let counter=0;
        let filter="";
        if(address) {
            filter +='{"fromWallet.address": "'+address+'"}'
            counter++;
        }
        if(amountGT) {
            counter++;
            if(filter!=="") {
                filter+=','
            }
            filter +='{"transfer.Amount":{"gte": '+amountGT+'}}'
        }
        if(amountLT) {
            counter++;
            if(filter!=="") {
                filter+=','
            }
            filter +='{"transfer.Amount":{"lte": '+amountLT+'}}'
        }
        if(datelimit) {
            counter++;
            if(filter!=="") {
                filter+=','
            }
            filter +='{"date":{"gt": "'+d.toISOString()+'"}}'
        }
        if(counter>1) {
            filter = '{"where": {"and": [' + filter + ']}}';
        } else if(counter===1) {
            filter = '{"where": '+filter+'}';
        }


        this.servicetransferAsset.getByFilter(filter).toPromise().then(result => {
            this.errorMessage = null;
            result.forEach(asset => {
                tempList.push(asset);
            });
            this.allAssets = tempList;
        }).catch((error) => {
            if (error == 'Server error') {
                this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
            }
            else if (error == '404 - Not Found') {
                this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
            }
            else {
                this.errorMessage = error;
            }
        });
    }
}
