import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentasSegmentoService } from '../services/ventas-segmento.service';
import { MessageService } from 'primeng/api';
//import { AuthService } from '@modules/auth';
import { iArregloGraficaDatos, iCatalogoCondicionesColores, iCatalogoFormulas, iCatalogoIdNombre, iCatalogoNombre, iCatalogos, iEnviarDatosGrafica, iTablaVentaSegmento, iUsuarioCatalogos } from '../interfaces/ventas.interface';
import * as Highcharts from 'highcharts';
import Swal from 'sweetalert2';

import Drilldown from "highcharts/modules/drilldown";
Drilldown(Highcharts);

import { catalogoCondicionesColores, catalogoFormulas } from '../constants/api-ventas-catalogos';
import { formatDate } from '@angular/common';
import { VentasBaseService } from '../services/ventas-base.service';
import { VentasService } from '../services/ventas.service';
import { InfoUsuario } from 'src/app/auth/interfaces/token-response';
import { TokenService } from 'src/app/auth/services/token.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-ventas-segmento',
  templateUrl: './ventas-segmento.component.html',
  styleUrls: ['./ventas-segmento.component.scss'],
  providers: [MessageService]
})
export class VentasSegmentoComponent {
  public actualizarGraficaProyeccion: boolean = true;
  public infoUsuario: InfoUsuario = <InfoUsuario>{};
  
  public tablaAgruparPor: string = "OrdenVerdadero";

  public tituloGraficasTablas: string = "";
  public tituloColumnaTabla: string = "Sucursal";
  public datosGraficas: iArregloGraficaDatos = <iArregloGraficaDatos>{};

  public formulasVisible: boolean = false;
  public condicionesColoresVisible: boolean = false;

  public formulas: iCatalogoFormulas[] = catalogoFormulas;
  public condicionesColores: iCatalogoCondicionesColores[] = catalogoCondicionesColores;

  public actualizacionInformacion: Date = new Date();
  public tablaData: iTablaVentaSegmento[] = [];
  public mostrarGraficas: boolean = false;
  public mostrarTabla: boolean = false;
  public actualGraficaTabla: string = "grafica";

  private usuario?: string = "";
  public periodo: number[] = [];
  public fechaHoy = new Date();
  public periodoActual: string = ((this.fechaHoy.getFullYear() * 100) + this.fechaHoy.getMonth() + 1).toString();

  public enviarDatosGrafica: iEnviarDatosGrafica = <iEnviarDatosGrafica>{};

  //public empresa: string = localStorage.getItem('empresa')!.toString();
  public ventaNeta: boolean = false;
  
  public formBusqueda: FormGroup = this.fb.group({
    cboPeriodo: [],
    cboZona: [],
    cboPlaza: [],
    cboSucursal: [],
    cboSegmento: [],
    cboCategoria: [],
    chkVentaNeta: [false],
    chkProyeccionUtilidad: [false],
    cboConceptoPago: [],
  });

  public cboPeriodoData: iCatalogoNombre[] = [];
  public cboZonaData: iCatalogos[] = [];
  public cboPlazaData: iCatalogos[] = [];
  public cboSucursalData: iCatalogos[] = [];
  public cboSegmentoData: iCatalogoNombre[] = [];
  public cboCategoriaData: iCatalogoIdNombre[] = [
    {Id: 2, Nombre: "Agentes"},
    {Id: 3, Nombre: "Mostrador y agente"},
    {Id: 1, Nombre: "Mostradores"},
    {Id: 0, Nombre: "Sucursales"},
  ];
  public cboConceptoPagoData: iCatalogoNombre[] = [];

  Highcharts: typeof Highcharts = Highcharts;

