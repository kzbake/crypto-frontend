import { Component, OnInit } from '@angular/core';
import {transferAssetService} from '../services/transferAsset.service'
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './send-to-db.component.html',
  styleUrls: ['./send-to-db.component.css'],
  providers: [transferAssetService]
})
export class SendToDbComponent implements OnInit {

  public allAssets;
  public errorMessage;
  model: any = {};
  loading = false;
  status: string;
  error: string;
  constructor(private servicetransferAsset: transferAssetService) {

      this.servicetransferAsset.socket.on('send', (transaction) => {
          const message = "Transaction:<b>"+transaction.transactionId+"</b>>fetched to the DB";
          this.showNotification(message, 'success')
      })

      this.servicetransferAsset.socket.on('fetch', (transaction) => {
          const message = "Transaction:<b>"+transaction.transactionId+"</b>>fetched to the Hyperledger";
          this.showNotification(message, 'success');
          // this.search();
      })

  }

  ngOnInit() {
      this.model.datelimit=7;
      // this.search();
  }

    showNotification(message, type){
        // const type = ['','info','success','warning','danger'];
        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type,
            timer: 4000,
            placement: {
                from: 'bottom',
                align: 'right'
            }
        });
    }
    addTransaction() {
        let tempList = [];
        console.log(this.model);
        const data = JSON.parse(this.model.data);
        this.servicetransferAsset.sendToDB(data).toPromise().then(result => {
            this.errorMessage = null;
            // this.showNotification(this.errorMessage, 'sucess')

        }).catch((error) => {
            if (error == 'Server error') {
                this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
                this.showNotification(this.errorMessage, 'danger')
            }
            else if (error == '404 - Not Found') {
                this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
                this.showNotification(this.errorMessage, 'danger')
            }
            else {
                this.errorMessage = error._body;
                console.log(error)
                this.showNotification(this.errorMessage, 'danger')
            }
        });
    }
}
