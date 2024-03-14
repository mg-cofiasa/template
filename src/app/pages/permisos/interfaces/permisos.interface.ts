export interface iUsuarioInformacion{
  Empresa: string;
  Zona: string;
  Plaza: string;
  Sucursal: string;
  Departamento: string;
  Nombre: string;
  Personal: string;
  Usuario: string;
  Correo: string;
  UrlFoto: string;
  Aplicacion: iUsuarioAplicacion[];
}

export interface iUsuarioAplicacion{
  IdAplicacion: string;
  NombreAplicacion: string;
}

export interface iUsuarioPermisosGuardar{
  IdUsuario: string;
  IdAplicacion: string;
  Permisos: string;
}

export interface iOpcionesSeleccionadas{
  key: string;
  data: string;
  label: string;
}

export interface iAplicacionPermisos{
 App: string;
 Menu: iAplicacionPermisosMenu[]; 
}

export interface iAplicacionPermisosMenu{
  Seccion: string;
  Permisos: iAplicacionSeccionPermisos[];
}

export interface iAplicacionSeccionPermisos{
  Permiso: string;
  PermisoNombre: string;
  Valor: number;
}

export interface iAplicacionRoles{
  Id: string;
  Nombre: string;
  Permisos: iAplicacionRolesSeccion[];
}

export interface iAplicacionRolesSeccion{
  Nombre: string;
  Seccion: iAplicacionRolesOpcion[];
}

export interface iAplicacionRolesOpcion{
  Id: string;
  Nombre: string;
}