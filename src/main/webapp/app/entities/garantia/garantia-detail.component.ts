import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Garantia } from './garantia.model';
import { GarantiaService } from './garantia.service';

@Component({
    selector: 'jhi-garantia-detail',
    templateUrl: './garantia-detail.component.html'
})
export class GarantiaDetailComponent implements OnInit, OnDestroy {

    garantia: Garantia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private garantiaService: GarantiaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGarantias();
    }

    load(id) {
        this.garantiaService.find(id).subscribe((garantia) => {
            this.garantia = garantia;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGarantias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'garantiaListModification',
            (response) => this.load(this.garantia.id)
        );
    }
}