  public estructuraBaseGrafica: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      borderWidth: 0,
    },     
    credits: {
      enabled: false
    },
    title: {
      text: '',
      style: {
        color: '#4d56a5'
      }
    },
    subtitle: {
      align: 'center',
      text: ' '
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        tooltip: {},
        dataLabels: {
          enabled: true,
          format: '{point.tooltip}',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#cacef7',
          shadow:false,
          style:{fontSize:'0.85em',backgroundColor:'transparent'}
        }
      }
    },
    xAxis: {
      type: 'category',
      gridLineWidth: 1,
      gridLineColor: '#d0e5ff',
      labels:{
        style: {
          fontSize:'1em'
        }
      }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: '#f0f0f0',
      title: {
        text: 'MILES &nbsp; DE &nbsp; PESOS',
        style: {
          fontSize: '0.85em'
        }
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.tooltip}',
      style: {
        color:'#ffffff', fontSize:'1em'
      },
      padding:10,
      backgroundColor:'#232323'
    },
    legend:{enabled:false},
    series:[
      {
        name: '',
        type:'column',
        shadow:true,
        colorByPoint: true,
        tooltip: {
          followPointer: true
        },
        dataLabels:{crop: false, overflow:'allow', y:-4, shadow:false},
        data: []
      }]
  };

  public estructuraBaseGraficaProyeccion: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      align: 'center',
      text: ''
    },
    subtitle: {
      align: 'center',
      text: ''
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
        enabled: false
    },
    credits:{
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.2f}',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#cacef7',
          shadow:false,
          style: {
            fontSize:'0.85em',
            backgroundColor:'transparent'
          },
          color:'#000000'
        }
      }
    },
    global: {
      useUTC: false,
    },    
    lang:{
      decimalPoint:'.',
      thousandsSep:','
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: ${point.y: ,.2f}',
      style: {
        color:'#ffffff', fontSize:'1em'
      },
      padding:10,
      backgroundColor:'#232323',
      formatter:function(){
        return '<span style="color:' + this.point.color + '">' +  this.point.name + '</span>' + ': $' + Highcharts.numberFormat(this.point.y! , 2,'.',',');
      }      
    },
    series: [{}] as any,
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: [{}] as any
    }
  };

  public ventaEnDineroGrafica: Highcharts.Options = this.estructuraBaseGrafica;
  public ventaEnToneladasGrafica: Highcharts.Options = this.estructuraBaseGrafica;
  public utilidadEnImporteGrafica: Highcharts.Options = this.estructuraBaseGrafica;
  public margenGrafica: Highcharts.Options = this.estructuraBaseGrafica;
  
  public utilidadOperacionGrafica: Highcharts.Options = this.estructuraBaseGraficaProyeccion;
  public faltantePuntoEquilibrioGrafica: Highcharts.Options = this.estructuraBaseGraficaProyeccion;
  public utilidadBrutaGrafica: Highcharts.Options = this.estructuraBaseGraficaProyeccion;
  public mezclaGrafica: Highcharts.Options = this.estructuraBaseGrafica;

  constructor(
    //private auth: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private ventasService: VentasService,
    private ventasBaseService: VentasBaseService,
    private ventasSegmentoService: VentasSegmentoService,
    private tokenService: TokenService,
    private sharedService: SharedService
    ){
      this.infoUsuario = this.tokenService.ObtenerInfoUsuario();
      this.usuario = this.infoUsuario.Usuario;

      for(let anio = (Number(this.fechaHoy.getFullYear())) ; anio >= Number(this.fechaHoy.getFullYear()-5) ; anio--){
        let mesBase = 12;
        if (anio === this.fechaHoy.getFullYear()){
          mesBase = this.fechaHoy.getMonth() + 1;
        }

        for(let mes = mesBase ; mes > 0 ; mes--){
          this.cboPeriodoData.push({Nombre: anio + '' + mes.toString().padStart(2, '0')});
        }
      }

      this.GetPermisosUsuario(this.usuario);     
  }

  /**
   * Acción: Getter para facilitar el acceso al formulario
   */    
  public get form(){
    return this.formBusqueda.controls;
  }

  public GetDatosGraficas(tipo: string, event: any = null, graficaTabla: string){    
    this.enviarDatosGrafica.ProyeccionUtilidad = this.form["chkProyeccionUtilidad"].value;

    if (this.enviarDatosGrafica.ProyeccionUtilidad === true){
      this.formBusqueda.controls["cboSegmento"].setValue(null);
      this.formBusqueda.controls["cboConceptoPago"].setValue(null);
      this.formBusqueda.controls["cboCategoria"].setValue({Id: 0, Nombre: "Sucursales"});

      this.formBusqueda.controls["cboSegmento"].disable();
      this.formBusqueda.controls["cboConceptoPago"].disable();
      this.formBusqueda.controls["cboCategoria"].disable();
    }
    else{
      this.formBusqueda.controls["cboSegmento"].enable();
      this.formBusqueda.controls["cboConceptoPago"].enable();
      this.formBusqueda.controls["cboCategoria"].enable();
    }
        
    if (["cboZona", "cboPlaza", "cboSucursal"].includes(tipo)){
      let opcion = event.value;
      
      if (opcion === null){
        this.enviarDatosGrafica.LugarValor = "";
        this.enviarDatosGrafica.TipoLugar = "";
      }
      else{
        this.enviarDatosGrafica.LugarValor = event.value.Valor;
        this.enviarDatosGrafica.TipoLugar = tipo.replace("cbo", "");
      }
      
      this.formBusqueda.controls["cboZona"].setValue(null);
      this.formBusqueda.controls["cboPlaza"].setValue(null);
      this.formBusqueda.controls["cboSucursal"].setValue(null);
      this.formBusqueda.controls[tipo].setValue(event.value);
    }

    let segmento: iCatalogoNombre = this.form["cboSegmento"].value;
    let concepto: iCatalogoNombre = this.form["cboConceptoPago"].value;
    this.enviarDatosGrafica.VentaNeta = this.form["chkVentaNeta"].value;

    if (this.form["cboPeriodo"].value === null){
      this.messageService.add({severity: 'info', summary: 'Seleccionar un periodo', detail: `Seleccionar un periodo de la lista`});
      return 1;
    }

    let periodo: iCatalogoNombre = this.form["cboPeriodo"].value;
    let actualizarDatos: boolean = this.enviarDatosGrafica.Periodo !== periodo.Nombre ? true : false;

    this.enviarDatosGrafica.Periodo = periodo.Nombre;

    if (tipo === "actualizarDatos"){
      actualizarDatos = true;
    }
    
    if (segmento === null){
      this.enviarDatosGrafica.Segmento = "";
    }
    else{
      this.enviarDatosGrafica.Segmento = segmento.Nombre.replace("+", "%2B");
    }

    if (concepto === null){
      this.enviarDatosGrafica.Concepto = "";
    }
    else{
      this.enviarDatosGrafica.Concepto = concepto.Nombre;
    }

    if (this.enviarDatosGrafica.TipoLugar === undefined || this.enviarDatosGrafica.TipoLugar === ""){
      this.enviarDatosGrafica.TipoLugar = "Gran Total";
    }

    if (graficaTabla != ""){
      this.actualGraficaTabla = this.actualGraficaTabla === "grafica" ? "tabla" : "grafica";
    }

    if (this.actualGraficaTabla === "grafica"){ // Genera las gráficas
      this.tituloGraficasTablas = "Consulta por Sucursales (Venta por sucursal)";

      this.ventaEnDineroGrafica.series = [{}] as any;
      this.ventaEnToneladasGrafica.series = [{}] as any;
      this.utilidadEnImporteGrafica.series = [{}] as any;
      this.margenGrafica.series = [{}] as any;

      this.utilidadOperacionGrafica.series = [{}] as any;
      this.faltantePuntoEquilibrioGrafica.series = [{}] as any;
      this.utilidadBrutaGrafica.series = [{}] as any;
      this.mezclaGrafica.series = [{}] as any;

      if (this.mostrarGraficas === false){
        setTimeout(()=>{
          this.MostrarGraficas(this.enviarDatosGrafica, actualizarDatos);
          this.mostrarGraficas = true;
          this.mostrarTabla = false;    
        }, 100);
      }
      else{
        this.MostrarGraficas(this.enviarDatosGrafica, actualizarDatos);
        this.mostrarGraficas = true;
        this.mostrarTabla = false;

        if (this.form["chkProyeccionUtilidad"].value === true){
          this.actualizarGraficaProyeccion = false;
        }              
      }
    }
    else{ // Genera la tabla
      this.mostrarGraficas = false;
      this.mostrarTabla = true;

      if (this.form["cboCategoria"].value === null){
        this.form["cboCategoria"].setValue({Id: 0, Nombre: "Sucursales"});
      }

      if (this.form["cboCategoria"].value.Id === 0){
        this.tituloColumnaTabla = "Sucursal";
        this.tituloGraficasTablas = "Consulta por Sucursales (Venta por sucursal)";
      }
      else if(this.form["cboCategoria"].value.Id === 1){
        this.tituloColumnaTabla = "Mostrador";
        this.tituloGraficasTablas = "Consulta por Mostradores (Incluye Solo Agentes Mostradores)";
      }
      else if(this.form["cboCategoria"].value.Id === 2){
        this.tituloColumnaTabla = "Agente";
        this.tituloGraficasTablas = "Consulta por Agentes de Venta (Incluye Solo Agentes de Ventas)";
      }
      else if(this.form["cboCategoria"].value.Id === 3){
        this.tituloColumnaTabla = "Agente y mostrador";
        this.tituloGraficasTablas = "Consulta por Agentes y Mostradores de Venta (Agentes + Mostradores)";
      }
      
      this.MostrarTabla(this.enviarDatosGrafica, actualizarDatos);
    }

    return 0;
  }

  /**
   * Acción: Obtiene información para generar las gráficas
   */
  public MostrarGraficas(enviarDatosGrafica: iEnviarDatosGrafica, actualizarDatos: boolean){
    this.sharedService.SwalModalAwaitServer();

    this.ventasSegmentoService.GetDatosGraficasSegmento(enviarDatosGrafica).subscribe({
      next: (Respuesta: any) => {
        this.datosGraficas = Respuesta;
        if (this.form["chkProyeccionUtilidad"].value === false){
          Swal.close();
          this.actualizacionInformacion = new Date();
          this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});          
          this.GenerarGraficas(Respuesta);
        }
        else{
          if (actualizarDatos === true){
            Swal.close();
            this.actualizacionInformacion = new Date();
            this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});
            this.GenerarGraficasProyeccion(Respuesta); 
          }
          else{
            Swal.close();
            this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});
            this.GenerarGraficasProyeccion(Respuesta);
          }
        }
      },
      error: (error) => {
        this.datosGraficas = <iArregloGraficaDatos>{};
        this.GenerarGraficas(this.datosGraficas);
      }
    });
  }

  /**
   * Acción: Genera las gráficas
   */
  public GenerarGraficas(Respuesta: iArregloGraficaDatos){
    if (Respuesta.Ventas !== undefined){
      this.ventaEnDineroGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGrafica));
      this.ventaEnToneladasGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGrafica));
      this.utilidadEnImporteGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGrafica));
      this.margenGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGrafica));
  
      this.ventaEnDineroGrafica.series = [{
        name: 'Venta en dinero',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: Respuesta.Ventas
      }];
  
      this.ventaEnDineroGrafica.title = {text:"VENTA EN DINERO"};
      this.ventaEnDineroGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
  
      this.ventaEnToneladasGrafica.series =  [{
        name: 'Venta en toneladas',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: Respuesta.Toneladas
      }];
      this.ventaEnToneladasGrafica.title = {text:"VENTA EN TONELADAS"};
      this.ventaEnToneladasGrafica.yAxis = {title: {text: "TONELADAS"}};
  
      this.utilidadEnImporteGrafica.series = [{
        name: 'Utilidad en importe',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: Respuesta.Utilidad
      }];
      this.utilidadEnImporteGrafica.title = {text:"UTILIDAD EN IMPORTE"};
      this.utilidadEnImporteGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
  
      this.margenGrafica.series = [{
        name: 'Margen',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: Respuesta.Margen
      }];
      this.margenGrafica.title = {text:"MARGEN"};
      this.margenGrafica.yAxis = {title: {text: "PORCENTAJE"}};      
    }
    else{
      this.ventaEnDineroGrafica.series = [{
        name: 'Venta en dinero',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: []
      }];
  
      this.ventaEnDineroGrafica.title = {text:"VENTA EN DINERO"};
      this.ventaEnDineroGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
  
      this.ventaEnToneladasGrafica.series =  [{
        name: 'Venta en toneladas',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: []
      }];
      this.ventaEnToneladasGrafica.title = {text:"VENTA EN TONELADAS"};
      this.ventaEnToneladasGrafica.yAxis = {title: {text: "TONELADAS"}};
  
      this.utilidadEnImporteGrafica.series = [{
        name: 'Utilidad en importe',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: []
      }];
      this.utilidadEnImporteGrafica.title = {text:"UTILIDAD EN IMPORTE"};
      this.utilidadEnImporteGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
  
      this.margenGrafica.series = [{
        name: 'Margen',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: []
      }];
      this.margenGrafica.title = {text:"MARGEN"};
      this.margenGrafica.yAxis = {title: {text: "PORCENTAJE"}};   

      this.mostrarGraficas = false;
    }
  }

  /**
   * Acción: Genera el arbol de puntos para generar las gráficas
   */
  private GeneraPuntosProyeccion(data: any){
    let colorGraficaVerde = "#50cd89";
    let colorGraficaRojo = "#f1416c";

    let points: any[] = [];

    data.map((l1: any)=>{
      // Comentario: Se forma el primer nivel
      let n1: any = {
        name: "Zona " + l1.Zona,
        y: 0,
        drilldown: "Zona " + l1.Zona,
        color: "",
        nivel: 1,
        shadow:true
      };
      points.push(n1);

      l1.Plazas.map((l2:any)=>{
        // Comentario: Se forma el segundo nivel, si ya existe, se agregan elementos en el arreglo data
        let nivel2Actual = points.filter((x:any)=>x.id === n1.drilldown);
        if (nivel2Actual.length === 0){
          let n2: any = {
            id: n1.drilldown,
            shadow: true,
            color:'#000000',
            data:[
              {
                name: "Plaza " + l2.Plaza,
                y: 0,
                drilldown: "Plaza " + l2.Plaza,
                color: "",
                nivel: 2
              },
            ]
          };

          points.push(n2);
        }
        else{
          nivel2Actual[0].data.push({
            name: "Plaza " + l2.Plaza,
            y: 0,
            drilldown: "Plaza " + l2.Plaza,
            color: "",
            nivel: 2
          });
        }
        
        l2.Sucursales.map((l3:any)=>{
          // Comentario: Se obtiene la sumatoria de sucursales de la plaza actual
          let nivel2Actual = points.filter((x:any)=>x.id === n1.drilldown);
          let nivel2ActualData = nivel2Actual[0].data.filter((x:any)=>x.name === ("Plaza " + l2.Plaza));

          let ejeY = 0;

          if (l3.UtilidadOperacion !== undefined){
            ejeY = l3.UtilidadOperacion;
          }
          else if (l3.FaltantePuntoEquilibrio !== undefined){
            ejeY = l3.FaltantePuntoEquilibrio;
          }
          else if (l3.UtilidadBruta !== undefined){
            ejeY = l3.UtilidadBruta;
          }

          nivel2ActualData[0].y += ejeY;

          if (nivel2ActualData[0].y > 0){
            nivel2ActualData[0].color = colorGraficaVerde;
            nivel2ActualData[0].dataLabels = {y:-4, format: '$' + Highcharts.numberFormat(nivel2ActualData[0].y , 2,'.',',')};
          }
          else{
            nivel2ActualData[0].color = colorGraficaRojo;
            nivel2ActualData[0].dataLabels = {y:4, format: '$' + Highcharts.numberFormat(nivel2ActualData[0].y , 2,'.',',')};
          }

          // Comentario: Se forma el tercer nivel, si ya existe, se agregan elementos en el arreglo data
          let nivel3Actual = points.filter((x:any)=>x.id === ("Plaza " + l2.Plaza));
          if (nivel3Actual.length === 0){
            let n3: any = {
              shadow: true,
              id: ("Plaza " + l2.Plaza),
              data:[
                {
                  name: "Sucursal " + l3.Sucursal,
                  y: ejeY,
                  color: ejeY > 0 ? colorGraficaVerde : colorGraficaRojo,
                  nivel: 3,
                  dataLabels:{y: ejeY > 0 ? -4: 4, format: '$' + Highcharts.numberFormat(ejeY , 2,'.',',')},
                  cursor:'normal'
                }            
              ]
            };

            points.push(n3);
          }
          else{
            nivel3Actual[0].data.push({
              name: "Sucursal " + l3.Sucursal,
              y: ejeY,
              color: ejeY > 0 ? colorGraficaVerde : colorGraficaRojo,
              nivel: 3,
              dataLabels:{y: ejeY > 0 ? -4: 4, format: '$' + Highcharts.numberFormat(ejeY , 2,'.',',')}
            });
          }

          // Comentario: Se obtiene la sumatoria de sucursales de la zona actual
          n1.y += ejeY;
          if (n1.y > 0){
            n1.color = colorGraficaVerde;
            n1.dataLabels = {y:-4, format: '$' + Highcharts.numberFormat(n1.y , 2,'.',',')};
          }
          else{
            n1.color = colorGraficaRojo;
            n1.dataLabels = {y:4, format: '$' + Highcharts.numberFormat(n1.y , 2,'.',',')};
          }
        })
      })
    });

    return points;
  }

  /**
   * Acción: Genera las gráficas de proyección
   */
  public GenerarGraficasProyeccion(Respuesta: any){
    if (Respuesta.UtilidadOperacion !== undefined){
      this.actualizarGraficaProyeccion = true;
      let puntos: any[] = this.GeneraPuntosProyeccion(JSON.parse(Respuesta.UtilidadOperacion));

      this.utilidadOperacionGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGraficaProyeccion));
      this.faltantePuntoEquilibrioGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGraficaProyeccion));
      this.utilidadBrutaGrafica = JSON.parse(JSON.stringify(this.estructuraBaseGraficaProyeccion));
      
      this.utilidadOperacionGrafica.series = [
        {
          dataLabels:{crop: false, overflow:'allow', y:0, shadow:false},
          name: 'ZONAS',
          shadow: true,
          data: puntos.filter((x:any)=> x.nivel === 1)
        }
      ] as any;
      this.utilidadOperacionGrafica.title = {text:"UTILIDAD DE OPERACIÓN"};
      this.utilidadOperacionGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
      this.utilidadOperacionGrafica.drilldown = {
        series: puntos.filter((x:any)=> x.nivel !== 1),
        activeDataLabelStyle:{
          textDecoration:'none',
          color:'#000000'
        },
        activeAxisLabelStyle:{
          color:'#000000'
        }
      };
  
      puntos = this.GeneraPuntosProyeccion(JSON.parse(Respuesta.FaltantePuntoEquilibrio));
      this.faltantePuntoEquilibrioGrafica.series = [
        {
          dataLabels:{crop: false, overflow:'allow', y:0, shadow:false},
          name: 'ZONAS',
          shadow: true,
          data: puntos.filter((x:any)=> x.nivel === 1)
        }
      ] as any;
      this.faltantePuntoEquilibrioGrafica.title = {text:"PUNTO EQUILIBRIO"};
      this.faltantePuntoEquilibrioGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
      this.faltantePuntoEquilibrioGrafica.drilldown = {    
        series: puntos.filter((x:any)=> x.nivel !== 1),
        activeDataLabelStyle:{
          textDecoration:'none',
          color:'#000000',
        },
        activeAxisLabelStyle:{
          color:'#000000',
        }
      };
  
      puntos = this.GeneraPuntosProyeccion(JSON.parse(Respuesta.UtilidadBruta));
      this.utilidadBrutaGrafica.series = [
        {
          dataLabels:{crop: false, overflow:'allow', y:0, shadow:false},
          name: 'ZONAS',
          shadow: true,
          data: puntos.filter((x:any)=> x.nivel === 1)
        }
      ] as any;
      this.utilidadBrutaGrafica.title = {text:"UTILIDAD BRUTA"};
      this.utilidadBrutaGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
      this.utilidadBrutaGrafica.drilldown = {    
        series: puntos.filter((x:any)=> x.nivel !== 1),
        activeDataLabelStyle:{
          textDecoration:'none',
          color:'#000000',
        },
        activeAxisLabelStyle:{
          color:'#000000',
        }
      };

      this.mezclaGrafica.series =  [{
        name: 'Mezcla',
        type:'column',
        colorByPoint: true,
        tooltip:{followPointer:true},
        data: JSON.parse(Respuesta.Mezcla)
      }];
      this.mezclaGrafica.title = {text:"MEZCLA"};
      this.mezclaGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS &nbsp; / &nbsp; PORCENTAJE"}};
    }
    else{
      this.utilidadOperacionGrafica.series = [{}] as any;
      this.utilidadOperacionGrafica.title = {text:"UTILIDAD DE OPERACIÓN"};
      this.utilidadOperacionGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};

      this.faltantePuntoEquilibrioGrafica.series = [{}] as any;
      this.faltantePuntoEquilibrioGrafica.title = {text:"PUNTO EQUILIBRIO"};
      this.faltantePuntoEquilibrioGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};

      this.utilidadBrutaGrafica.series = [{}] as any;
      this.utilidadBrutaGrafica.title = {text:"UTILIDAD BRUTA"};
      this.utilidadBrutaGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};
  
      this.mostrarGraficas = false;
    }
  }  

  /**
   * Acción: Obtiene información para generar la tabla de resultados
   */
  public MostrarTabla(enviarDatosGrafica: iEnviarDatosGrafica, actualizarDatos: boolean){
    this.sharedService.SwalModalAwaitServer();
    this.tablaData = [];

    if (this.form["cboCategoria"].value !== null){
      enviarDatosGrafica.Categoria = this.form["cboCategoria"].value.Id;
    }

    this.ventasSegmentoService.GetDatosTablaSegmento(enviarDatosGrafica).subscribe({
      next: (Respuesta: any[]) => {
        Swal.close();
        this.actualizacionInformacion = new Date();
        this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});

        this.tablaData = Respuesta;

        if (this.form["chkProyeccionUtilidad"].value === false){
          this.tablaAgruparPor = "OrdenVerdadero";
        }
        else{
          this.tablaAgruparPor = "sucursal";
          this.tablaData.map((x: any)=>{
            x.sucursal = parseInt(x.sucursal);
          })
        }
      },
      error: (error) => {
      }
    });    
  }

  /**
   * Acción: Obtiene las zonas, plazas y sucursales del usuario
   */
  public GetPermisosUsuario(usuario: string = ""){
    this.ventasBaseService.GetPermisosUsuario(usuario).subscribe({
      next: (Respuesta: iUsuarioCatalogos) =>{
        this.cboZonaData = Respuesta.Zonas;
        this.cboPlazaData = Respuesta.Plazas;
        this.cboSucursalData = Respuesta.Sucursales;

        this.cboSegmentoData = [];
        Respuesta.Segmentos.map( x=> {
          this.cboSegmentoData.push({Nombre: x});
        });

        this.cboConceptoPagoData = [];
        Respuesta.Conceptos.map( x=> {
          this.cboConceptoPagoData.push({Nombre: x});
        });
      },
      error: (error) => {
      }
    });
  }

  /**
   * Acción: Muestra/Oculta los dialogs de la ayuda
   */
  public OcultarDialogs(dialog: string){
    if (dialog === "formulas"){
      this.formulasVisible = !this.formulasVisible;
      this.condicionesColoresVisible = false; 
    }
    else{
      this.condicionesColoresVisible = !this.condicionesColoresVisible;
      this.formulasVisible = false;
    }
  }

  /**
   * Acción: Envía información al servidor para obtener el excel correspondiente
   */  
  public DescargarExcel(){
    this.sharedService.SwalModalAwaitServer();

    if (this.mostrarGraficas === true){
      this.ventasBaseService.GetExcelGraficas(this.datosGraficas, 1).subscribe({
        next: (Respuesta: any) => {
          Swal.close();

          this.DownloadFile(Respuesta, "ventas_reporte_graficas_" + formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss', 'en') + ".xlsx");
          this.messageService.add({severity: 'success', summary: 'Excel generado', detail: `El archivo se ha generado correctamente`, key: 'preload_success', life:1000});
        },
        error: (error) => {
        }
      });       
    }
    else {
      this.tablaData.map(x=>{
        x.Orden = 1;
      });

      if (this.form["chkProyeccionUtilidad"].value === false){
        this.ventasBaseService.GetExcelTabla(this.tablaData, 1).subscribe({
          next: (Respuesta: iTablaVentaSegmento[]) => {
            Swal.close();
  
            this.DownloadFile(Respuesta, "ventas_reporte_tabla_" + formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss', 'en') + ".xlsx");
            this.messageService.add({severity: 'success', summary: 'Excel generado', detail: `El archivo se ha generado correctamente`, key: 'preload_success', life:1000});
          },
          error: (error) => {
          }
        });
      }
      else{
        this.ventasBaseService.GenerarExcelTablaProyeccion(this.tablaData, 1).subscribe({
          next: (Respuesta: iTablaVentaSegmento[]) => {
            Swal.close();
  
            this.DownloadFile(Respuesta, "ventas_reporte_tabla_" + formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss', 'en') + ".xlsx");
            this.messageService.add({severity: 'success', summary: 'Excel generado', detail: `El archivo se ha generado correctamente`, key: 'preload_success', life:1000});
          },
          error: (error) => {
          }
        });
      }
    }
  }

  /**
   * Acción: Descarga el excel enviado por el servidor
   */  
  public DownloadFile(data: any, archivo: any) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.target = '_blank';
    downloadLink.setAttribute('download', archivo);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}