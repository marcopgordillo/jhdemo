import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from './contrato.model';
import { ContratoService } from './contrato.service';

@Injectable()
export class ContratoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private contratoService: ContratoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.contratoService.find(id).subscribe((contrato) => {
                    if (contrato.inicioContrato) {
                        contrato.inicioContrato = {
                            year: contrato.inicioContrato.getFullYear(),
                            month: contrato.inicioContrato.getMonth() + 1,
                            day: contrato.inicioContrato.getDate()
                        };
                    }
                    this.ngbModalRef = this.contratoModalRef(component, contrato);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.contratoModalRef(component, new Contrato());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    contratoModalRef(component: Component, contrato: Contrato): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.contrato = contrato;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
