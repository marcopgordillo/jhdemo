import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Proveedor } from './proveedor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProveedorService {

    private resourceUrl = SERVER_API_URL + 'api/proveedors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/proveedors';

    constructor(private http: Http) { }

    create(proveedor: Proveedor): Observable<Proveedor> {
        const copy = this.convert(proveedor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(proveedor: Proveedor): Observable<Proveedor> {
        const copy = this.convert(proveedor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Proveedor> {
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
     * Convert a returned JSON object to Proveedor.
     */
    private convertItemFromServer(json: any): Proveedor {
        const entity: Proveedor = Object.assign(new Proveedor(), json);
        return entity;
    }

    /**
     * Convert a Proveedor to a JSON which can be sent to the server.
     */
    private convert(proveedor: Proveedor): Proveedor {
        const copy: Proveedor = Object.assign({}, proveedor);
        return copy;
    }
}
