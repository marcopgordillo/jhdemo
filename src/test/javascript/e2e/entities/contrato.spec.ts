import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contrato e2e test', () => {

    let navBarPage: NavBarPage;
    let contratoDialogPage: ContratoDialogPage;
    let contratoComponentsPage: ContratoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contratoes', () => {
        navBarPage.goToEntity('contrato');
        contratoComponentsPage = new ContratoComponentsPage();
        expect(contratoComponentsPage.getTitle()).toMatch(/jhdemoApp.contrato.home.title/);

    });

    it('should load create Contrato dialog', () => {
        contratoComponentsPage.clickOnCreateButton();
        contratoDialogPage = new ContratoDialogPage();
        expect(contratoDialogPage.getModalTitle()).toMatch(/jhdemoApp.contrato.home.createOrEditLabel/);
        contratoDialogPage.close();
    });

    it('should create and save Contratoes', () => {
        contratoComponentsPage.clickOnCreateButton();
        contratoDialogPage.setCodigoContratoInput('codigoContrato');
        expect(contratoDialogPage.getCodigoContratoInput()).toMatch('codigoContrato');
        contratoDialogPage.setInicioContratoInput('2000-12-31');
        expect(contratoDialogPage.getInicioContratoInput()).toMatch('2000-12-31');
        contratoDialogPage.setPlazoMesesInput('5');
        expect(contratoDialogPage.getPlazoMesesInput()).toMatch('5');
        contratoDialogPage.setObjetoContratoInput('objetoContrato');
        expect(contratoDialogPage.getObjetoContratoInput()).toMatch('objetoContrato');
        contratoDialogPage.setMontoInput('5');
        expect(contratoDialogPage.getMontoInput()).toMatch('5');
        contratoDialogPage.nacionalidadSelectLastOption();
        contratoDialogPage.setPartidaPresupuestariaInput('partidaPresupuestaria');
        expect(contratoDialogPage.getPartidaPresupuestariaInput()).toMatch('partidaPresupuestaria');
        contratoDialogPage.garantiaSelectLastOption();
        contratoDialogPage.tipoSelectLastOption();
        contratoDialogPage.supervisorSelectLastOption();
        contratoDialogPage.proveedorSelectLastOption();
        contratoDialogPage.save();
        expect(contratoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContratoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contrato div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContratoDialogPage {
    modalTitle = element(by.css('h4#myContratoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codigoContratoInput = element(by.css('input#field_codigoContrato'));
    inicioContratoInput = element(by.css('input#field_inicioContrato'));
    plazoMesesInput = element(by.css('input#field_plazoMeses'));
    objetoContratoInput = element(by.css('input#field_objetoContrato'));
    montoInput = element(by.css('input#field_monto'));
    nacionalidadSelect = element(by.css('select#field_nacionalidad'));
    partidaPresupuestariaInput = element(by.css('input#field_partidaPresupuestaria'));
    garantiaSelect = element(by.css('select#field_garantia'));
    tipoSelect = element(by.css('select#field_tipo'));
    supervisorSelect = element(by.css('select#field_supervisor'));
    proveedorSelect = element(by.css('select#field_proveedor'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodigoContratoInput = function(codigoContrato) {
        this.codigoContratoInput.sendKeys(codigoContrato);
    }

    getCodigoContratoInput = function() {
        return this.codigoContratoInput.getAttribute('value');
    }

    setInicioContratoInput = function(inicioContrato) {
        this.inicioContratoInput.sendKeys(inicioContrato);
    }

    getInicioContratoInput = function() {
        return this.inicioContratoInput.getAttribute('value');
    }

    setPlazoMesesInput = function(plazoMeses) {
        this.plazoMesesInput.sendKeys(plazoMeses);
    }

    getPlazoMesesInput = function() {
        return this.plazoMesesInput.getAttribute('value');
    }

    setObjetoContratoInput = function(objetoContrato) {
        this.objetoContratoInput.sendKeys(objetoContrato);
    }

    getObjetoContratoInput = function() {
        return this.objetoContratoInput.getAttribute('value');
    }

    setMontoInput = function(monto) {
        this.montoInput.sendKeys(monto);
    }

    getMontoInput = function() {
        return this.montoInput.getAttribute('value');
    }

    setNacionalidadSelect = function(nacionalidad) {
        this.nacionalidadSelect.sendKeys(nacionalidad);
    }

    getNacionalidadSelect = function() {
        return this.nacionalidadSelect.element(by.css('option:checked')).getText();
    }

    nacionalidadSelectLastOption = function() {
        this.nacionalidadSelect.all(by.tagName('option')).last().click();
    }
    setPartidaPresupuestariaInput = function(partidaPresupuestaria) {
        this.partidaPresupuestariaInput.sendKeys(partidaPresupuestaria);
    }

    getPartidaPresupuestariaInput = function() {
        return this.partidaPresupuestariaInput.getAttribute('value');
    }

    garantiaSelectLastOption = function() {
        this.garantiaSelect.all(by.tagName('option')).last().click();
    }

    garantiaSelectOption = function(option) {
        this.garantiaSelect.sendKeys(option);
    }

    getGarantiaSelect = function() {
        return this.garantiaSelect;
    }

    getGarantiaSelectedOption = function() {
        return this.garantiaSelect.element(by.css('option:checked')).getText();
    }

    tipoSelectLastOption = function() {
        this.tipoSelect.all(by.tagName('option')).last().click();
    }

    tipoSelectOption = function(option) {
        this.tipoSelect.sendKeys(option);
    }

    getTipoSelect = function() {
        return this.tipoSelect;
    }

    getTipoSelectedOption = function() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
    }

    supervisorSelectLastOption = function() {
        this.supervisorSelect.all(by.tagName('option')).last().click();
    }

    supervisorSelectOption = function(option) {
        this.supervisorSelect.sendKeys(option);
    }

    getSupervisorSelect = function() {
        return this.supervisorSelect;
    }

    getSupervisorSelectedOption = function() {
        return this.supervisorSelect.element(by.css('option:checked')).getText();
    }

    proveedorSelectLastOption = function() {
        this.proveedorSelect.all(by.tagName('option')).last().click();
    }

    proveedorSelectOption = function(option) {
        this.proveedorSelect.sendKeys(option);
    }

    getProveedorSelect = function() {
        return this.proveedorSelect;
    }

    getProveedorSelectedOption = function() {
        return this.proveedorSelect.element(by.css('option:checked')).getText();
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
