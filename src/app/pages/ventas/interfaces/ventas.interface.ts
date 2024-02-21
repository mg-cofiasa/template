export interface iCatalogos{
  Valor: string;
  Nombre: string;
  Visible: boolean;
}

export interface iUsuarioCatalogos{
  Usuario: string;
  Zonas: iCatalogos[];
  Plazas: iCatalogos[];
  Sucursales: iCatalogos[];
  Segmentos: string[];
  Conceptos: string[];
}

export interface iCatalogoNombre{
  Nombre: string;
}
export interface iCatalogoIdNombre{
  Id: number;
  Nombre: string;
}

export interface iEnviarDatosGrafica{
  Periodo: string;
  Segmento: string;
  TipoLugar: string;
  LugarValor: string;
  Categoria: string;
  VentaNeta: boolean;
  ProyeccionUtilidad: boolean;
  Concepto: string;
}

export interface iDatosGrafica{
  name: string;
  y: number;
  color: string;
  tooltip: string;
}

export interface iArregloGraficaDatos{
  Margen: iDatosGrafica[];
  Mezcla: iDatosGrafica[];
  Toneladas: iDatosGrafica[];
  Utilidad: iDatosGrafica[];
  Ventas: iDatosGrafica[];
}

export interface iArregloGraficaDatosProyeccion{
  FaltantePuntoEquilibrio: iDatosGrafica[];
  UtilidadBruta: iDatosGrafica[];
  UtilidadOperacion: iDatosGrafica[];
}

export interface iCatalogoFormulas{
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string[];
}

export interface iCatalogoCondicionesColores{
  indicador: string;
  tipo: string;
  meta: string;
  condicion: string;
  desde: string;
  condicion1: string;
  hasta: string;
  color: string;
  sino: string;
}

export interface iTablaVenta{
  Sucursal: number;
  NombreSucursal: string;
  Familia: string;
  vtaxmileshoy: number;
  vtaxmiles: number;
  pptomiles: number;
  cumpl: number;
  TendVTA: number;
  porcientoventa: number;
  VTATonHoy: number;
  VTATon: number;
  pptTon: number;
  cumplTon: number;
  TendTon: number;
  Porcientokilos: number;
  mezclaporciento: number;
  pptomezcla: number;
  utilimiles: number;
  pptutil: number;
  cumplutilidad: number;
  TendUtil: number;
  porcientoutilidad: number;
  margen: number;
  mrgppt: number;
  cumplmargen: number;
  Zona: string;
  Plaza: string;
  ColorPorcientoTendVenta: number;
  ColorPorcientoTendTon: number;
  ColorPorcientoTendUtilidad: number;
  colorCumplimientoImporte: number;
  colorCumplimientoToneladas: number;
  colorCumplimientoUtilidad: number;
  colorCumplimientoMargen: number;
  ColorMezclaPorciento: number;
  nombreOrden: string;
  OrdenFamilia: number;
  order: number;
}

export interface iTablaVentaSegmento{
  OrdenVerdadero: number;
  Orden: number;
  Sucursal: number;
  NombreSucursal: string;
  Segmento: string;
  vtaxmileshoy: number;
  vtaxmiles: number;
  pptomiles: number;
  cumpl: number;
  TendVTA: number;
  porcientoventa: number;
  VTATonHoy: number;
  VTATon: number;
  pptTon: number;
  cumplTon: number;
  TendTon: number;
  PorcientoKilos: number;
  utilimiles: number;
  pptutil: number;
  cumplutilidad: number;
  TendUtil: number;
  porcientoutilidad: number;
  margen: number;
  mrgppt: number;
  cumplmargen: number;
  ColorPorcientoTendVenta: number;
  ColorPorcientoTendTon: number;
  ColorPorcientoTendUtilidad: number;
  colorCumplimientoImporte: number;
  colorCumplimientoToneladas: number;
  colorCumplimientoUtilidad: number;
  colorCumplimientoMargen: number;
}

export interface iTablaVentaProyeccion{
  sucursal: number;
  nombre: string;
  margen: number;
  ventatoneladas: number;
  ventamiles: number;
  utilidadbruta: number;
  gastosmes: number;
  utilidadoperacion: number;
  faltantepuntoequilibrio: number;
  mezclaotrosaceros: number;
  mezclapolvos: number;
  mezclavarilla: number;
}