export interface iMeta{
  idMeta: number;
  nombre: string;
  fechaCreacion: Date;
}

export interface iTarea{
  idTarea: number;
  idMeta: number;
  nombre: string;
  fechaCreacion: Date;
  estatus: string;
}