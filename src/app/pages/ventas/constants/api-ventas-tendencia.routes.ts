import { environment as ENV } from 'src/environments/environment';

export const END_POINT_VENTAS_TENDENCIA = {
  CREATE: {
  },
  READ: {
    USUARIOCATALOGOS: `${ENV.apiUrlIndicadores}IndicadoresWeb/Permisos/GetPermisos`,
    DATOSVENTAS: `${ENV.apiUrlIndicadores}Indicadores/Ventas/GetVentasTendencia`
  },
  UPDATE: {
  },
  DELETE: {
  }
};