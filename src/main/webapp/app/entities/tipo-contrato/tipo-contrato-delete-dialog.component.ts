import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoContrato } from './tipo-contrato.model';
import { TipoContratoPopupService } from './tipo-contrato-popup.service';
import { TipoContratoService } from './tipo-contrato.service';

@Component({
    selector: 'jhi-tipo-contrato-delete-dialog',
    templateUrl: './tipo-contrato-delete-dialog.component.html'
})
export class TipoContratoDeleteDialogComponent {

    tipoContrato: TipoContrato;

    constructor(
        private tipoContratoService: TipoContratoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoContratoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoContratoListModification',
                content: 'Deleted an tipoContrato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-contrato-delete-popup',
    template: ''
})
export class TipoContratoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoContratoPopupService: TipoContratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoContratoPopupService
                .open(TipoContratoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
