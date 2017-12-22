import { BaseEntity } from './../../shared';

export class Contratista implements BaseEntity {
    constructor(
        public id?: number,
        public razonSocial?: string,
        public ruc?: string,
        public contactoNombre?: string,
        public direccion?: string,
        public telefono?: string,
        public email?: string,
    ) {
    }
}
