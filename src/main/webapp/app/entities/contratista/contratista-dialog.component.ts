import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contratista } from './contratista.model';
import { ContratistaPopupService } from './contratista-popup.service';
import { ContratistaService } from './contratista.service';

@Component({
    selector: 'jhi-contratista-dialog',
    templateUrl: './contratista-dialog.component.html'
})
export class ContratistaDialogComponent implements OnInit {

    contratista: Contratista;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contratistaService: ContratistaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contratista.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contratistaService.update(this.contratista));
        } else {
            this.subscribeToSaveResponse(
                this.contratistaService.create(this.contratista));
        }
    }

    private subscribeToSaveResponse(result: Observable<Contratista>) {
        result.subscribe((res: Contratista) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Contratista) {
        this.eventManager.broadcast({ name: 'contratistaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-contratista-popup',
    template: ''
})
export class ContratistaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contratistaPopupService: ContratistaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contratistaPopupService
                    .open(ContratistaDialogComponent as Component, params['id']);
            } else {
                this.contratistaPopupService
                    .open(ContratistaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
