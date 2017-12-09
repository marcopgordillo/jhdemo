import { BaseEntity } from './../../shared';

export const enum Country {
    'ARGENTINA',
    'BOLIVIA',
    'BRASIL',
    'CHILE',
    'COLOMBIA',
    'ECUADOR',
    'GUYANA',
    'PARAGUAY',
    'PERU',
    'SURINAM',
    'URUGUAY',
    'VENEZUELA'
}

export class Contrato implements BaseEntity {
    constructor(
        public id?: number,
        public codigoContrato?: string,
        public inicioContrato?: any,
        public plazoMeses?: number,
        public objetoContrato?: string,
        public monto?: number,
        public nacionalidad?: Country,
        public partidaPresupuestaria?: string,
        public garantia?: BaseEntity,
        public tipo?: BaseEntity,
        public supervisor?: BaseEntity,
        public proveedor?: BaseEntity,
    ) {
    }
}
