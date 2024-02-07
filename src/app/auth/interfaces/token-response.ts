export interface TokenResponse {
  TokenName: string;
  TokenValue: string;
}

export interface TokenPayload{
  aud: string;
  exp: number;
  iat: Date;
  InfoUsuario: string;
  iss: string;
  jti: string;
  sub: string;
  Usuario: string;
}

export interface InfoUsuario{
  Resultado: string;
  Mensaje: string;
  Nombre: string;
  Puesto: string;
  Usuario: string;
  GrupoTrabajo: string;
  UrlFoto: string;
  Jwt: string;
  Menu: string;
}
/* '{"Resultado":"Y","Mensaje":"Acceso Concedido","Nombre":"DESARROLLADOR DE SISTEMAS 3 (Miguel Galvan)","Puesto":"ANALISTA Y DESARROLLADOR DE SISTEMAS",
"Usuario":"SISTDESA03","GrupoTrabajo":"Sistemas","UrlFoto":"4264 Galvan Tirado Miguel Angel.jpg","Jwt":"","Menu":"[{\\"Apptitle\\":\\"Indicadores Web\\",\\"a_icon\\":\\"fa-solid fa-credit-card\\",\\"color\\":\\"#00ff00\\",\\"menu\\":[{\\"submenu\\":[{\\"MenuTitle\\":\\"Dashboard\\",\\"page\\":\\"\\\\/IndicadoresWeb\\\\/dashboard\\",\\"sm_icon\\":\\"pi pi-file\\",\\"show\\":true,\\"p…/ventas\\",\\"sm_icon\\":\\"pi pi-file\\",\\"show\\":true,\\"permisos\\":[{\\"permiso\\":\\"Acceso Total Indicadores\\"},{\\"permiso\\":\\"Consultar\\"}]},{\\"MenuTitle\\":\\"Ventas Segmento\\",\\"page\\":\\"\\\\/IndicadoresWeb\\\\/VentasSegmento\\",\\"sm_icon\\":\\"pi pi-book\\",\\"show\\":true,\\"permisos\\":[{\\"permiso\\":\\"Consultar\\"}]},{\\"MenuTitle\\":\\"Tendencia Ventas\\",\\"page\\":\\"\\\\/IndicadoresWeb\\\\/VentasTendencia\\",\\"sm_icon\\":\\"pi pi-book\\",\\"show\\":tr... */
