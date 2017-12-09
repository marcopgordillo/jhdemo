import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TipoContrato } from './tipo-contrato.model';
import { TipoContratoService } from './tipo-contrato.service';

@Component({
    selector: 'jhi-tipo-contrato-detail',
    templateUrl: './tipo-contrato-detail.component.html'
})
export class TipoContratoDetailComponent implements OnInit, OnDestroy {

    tipoContrato: TipoContrato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private tipoContratoService: TipoContratoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoContratoes();
    }

    load(id) {
        this.tipoContratoService.find(id).subscribe((tipoContrato) => {
            this.tipoContrato = tipoContrato;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoContratoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoContratoListModification',
            (response) => this.load(this.tipoContrato.id)
        );
    }
}
