import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Garantia e2e test', () => {

    let navBarPage: NavBarPage;
    let garantiaDialogPage: GarantiaDialogPage;
    let garantiaComponentsPage: GarantiaComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Garantias', () => {
        navBarPage.goToEntity('garantia');
        garantiaComponentsPage = new GarantiaComponentsPage();
        expect(garantiaComponentsPage.getTitle()).toMatch(/jhdemoApp.garantia.home.title/);

    });

    it('should load create Garantia dialog', () => {
        garantiaComponentsPage.clickOnCreateButton();
        garantiaDialogPage = new GarantiaDialogPage();
        expect(garantiaDialogPage.getModalTitle()).toMatch(/jhdemoApp.garantia.home.createOrEditLabel/);
        garantiaDialogPage.close();
    });

    it('should create and save Garantias', () => {
        garantiaComponentsPage.clickOnCreateButton();
        garantiaDialogPage.setTituloInput('titulo');
        expect(garantiaDialogPage.getTituloInput()).toMatch('titulo');
        garantiaDialogPage.setDescripcionInput('descripcion');
        expect(garantiaDialogPage.getDescripcionInput()).toMatch('descripcion');
        garantiaDialogPage.setVigenciaMesesInput('5');
        expect(garantiaDialogPage.getVigenciaMesesInput()).toMatch('5');
        garantiaDialogPage.setPorcentajeCoberturaInput('5');
        expect(garantiaDialogPage.getPorcentajeCoberturaInput()).toMatch('5');
        garantiaDialogPage.setPenalidadInput('penalidad');
        expect(garantiaDialogPage.getPenalidadInput()).toMatch('penalidad');
        garantiaDialogPage.save();
        expect(garantiaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GarantiaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-garantia div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GarantiaDialogPage {
    modalTitle = element(by.css('h4#myGarantiaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tituloInput = element(by.css('input#field_titulo'));
    descripcionInput = element(by.css('textarea#field_descripcion'));
    vigenciaMesesInput = element(by.css('input#field_vigenciaMeses'));
    porcentajeCoberturaInput = element(by.css('input#field_porcentajeCobertura'));
    penalidadInput = element(by.css('textarea#field_penalidad'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTituloInput = function(titulo) {
        this.tituloInput.sendKeys(titulo);
    }

    getTituloInput = function() {
        return this.tituloInput.getAttribute('value');
    }

    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    }

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    }

    setVigenciaMesesInput = function(vigenciaMeses) {
        this.vigenciaMesesInput.sendKeys(vigenciaMeses);
    }

    getVigenciaMesesInput = function() {
        return this.vigenciaMesesInput.getAttribute('value');
    }

    setPorcentajeCoberturaInput = function(porcentajeCobertura) {
        this.porcentajeCoberturaInput.sendKeys(porcentajeCobertura);
    }

    getPorcentajeCoberturaInput = function() {
        return this.porcentajeCoberturaInput.getAttribute('value');
    }

    setPenalidadInput = function(penalidad) {
        this.penalidadInput.sendKeys(penalidad);
    }

    getPenalidadInput = function() {
        return this.penalidadInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
