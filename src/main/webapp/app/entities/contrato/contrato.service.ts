import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Contrato } from './contrato.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ContratoService {

    private resourceUrl = SERVER_API_URL + 'api/contratoes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/contratoes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(contrato: Contrato): Observable<Contrato> {
        const copy = this.convert(contrato);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(contrato: Contrato): Observable<Contrato> {
        const copy = this.convert(contrato);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Contrato> {
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
     * Convert a returned JSON object to Contrato.
     */
    private convertItemFromServer(json: any): Contrato {
        const entity: Contrato = Object.assign(new Contrato(), json);
        entity.inicioContrato = this.dateUtils
            .convertLocalDateFromServer(json.inicioContrato);
        return entity;
    }

    /**
     * Convert a Contrato to a JSON which can be sent to the server.
     */
    private convert(contrato: Contrato): Contrato {
        const copy: Contrato = Object.assign({}, contrato);
        copy.inicioContrato = this.dateUtils
            .convertLocalDateToServer(contrato.inicioContrato);
        return copy;
    }
}
