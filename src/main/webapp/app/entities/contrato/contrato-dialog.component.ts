import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contrato } from './contrato.model';
import { ContratoPopupService } from './contrato-popup.service';
import { ContratoService } from './contrato.service';
import { Garantia, GarantiaService } from '../garantia';
import { TipoContrato, TipoContratoService } from '../tipo-contrato';
import { Supervisor, SupervisorService } from '../supervisor';
import { Proveedor, ProveedorService } from '../proveedor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contrato-dialog',
    templateUrl: './contrato-dialog.component.html'
})
export class ContratoDialogComponent implements OnInit {

    contrato: Contrato;
    isSaving: boolean;

    garantias: Garantia[];

    tipocontratoes: TipoContrato[];

    supervisors: Supervisor[];

    proveedors: Proveedor[];
    inicioContratoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private contratoService: ContratoService,
        private garantiaService: GarantiaService,
        private tipoContratoService: TipoContratoService,
        private supervisorService: SupervisorService,
        private proveedorService: ProveedorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.garantiaService
            .query({filter: 'contrato-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.contrato.garantia || !this.contrato.garantia.id) {
                    this.garantias = res.json;
                } else {
                    this.garantiaService
                        .find(this.contrato.garantia.id)
                        .subscribe((subRes: Garantia) => {
                            this.garantias = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoContratoService.query()
            .subscribe((res: ResponseWrapper) => { this.tipocontratoes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.supervisorService.query()
            .subscribe((res: ResponseWrapper) => { this.supervisors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.proveedorService.query()
            .subscribe((res: ResponseWrapper) => { this.proveedors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contrato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contratoService.update(this.contrato));
        } else {
            this.subscribeToSaveResponse(
                this.contratoService.create(this.contrato));
        }
    }

    private subscribeToSaveResponse(result: Observable<Contrato>) {
        result.subscribe((res: Contrato) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Contrato) {
        this.eventManager.broadcast({ name: 'contratoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGarantiaById(index: number, item: Garantia) {
        return item.id;
    }

    trackTipoContratoById(index: number, item: TipoContrato) {
        return item.id;
    }

    trackSupervisorById(index: number, item: Supervisor) {
        return item.id;
    }

    trackProveedorById(index: number, item: Proveedor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contrato-popup',
    template: ''
})
export class ContratoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contratoPopupService: ContratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contratoPopupService
                    .open(ContratoDialogComponent as Component, params['id']);
            } else {
                this.contratoPopupService
                    .open(ContratoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
