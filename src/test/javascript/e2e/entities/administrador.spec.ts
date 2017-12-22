import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Administrador e2e test', () => {

    let navBarPage: NavBarPage;
    let administradorDialogPage: AdministradorDialogPage;
    let administradorComponentsPage: AdministradorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Administradors', () => {
        navBarPage.goToEntity('administrador');
        administradorComponentsPage = new AdministradorComponentsPage();
        expect(administradorComponentsPage.getTitle()).toMatch(/jhdemoApp.administrador.home.title/);

    });

    it('should load create Administrador dialog', () => {
        administradorComponentsPage.clickOnCreateButton();
        administradorDialogPage = new AdministradorDialogPage();
        expect(administradorDialogPage.getModalTitle()).toMatch(/jhdemoApp.administrador.home.createOrEditLabel/);
        administradorDialogPage.close();
    });

    it('should create and save Administradors', () => {
        administradorComponentsPage.clickOnCreateButton();
        administradorDialogPage.setNombreInput('nombre');
        expect(administradorDialogPage.getNombreInput()).toMatch('nombre');
        administradorDialogPage.setIdentificacionInput('identificacion');
        expect(administradorDialogPage.getIdentificacionInput()).toMatch('identificacion');
        administradorDialogPage.setCargoInput('cargo');
        expect(administradorDialogPage.getCargoInput()).toMatch('cargo');
        administradorDialogPage.setTelefonoInput('telefono');
        expect(administradorDialogPage.getTelefonoInput()).toMatch('telefono');
        administradorDialogPage.setEmailInput('email');
        expect(administradorDialogPage.getEmailInput()).toMatch('email');
        administradorDialogPage.save();
        expect(administradorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AdministradorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-administrador div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AdministradorDialogPage {
    modalTitle = element(by.css('h4#myAdministradorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    identificacionInput = element(by.css('input#field_identificacion'));
    cargoInput = element(by.css('input#field_cargo'));
    telefonoInput = element(by.css('input#field_telefono'));
    emailInput = element(by.css('input#field_email'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    }

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    }

    setIdentificacionInput = function(identificacion) {
        this.identificacionInput.sendKeys(identificacion);
    }

    getIdentificacionInput = function() {
        return this.identificacionInput.getAttribute('value');
    }

    setCargoInput = function(cargo) {
        this.cargoInput.sendKeys(cargo);
    }

    getCargoInput = function() {
        return this.cargoInput.getAttribute('value');
    }

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    }

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
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
