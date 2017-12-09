import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Garantia } from './garantia.model';
import { GarantiaPopupService } from './garantia-popup.service';
import { GarantiaService } from './garantia.service';

@Component({
    selector: 'jhi-garantia-dialog',
    templateUrl: './garantia-dialog.component.html'
})
export class GarantiaDialogComponent implements OnInit {

    garantia: Garantia;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private garantiaService: GarantiaService,
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
        if (this.garantia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.garantiaService.update(this.garantia));
        } else {
            this.subscribeToSaveResponse(
                this.garantiaService.create(this.garantia));
        }
    }

    private subscribeToSaveResponse(result: Observable<Garantia>) {
        result.subscribe((res: Garantia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Garantia) {
        this.eventManager.broadcast({ name: 'garantiaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-garantia-popup',
    template: ''
})
export class GarantiaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private garantiaPopupService: GarantiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.garantiaPopupService
                    .open(GarantiaDialogComponent as Component, params['id']);
            } else {
                this.garantiaPopupService
                    .open(GarantiaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
