import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Supervisor e2e test', () => {

    let navBarPage: NavBarPage;
    let supervisorDialogPage: SupervisorDialogPage;
    let supervisorComponentsPage: SupervisorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Supervisors', () => {
        navBarPage.goToEntity('supervisor');
        supervisorComponentsPage = new SupervisorComponentsPage();
        expect(supervisorComponentsPage.getTitle()).toMatch(/jhdemoApp.supervisor.home.title/);

    });

    it('should load create Supervisor dialog', () => {
        supervisorComponentsPage.clickOnCreateButton();
        supervisorDialogPage = new SupervisorDialogPage();
        expect(supervisorDialogPage.getModalTitle()).toMatch(/jhdemoApp.supervisor.home.createOrEditLabel/);
        supervisorDialogPage.close();
    });

    it('should create and save Supervisors', () => {
        supervisorComponentsPage.clickOnCreateButton();
        supervisorDialogPage.setNombreInput('nombre');
        expect(supervisorDialogPage.getNombreInput()).toMatch('nombre');
        supervisorDialogPage.setIdentificacionInput('identificacion');
        expect(supervisorDialogPage.getIdentificacionInput()).toMatch('identificacion');
        supervisorDialogPage.setCargoInput('cargo');
        expect(supervisorDialogPage.getCargoInput()).toMatch('cargo');
        supervisorDialogPage.setTelefonoInput('telefono');
        expect(supervisorDialogPage.getTelefonoInput()).toMatch('telefono');
        supervisorDialogPage.setEmailInput('email');
        expect(supervisorDialogPage.getEmailInput()).toMatch('email');
        supervisorDialogPage.save();
        expect(supervisorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupervisorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supervisor div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupervisorDialogPage {
    modalTitle = element(by.css('h4#mySupervisorLabel'));
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
