import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Administrador } from './administrador.model';
import { AdministradorPopupService } from './administrador-popup.service';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador-dialog',
    templateUrl: './administrador-dialog.component.html'
})
export class AdministradorDialogComponent implements OnInit {

    administrador: Administrador;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private administradorService: AdministradorService,
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
        if (this.administrador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.administradorService.update(this.administrador));
        } else {
            this.subscribeToSaveResponse(
                this.administradorService.create(this.administrador));
        }
    }

    private subscribeToSaveResponse(result: Observable<Administrador>) {
        result.subscribe((res: Administrador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Administrador) {
        this.eventManager.broadcast({ name: 'administradorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-administrador-popup',
    template: ''
})
export class AdministradorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private administradorPopupService: AdministradorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.administradorPopupService
                    .open(AdministradorDialogComponent as Component, params['id']);
            } else {
                this.administradorPopupService
                    .open(AdministradorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
