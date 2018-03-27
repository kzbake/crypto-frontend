import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { transferAsset } from '../org.acme.biznet';
import 'rxjs/Rx';
import * as io from 'socket.io-client';

// Can be injected into a constructor
@Injectable()
export class transferAssetService {
    public socket: any = null;
    private NAMESPACE: string = 'transferAsset';

    constructor(private dataService: DataService<transferAsset>) {
        this.socket = io('http://localhost:3005', {query: {token: 1}});
        this.socket.on('connect', () => {
            console.log('connect');
            this.socket.send(1);
        });


    };

    public getAll(): Observable<transferAsset[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

		public getByFilter(filter: any): Observable<transferAsset[]> {
			return this.dataService.getAll(this.NAMESPACE+'?filter='+filter);
		}

    public getAsset(id: any): Observable<transferAsset> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<transferAsset> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<transferAsset> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<transferAsset> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
