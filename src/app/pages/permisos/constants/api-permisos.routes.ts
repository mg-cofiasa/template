import { environment as ENV } from "src/environments/environment";

export const END_POINT_PERMISOS = {
  CREATE: {
    GUARDARAPLICACIONESOPCIONES: `${ENV.apiUrl}Permisos/PostGuardarAplicacionesOpciones`,
  },
  READ: {
    USUARIOAPLICACIONES: `${ENV.apiUrl}Permisos/GetUsuarioAplicaciones`,
    USUARIOAPLICACIONPERMISOS: `${ENV.apiUrl}Permisos/GetUsuarioAplicacionPermisos`,
    USUARIOAPLICACIONESNOASIGNADAS: `${ENV.apiUrl}Permisos/GetAplicacionesNoAsignadas`,
    APLICACIONARBOLPERMISOS: `${ENV.apiUrl}Permisos/GetAplicacionArbolPermisos`,
    APLICACIONROLES: `${ENV.apiUrl}Permisos/GetAplicacionRoles`,
  },
  UPDATE: {
  },
  DELETE: {
  }
};