import { Http } from '@angular/http';
import { ExtractData, HandleError } from './service-helper';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Event } from '../shared/event';

@Injectable()
export class EventService {
    private eventUrl = 'http://172.10.1.5:8020/back-end/public/api/items';

    constructor(private http: Http) { }

    get(): Promise<Event[]> {
        return this.http.get(this.eventUrl)
            .toPromise()
            .then(ExtractData)
            .catch(HandleError);
    }
    insert(event: Event): Promise<Event> {
        return this.http.post(this.eventUrl, JSON.stringify(event))
            .toPromise()
            .then(ExtractData)
            .catch(HandleError);
    }

    update(event: Event): Promise<void> {
        return this.http.put('${this.eventUrl}/${event.id}', JSON.stringify(event))
            .toPromise()
            .then(ExtractData)
            .catch(HandleError);
    }
    remove(id: number): Promise<void> {
        return this.http.delete('${this.eventUrl}/${id}')
            .toPromise()
            .then(ExtractData)
            .catch(HandleError);
    }
}
