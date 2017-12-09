import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enlace } from './enlace.model';
import { EnlacePopupService } from './enlace-popup.service';
import { EnlaceService } from './enlace.service';
import { Contrato, ContratoService } from '../contrato';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enlace-dialog',
    templateUrl: './enlace-dialog.component.html'
})
export class EnlaceDialogComponent implements OnInit {

    enlace: Enlace;
    isSaving: boolean;

    contratoes: Contrato[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enlaceService: EnlaceService,
        private contratoService: ContratoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.contratoService.query()
            .subscribe((res: ResponseWrapper) => { this.contratoes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enlace.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enlaceService.update(this.enlace));
        } else {
            this.subscribeToSaveResponse(
                this.enlaceService.create(this.enlace));
        }
    }

    private subscribeToSaveResponse(result: Observable<Enlace>) {
        result.subscribe((res: Enlace) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Enlace) {
        this.eventManager.broadcast({ name: 'enlaceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackContratoById(index: number, item: Contrato) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enlace-popup',
    template: ''
})
export class EnlacePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enlacePopupService: EnlacePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enlacePopupService
                    .open(EnlaceDialogComponent as Component, params['id']);
            } else {
                this.enlacePopupService
                    .open(EnlaceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
