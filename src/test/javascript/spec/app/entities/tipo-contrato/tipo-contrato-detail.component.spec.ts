/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { TipoContratoDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato-detail.component';
import { TipoContratoService } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.service';
import { TipoContrato } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.model';

describe('Component Tests', () => {

    describe('TipoContrato Management Detail Component', () => {
        let comp: TipoContratoDetailComponent;
        let fixture: ComponentFixture<TipoContratoDetailComponent>;
        let service: TipoContratoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [TipoContratoDetailComponent],
                providers: [
                    TipoContratoService
                ]
            })
            .overrideTemplate(TipoContratoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoContratoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoContratoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TipoContrato(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoContrato).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
