import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Garantia } from './garantia.model';
import { GarantiaPopupService } from './garantia-popup.service';
import { GarantiaService } from './garantia.service';

@Component({
    selector: 'jhi-garantia-delete-dialog',
    templateUrl: './garantia-delete-dialog.component.html'
})
export class GarantiaDeleteDialogComponent {

    garantia: Garantia;

    constructor(
        private garantiaService: GarantiaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.garantiaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'garantiaListModification',
                content: 'Deleted an garantia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-garantia-delete-popup',
    template: ''
})
export class GarantiaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private garantiaPopupService: GarantiaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.garantiaPopupService
                .open(GarantiaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
