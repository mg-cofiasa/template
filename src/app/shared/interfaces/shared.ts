export interface UsuarioMenu{
  Aplicacion: string;
  Icono: string;
  Menu: Menu[];
}

export interface Menu{
  Contenedor: string;
  Icono: string;
  Submenu: Submenu[];
}

export interface Submenu{
  Seccion: string;
  Icono: string;
}
