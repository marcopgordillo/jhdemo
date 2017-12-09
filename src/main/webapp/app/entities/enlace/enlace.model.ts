import { BaseEntity } from './../../shared';

export class Enlace implements BaseEntity {
    constructor(
        public id?: number,
        public enlace?: string,
        public year?: number,
        public contrato?: BaseEntity,
    ) {
    }
}
