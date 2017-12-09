import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enlace } from './enlace.model';
import { EnlacePopupService } from './enlace-popup.service';
import { EnlaceService } from './enlace.service';

@Component({
    selector: 'jhi-enlace-delete-dialog',
    templateUrl: './enlace-delete-dialog.component.html'
})
export class EnlaceDeleteDialogComponent {

    enlace: Enlace;

    constructor(
        private enlaceService: EnlaceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enlaceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enlaceListModification',
                content: 'Deleted an enlace'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enlace-delete-popup',
    template: ''
})
export class EnlaceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enlacePopupService: EnlacePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enlacePopupService
                .open(EnlaceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
