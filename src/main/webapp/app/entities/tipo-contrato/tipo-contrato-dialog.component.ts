import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TipoContrato } from './tipo-contrato.model';
import { TipoContratoPopupService } from './tipo-contrato-popup.service';
import { TipoContratoService } from './tipo-contrato.service';

@Component({
    selector: 'jhi-tipo-contrato-dialog',
    templateUrl: './tipo-contrato-dialog.component.html'
})
export class TipoContratoDialogComponent implements OnInit {

    tipoContrato: TipoContrato;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private tipoContratoService: TipoContratoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipoContrato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoContratoService.update(this.tipoContrato));
        } else {
            this.subscribeToSaveResponse(
                this.tipoContratoService.create(this.tipoContrato));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoContrato>) {
        result.subscribe((res: TipoContrato) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoContrato) {
        this.eventManager.broadcast({ name: 'tipoContratoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-contrato-popup',
    template: ''
})
export class TipoContratoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoContratoPopupService: TipoContratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoContratoPopupService
                    .open(TipoContratoDialogComponent as Component, params['id']);
            } else {
                this.tipoContratoPopupService
                    .open(TipoContratoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
