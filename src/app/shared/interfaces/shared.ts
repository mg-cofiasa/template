export interface UsuarioMenu{
  Aplicacion: string;
  Icono: string;
  Ruta: string;
  Menu: Menu[];
}

export interface Menu{
  Contenedor: string;
  Icono: string;
  Submenu: Submenu[];
}

export interface Submenu{
  Seccion: string;
  Ruta: string;
  Icono: string;
}

export interface breadcrum{
  seccion: string;
  nivel01: string;
  nivel02: string;
}