export interface iSucursalesUbicacion{
  Id: number;
  Zona: string;
  Plaza: string;
  Sucursal: string;
  Latitud: number;
  Longitud: number;
}

export interface iCatalogoNumero{
  Id: number;
  Nombre: string;
}

export interface iCatalogoCadena{
  Id: string;
  Nombre: string;
}

export interface iCatalogoNumeroReferencia{
  Id: number;
  Nombre: string;
  Referencia: string;
}

export interface iCatalogoCadenaReferencia{
  Id: string;
  Nombre: string;
  Referencia: string;
}

export interface iZonaPlazaSucursales{
  zonas: iCatalogoCadena[];
  plazas: iCatalogoCadenaReferencia[];
  sucursalesUbicacion: iSucursalesUbicacion[];
}