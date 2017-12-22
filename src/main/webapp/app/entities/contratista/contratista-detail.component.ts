import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Contratista } from './contratista.model';
import { ContratistaService } from './contratista.service';

@Component({
    selector: 'jhi-contratista-detail',
    templateUrl: './contratista-detail.component.html'
})
export class ContratistaDetailComponent implements OnInit, OnDestroy {

    contratista: Contratista;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contratistaService: ContratistaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContratistas();
    }

    load(id) {
        this.contratistaService.find(id).subscribe((contratista) => {
            this.contratista = contratista;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContratistas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contratistaListModification',
            (response) => this.load(this.contratista.id)
        );
    }
}
