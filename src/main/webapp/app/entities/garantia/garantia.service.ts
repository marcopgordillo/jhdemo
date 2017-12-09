import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Garantia } from './garantia.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GarantiaService {

    private resourceUrl = SERVER_API_URL + 'api/garantias';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/garantias';

    constructor(private http: Http) { }

    create(garantia: Garantia): Observable<Garantia> {
        const copy = this.convert(garantia);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(garantia: Garantia): Observable<Garantia> {
        const copy = this.convert(garantia);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Garantia> {
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
     * Convert a returned JSON object to Garantia.
     */
    private convertItemFromServer(json: any): Garantia {
        const entity: Garantia = Object.assign(new Garantia(), json);
        return entity;
    }

    /**
     * Convert a Garantia to a JSON which can be sent to the server.
     */
    private convert(garantia: Garantia): Garantia {
        const copy: Garantia = Object.assign({}, garantia);
        return copy;
    }
}
