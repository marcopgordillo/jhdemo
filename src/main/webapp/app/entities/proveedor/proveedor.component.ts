import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Proveedor } from './proveedor.model';
import { ProveedorService } from './proveedor.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-proveedor',
    templateUrl: './proveedor.component.html'
})
export class ProveedorComponent implements OnInit, OnDestroy {
proveedors: Proveedor[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private proveedorService: ProveedorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.proveedorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.proveedors = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.proveedorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.proveedors = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProveedors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Proveedor) {
        return item.id;
    }
    registerChangeInProveedors() {
        this.eventSubscriber = this.eventManager.subscribe('proveedorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
