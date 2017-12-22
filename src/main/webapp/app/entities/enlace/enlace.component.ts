import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enlace } from './enlace.model';
import { EnlaceService } from './enlace.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enlace',
    templateUrl: './enlace.component.html'
})
export class EnlaceComponent implements OnInit, OnDestroy {
enlaces: Enlace[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private enlaceService: EnlaceService,
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
            this.enlaceService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.enlaces = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.enlaceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enlaces = res.json;
                console.log(this.enlaces);
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
        this.registerChangeInEnlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Enlace) {
        return item.id;
    }
    registerChangeInEnlaces() {
        this.eventSubscriber = this.eventManager.subscribe('enlaceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
