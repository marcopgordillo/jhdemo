import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Contrato } from './contrato.model';
import { ContratoService } from './contrato.service';

@Component({
    selector: 'jhi-contrato-detail',
    templateUrl: './contrato-detail.component.html'
})
export class ContratoDetailComponent implements OnInit, OnDestroy {

    contrato: Contrato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contratoService: ContratoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContratoes();
    }

    load(id) {
        this.contratoService.find(id).subscribe((contrato) => {
            this.contrato = contrato;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContratoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contratoListModification',
            (response) => this.load(this.contrato.id)
        );
    }
}
