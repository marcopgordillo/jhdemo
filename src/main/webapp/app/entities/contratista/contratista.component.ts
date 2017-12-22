import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contratista } from './contratista.model';
import { ContratistaService } from './contratista.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contratista',
    templateUrl: './contratista.component.html'
})
export class ContratistaComponent implements OnInit, OnDestroy {
contratistas: Contratista[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private contratistaService: ContratistaService,
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
            this.contratistaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.contratistas = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.contratistaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contratistas = res.json;
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
        this.registerChangeInContratistas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contratista) {
        return item.id;
    }
    registerChangeInContratistas() {
        this.eventSubscriber = this.eventManager.subscribe('contratistaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
