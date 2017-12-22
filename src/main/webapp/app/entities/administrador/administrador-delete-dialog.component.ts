import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Administrador } from './administrador.model';
import { AdministradorPopupService } from './administrador-popup.service';
import { AdministradorService } from './administrador.service';

@Component({
    selector: 'jhi-administrador-delete-dialog',
    templateUrl: './administrador-delete-dialog.component.html'
})
export class AdministradorDeleteDialogComponent {

    administrador: Administrador;

    constructor(
        private administradorService: AdministradorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.administradorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'administradorListModification',
                content: 'Deleted an administrador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-administrador-delete-popup',
    template: ''
})
export class AdministradorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private administradorPopupService: AdministradorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.administradorPopupService
                .open(AdministradorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
