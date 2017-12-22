import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Administrador } from './administrador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AdministradorService {

    private resourceUrl = SERVER_API_URL + 'api/administradors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/administradors';

    constructor(private http: Http) { }

    create(administrador: Administrador): Observable<Administrador> {
        const copy = this.convert(administrador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(administrador: Administrador): Observable<Administrador> {
        const copy = this.convert(administrador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Administrador> {
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
     * Convert a returned JSON object to Administrador.
     */
    private convertItemFromServer(json: any): Administrador {
        const entity: Administrador = Object.assign(new Administrador(), json);
        return entity;
    }

    /**
     * Convert a Administrador to a JSON which can be sent to the server.
     */
    private convert(administrador: Administrador): Administrador {
        const copy: Administrador = Object.assign({}, administrador);
        return copy;
    }
}
