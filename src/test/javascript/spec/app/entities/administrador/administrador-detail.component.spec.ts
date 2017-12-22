/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { AdministradorDetailComponent } from '../../../../../../main/webapp/app/entities/administrador/administrador-detail.component';
import { AdministradorService } from '../../../../../../main/webapp/app/entities/administrador/administrador.service';
import { Administrador } from '../../../../../../main/webapp/app/entities/administrador/administrador.model';

describe('Component Tests', () => {

    describe('Administrador Management Detail Component', () => {
        let comp: AdministradorDetailComponent;
        let fixture: ComponentFixture<AdministradorDetailComponent>;
        let service: AdministradorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [AdministradorDetailComponent],
                providers: [
                    AdministradorService
                ]
            })
            .overrideTemplate(AdministradorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministradorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministradorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Administrador(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.administrador).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
