import { environment as ENV } from 'src/environments/environment';

export const END_POINT_DASHBOARD = {
  CREATE: {
  },
  READ: {
    SUCURSALESUBICACION: `${ENV.apiUrlIndicadores}Indicadores/Dashboard/SucursalesUbicacion`
  },
  UPDATE: {
  },
  DELETE: {
  }
};