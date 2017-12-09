import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Proveedor } from './proveedor.model';
import { ProveedorPopupService } from './proveedor-popup.service';
import { ProveedorService } from './proveedor.service';

@Component({
    selector: 'jhi-proveedor-dialog',
    templateUrl: './proveedor-dialog.component.html'
})
export class ProveedorDialogComponent implements OnInit {

    proveedor: Proveedor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private proveedorService: ProveedorService,
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
        if (this.proveedor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.proveedorService.update(this.proveedor));
        } else {
            this.subscribeToSaveResponse(
                this.proveedorService.create(this.proveedor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Proveedor>) {
        result.subscribe((res: Proveedor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Proveedor) {
        this.eventManager.broadcast({ name: 'proveedorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-proveedor-popup',
    template: ''
})
export class ProveedorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private proveedorPopupService: ProveedorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.proveedorPopupService
                    .open(ProveedorDialogComponent as Component, params['id']);
            } else {
                this.proveedorPopupService
                    .open(ProveedorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
