import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Supervisor } from './supervisor.model';
import { SupervisorPopupService } from './supervisor-popup.service';
import { SupervisorService } from './supervisor.service';

@Component({
    selector: 'jhi-supervisor-dialog',
    templateUrl: './supervisor-dialog.component.html'
})
export class SupervisorDialogComponent implements OnInit {

    supervisor: Supervisor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private supervisorService: SupervisorService,
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
        if (this.supervisor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supervisorService.update(this.supervisor));
        } else {
            this.subscribeToSaveResponse(
                this.supervisorService.create(this.supervisor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Supervisor>) {
        result.subscribe((res: Supervisor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Supervisor) {
        this.eventManager.broadcast({ name: 'supervisorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-supervisor-popup',
    template: ''
})
export class SupervisorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supervisorPopupService: SupervisorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supervisorPopupService
                    .open(SupervisorDialogComponent as Component, params['id']);
            } else {
                this.supervisorPopupService
                    .open(SupervisorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
