import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Enlace } from './enlace.model';
import { EnlaceService } from './enlace.service';

@Component({
    selector: 'jhi-enlace-detail',
    templateUrl: './enlace-detail.component.html'
})
export class EnlaceDetailComponent implements OnInit, OnDestroy {

    enlace: Enlace;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enlaceService: EnlaceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnlaces();
    }

    load(id) {
        this.enlaceService.find(id).subscribe((enlace) => {
            this.enlace = enlace;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnlaces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enlaceListModification',
            (response) => this.load(this.enlace.id)
        );
    }
}
