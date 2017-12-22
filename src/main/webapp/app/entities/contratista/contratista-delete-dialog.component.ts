import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contratista } from './contratista.model';
import { ContratistaPopupService } from './contratista-popup.service';
import { ContratistaService } from './contratista.service';

@Component({
    selector: 'jhi-contratista-delete-dialog',
    templateUrl: './contratista-delete-dialog.component.html'
})
export class ContratistaDeleteDialogComponent {

    contratista: Contratista;

    constructor(
        private contratistaService: ContratistaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contratistaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contratistaListModification',
                content: 'Deleted an contratista'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contratista-delete-popup',
    template: ''
})
export class ContratistaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contratistaPopupService: ContratistaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contratistaPopupService
                .open(ContratistaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
