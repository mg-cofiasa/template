import { environment as ENV } from 'src/environments/environment';

export const END_POINT_VENTAS_BASE = {
  CREATE: {
  },
  READ: {
    USUARIOCATALOGOS: `${ENV.apiUrlIndicadores}IndicadoresWeb/Permisos/GetPermisos`,
    GENERAREXCELGRAFICAS: `${ENV.apiUrlIndicadores}Indicadores/Ventas/GenerarExcelGraficas`,
    GENERAREXCELTABLA: `${ENV.apiUrlIndicadores}Indicadores/Ventas/GenerarExcelTabla`,
    GENERAREXCELTABLAPROYECCION: `${ENV.apiUrlIndicadores}Indicadores/Ventas/GenerarExcelTablaProyeccion`
  },
  UPDATE: {
  },
  DELETE: {
  }
};