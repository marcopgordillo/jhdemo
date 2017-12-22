import { BaseEntity } from './../../shared';

export class Garantia implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public descripcion?: any,
        public vigenciaMeses?: number,
        public porcentajeCobertura?: number,
        public penalidad?: any,
    ) {
    }
}
