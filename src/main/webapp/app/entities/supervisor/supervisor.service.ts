import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Supervisor } from './supervisor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SupervisorService {

    private resourceUrl = SERVER_API_URL + 'api/supervisors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/supervisors';

    constructor(private http: Http) { }

    create(supervisor: Supervisor): Observable<Supervisor> {
        const copy = this.convert(supervisor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(supervisor: Supervisor): Observable<Supervisor> {
        const copy = this.convert(supervisor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Supervisor> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Supervisor.
     */
    private convertItemFromServer(json: any): Supervisor {
        const entity: Supervisor = Object.assign(new Supervisor(), json);
        return entity;
    }

    /**
     * Convert a Supervisor to a JSON which can be sent to the server.
     */
    private convert(supervisor: Supervisor): Supervisor {
        const copy: Supervisor = Object.assign({}, supervisor);
        return copy;
    }
}
