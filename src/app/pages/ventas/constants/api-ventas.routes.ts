import { environment as ENV } from 'src/environments/environment';

export const END_POINT_VENTAS_SEGMENTO = {
  CREATE: {
  },
  READ: {
    USUARIOCATALOGOS: `${ENV.apiUrlIndicadores}IndicadoresWeb/Permisos/GetPermisos`,
    DATOSVENTAS: `${ENV.apiUrlIndicadores}Indicadores/Ventas/GetVentas`,
    DATOSVENTASACTUALIZADOS: `${ENV.apiUrlIndicadores}Indicadores/Ventas/UpdateGetVentas`,
  },
  UPDATE: {
  },
  DELETE: {
  }
};