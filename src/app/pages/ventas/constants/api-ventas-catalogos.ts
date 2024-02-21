import { iCatalogoCondicionesColores, iCatalogoFormulas } from "../interfaces/ventas.interface";

export const catalogoFormulas: iCatalogoFormulas[] = [
  {
    id: "VtasMiles",
    titulo: "Vtas Miles Hoy",
    subtitulo: "Ventas realizadas del día actual en miles de pesos",
    descripcion: ["Vtas Miles = Suma Total deVentas - Devoluciones"]
  },
  {
    id: "VtasMiles",
    titulo: "Vtas Miles",
    subtitulo: "Ventas realizadas en miles de pesos",
    descripcion: ["Vtas Miles = Suma Total de Ventas - Devoluciones"]
  },
  {
    id: "VtasMiles",
    titulo: "Pto Miles",
    subtitulo: " *Presupuesto asignado en miles de pesos",
    descripcion: ["Pto Miles = Suma Total de Presupuesto Por Artículo"]
  },
  {
    id: "VtasMiles",
    titulo: "Cumpl",
    subtitulo: "% de cumplimiento o avance con respecto al presupuesto de ventas asignado",
    descripcion: ["Cumpl = Vtas Miles / Pto Miles * 100"]
  },
  {
    id: "VtasMiles",
    titulo: "Tend Vta",
    subtitulo: "Tendencia o pronóstico en miles de pesos a vender con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["Promedio Diario = Ventas / Número de Días Laborales Transcurridos", "Tend Vta = Promedio Diario * Total de Días Laborales del Mes"]
  },
  {
    id: "VtasMiles",
    titulo: "% Tend",
    subtitulo: "Tendencia o pronóstico en porcentaje de ventas en miles de pesos con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["% Tend = Tend Vta / Pto Miles * 100"]
  },
  {
    id: "VtasTon",
    titulo: "Vta Ton Hoy",
    subtitulo: " Ventas realizadas del día actual en miles de kilos",
    descripcion: ["Vta Ton = Suma Total de Ventas - Devoluciones"]
  },
  {
    id: "VtasTon",
    titulo: "Vta Ton",
    subtitulo: " Ventas realizadas en miles de kilos",
    descripcion: ["Vta Ton = Suma Total de Ventas - Devoluciones"]
  },
  {
    id: "VtasTon",
    titulo: "Pto Ton",
    subtitulo: "Suma total de presupuesto asignado en miles de kilos",
    descripcion: ["Pto Ton = Suma Total de Presupuesto Por Artículo"]
  },    
  {
    id: "VtasTon",
    titulo: "Cumpl",
    subtitulo: "% de cumplimiento o avance con respecto al presupuesto de kilos asignado",
    descripcion: ["Cumpl = Vta Ton / Pto Ton * 100"]
  },    
  {
    id: "VtasTon",
    titulo: "Tend Ton",
    subtitulo: "Tendencia o pronóstico en miles de kilos a vender con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["Promedio Diario = Vta Ton / Número de Días Laborales Transcurridos", "Tend Ton = Promedio Diario * Total de Días Laborales del Mes"]
  },    
  {
    id: "VtasTon",
    titulo: "% Tend",
    subtitulo: "Tendencia o pronóstico en porcentaje de ventas en miles de kilos con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["% Tend = Tend Ton / Pto Ton * 100"]
  },    
  {
    id: "Mezcla",
    titulo: "Mezcla %",
    subtitulo: "Diversificación de las ventas realizadas",
    descripcion: ["Mezcla % = Tend Vta (Por Familia) / Tend Vta (Todas Las Familias) * 100"]
  },    
  {
    id: "Mezcla",
    titulo: "Ptop Mezcla",
    subtitulo: "Diversificación del presupuesto asignado",
    descripcion: ["Ptop Mezcla = Valor Dinámico Asignado Por Administración"]
  },
  {
    id: "UtilMiles",
    titulo: "Util. Miles",
    subtitulo: "Utilidad generada en miles de pesos , con respecto a las ventas realizadas",
    descripcion: ["Util. Miles = Vtas Miles - Costo de Vta"]
  },
  {
    id: "UtilMiles",
    titulo: "Pto Util.",
    subtitulo: "Presupuesto de utilidad en miles de pesos asignado",
    descripcion: ["Pto Util. = Pto Miles - Pto Costo"]
  },
  {
    id: "UtilMiles",
    titulo: "Cumpl",
    subtitulo: "% de cumplimiento o avance con respecto al presupuesto de utilidad asignado",
    descripcion: ["Cumpl = Util. Miles / Pto Util. * 100"]
  },
  {
    id: "UtilMiles",
    titulo: "Tend Util",
    subtitulo: "Tendencia o pronóstico en miles de pesos de utilidad a generar, con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["Promedio Diario = Util. Miles / Numero de Días Laborales Transcurridos", "Tend Util = Promedio Diario * Total de Días Laborales del Mes"]
  },
  {
    id: "UtilMiles",
    titulo: "% Tend",
    subtitulo: "Tendencia o pronóstico en porcentaje de utilidad en miles de pesos con respecto a volumen de ventas realizadas en los días anteriores",
    descripcion: ["% Tend = Tend Util / Pto Util. * 100"]
  },
  {
    id: "Margen",
    titulo: "Margen",
    subtitulo: "% de margen generado con respecto a las ventas realizadas en los días anteriores",
    descripcion: ["Margen = Costo / Vtas Miles -1 * 100"]
  },
  {
    id: "Margen",
    titulo: "Mrg Pto",
    subtitulo: "Presupuesto asignado en % del margen",
    descripcion: ["Mrg Pto = Pto Costo / Pto Miles - 1 * 100"]
  },
  {
    id: "Margen",
    titulo: "Cumpl",
    subtitulo: "% de cumplimiento o avance del margen",
    descripcion: ["Cumpl = Margen / Mrg Pto * 100"]
  }
];

export const catalogoCondicionesColores: iCatalogoCondicionesColores[] = [
  {
    indicador: "Ventas",
    tipo: "Importe",
    meta: "100",
    condicion: "Si Cumpl >=",
    desde: "95",
    condicion1: "N/A",
    hasta: "N/A",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Toneladas",
    meta: "100",
    condicion: "Si Cumpl >=",
    desde: "95",
    condicion1: "N/A",
    hasta: "N/A",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Margen",
    meta: "100",
    condicion: "Si Cumpl >=",
    desde: "95",
    condicion1: "N/A",
    hasta: "N/A",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Mezcla O. Aceros",
    meta: "65",
    condicion: "Si Cumpl >=",
    desde: "65",
    condicion1: "&&<=",
    hasta: "100",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Mezcla Polvos",
    meta: "10",
    condicion: "Si Cumpl >=",
    desde: "0",
    condicion1: "&&<=",
    hasta: "10",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Mezcla Varillas",
    meta: "25",
    condicion: "Si Cumpl >=",
    desde: "0",
    condicion1: "&&<=",
    hasta: "25",
    color: "Verde",
    sino: "Rojo"
  },
  {
    indicador: "Ventas",
    tipo: "Utilidad",
    meta: "100",
    condicion: "Si Cumpl >=",
    desde: "95",
    condicion1: "N/A",
    hasta: "N/A",
    color: "Verde",
    sino: "Rojo"
  }
];