import { BaseEntity } from './../../shared';

export class TipoContrato implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public descripcion?: any,
    ) {
    }
}
