import { BaseEntity } from './../../shared';

export class Administrador implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public identificacion?: string,
        public cargo?: string,
        public telefono?: string,
        public email?: string,
    ) {
    }
}
