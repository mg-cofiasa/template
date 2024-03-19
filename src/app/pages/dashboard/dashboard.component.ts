import { PercentPipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { DashboardService } from './services/dashboard.service';
import { iCatalogoCadena, iCatalogoCadenaReferencia, iCatalogoNumero, iCatalogoNumeroReferencia, iSucursalesUbicacion, iZonaPlazaSucursales } from './interfaces/dashboard.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  public CatalogoSucursalesUbicacion: iSucursalesUbicacion[] = [];
  public CatalogoZonas: iCatalogoCadena[] = [];
  public CatalogoPlazas: iCatalogoCadenaReferencia[] = [];
  public CatalogoSucursales: iCatalogoNumeroReferencia[] = [];
  
  public cboZonaData: iCatalogoCadena[] = [];
  public cboPlazaData: iCatalogoCadena[] = [];
  public cboSucursalData: iCatalogoNumero[] = [];
  public cboPeriodoData: any[] = [];


  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([28.665392, -106.084657]), // Amman
    L.marker([32.5568, 35.8469]), // Irbid
  ];

  public formBusqueda: FormGroup = this.fb.group({
    cboPeriodo: [],
    cboZona: [],
    cboPlaza: [],
    cboSucursal: []
  });


  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [25.497903, -102.475302],
      zoom: 5,
    });

    const tiles = L.tileLayer(
      //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, <a href="https://cofiasa.com.mx/" target="_blank">Cofiasa</a>',
      }
    );

    tiles.addTo(this.map);
  }
  pipe: any = new PercentPipe('en-US');

  types: string[] = ['line', 'stackedline', 'fullstackedline'];

  countriesInfo: any[] = [
    {
      country: 'Ene',
      hydro: 71.2,
      oil: 910.4,
    },
    {
      country: 'Feb',
      hydro: 72.5,
      oil: 223.6,
    },
    {
      country: 'Mar',
      hydro: 47.7,
      oil: 149.4,
    },
    {
      country: 'Abr',
      hydro: 17.9,
      oil: 283.6,
    },
    {
      country: 'May',
      hydro: 14.4,
      oil: 86.4,
    },
    {
      country: 'Jun',
      hydro: 6.6,
      oil: 101.7,
    },
    {
      country: 'Jul',
      hydro: 6.6,
      oil: 101.7,
    },
    ,
    {
      country: 'Ago',
      hydro: 6.6,
      oil: 101.7,
    },
    ,
    {
      country: 'Sep',
      hydro: 6.6,
      oil: 101.7,
    },
    ,
    {
      country: 'Oct',
      hydro: 6.6,
      oil: 101.7,
    },
    {
      country: 'Nov',
      hydro: 6.6,
      oil: 101.7,
    },
    {
      country: 'Dic',
      hydro: 6.6,
      oil: 101.7,
    },
  ];

  energySources: any[] = [
    { value: 'hydro', name: 'Hydro-electric' },
    { value: 'oil', name: 'Oil' },
  ];

  populationByRegions: any[] = [
    {
      region: 'Asia',
      val: 4119626293,
    },
    {
      region: 'Africa',
      val: 1012956064,
    },
    {
      region: 'Northern America',
      val: 344124520,
    },
    {
      region: 'Latin America and the Caribbean',
      val: 590946440,
    },
    {
      region: 'Europe',
      val: 727082222,
    },
    {
      region: 'Oceania',
      val: 35104756,
    },
  ];
  userData: any[] = [
    { age: '2024', number: 6869661 },
    { age: '2023', number: 40277957 },
    { age: '2022', number: 53481235 },
  ];

  customizeTooltip = (arg: any) => ({
    text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  });

  getEnergySources(): any[] {
    return this.energySources;
  }

  getCountriesInfo(): any[] {
    return this.countriesInfo;
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(
      this.markers.map((marker) => marker.getLatLng())
    );

    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.dashboardService.GetSucursalesUbicacion().subscribe((data: iZonaPlazaSucursales) => {
      this.CatalogoSucursalesUbicacion = data.sucursalesUbicacion;
      this.CatalogoZonas = data.zonas;
      this.CatalogoPlazas = data.plazas;

      this.cboZonaData = data.zonas;
      this.cboPlazaData = data.plazas;

      let colores: any[] = [
        {
          id: 'CHIHUAHUA',
          color: '#459fa5'
        }
      ]

      data.sucursalesUbicacion.forEach((item: iSucursalesUbicacion) => {
        let color:any = colores.filter(color=>color.id === item.Zona);
        if (color.length === 0){
          color =[{
            id: 'CHIHUAHUA',
            color: '#000000'
          }]
        }

        const fontAwesomeIcon = L.divIcon({
          html: '<i class="fa-solid fa-location-dot fa-2x" style="color:'+color[0].color+'"></i>',
          iconSize: [20, 20],
          className: 'myDivIcon'
      });

        this.cboSucursalData.push({Id: item.Id, Nombre: item.Id.toString().concat(". ", item.Sucursal) });
        this.CatalogoSucursales.push({Id: item.Id, Nombre: (item.Id + ". " + item.Sucursal), Referencia: item.Plaza});

        const marker = L.marker([item.Latitud, item.Longitud], {icon: fontAwesomeIcon}).bindPopup(
          item.Zona.concat(' > ', item.Plaza, ' > ', item.Sucursal));

        marker.addTo(this.map);
      });
    });
  }







  /**
   * Accion: Obtiene las plazas de acuerdo a la zona seleccionada
   */
  public PlazasPorZona(){
    let validaCampo = this.formBusqueda.controls["cboZona"].value;
    let coordenadas: L.LatLngTuple[] = [];

    this.formBusqueda.controls["cboPlaza"].setValue(null);
    this.formBusqueda.controls["cboSucursal"].setValue(null);
    this.cboPlazaData = [];
    this.cboSucursalData = [];

    if (validaCampo !== null){
      let zona: iCatalogoCadena = validaCampo;

      this.cboPlazaData = this.CatalogoPlazas.filter((item: iCatalogoCadenaReferencia) => item.Referencia === zona.Nombre);

      this.CatalogoSucursalesUbicacion.forEach((item: iSucursalesUbicacion) => {
        if (item.Zona === zona.Nombre){
          coordenadas.push([item.Latitud, item.Longitud]);
        }
      });
    }
    else{
      this.cboPlazaData = this.CatalogoPlazas;

      this.CatalogoSucursalesUbicacion.forEach((item: iSucursalesUbicacion) => {
        coordenadas.push([item.Latitud, item.Longitud]);
      });      
    }
    
    this.SucursalesPorPlaza();
    this.MapaIrCoordenadas(coordenadas);
  }

  /**
   * Accion: Obtiene las sucursales de acuerdo a la plaza seleccionada
   */
  public SucursalesPorPlaza(){
    let validaCampo = this.formBusqueda.controls["cboPlaza"].value;
    let coordenadas: L.LatLngTuple[] = [];
    this.formBusqueda.controls["cboSucursal"].setValue(null);

    if (validaCampo !== null){
      let plaza: iCatalogoCadena = validaCampo;

      this.cboSucursalData = this.CatalogoSucursales.filter((item: iCatalogoNumeroReferencia) => item.Referencia === plaza.Nombre);

      this.CatalogoSucursalesUbicacion.forEach((item: iSucursalesUbicacion) => {
        if (item.Plaza === plaza.Nombre){
          coordenadas.push([item.Latitud, item.Longitud]);
        }
      });      
    }
    else{
      this.cboSucursalData = this.CatalogoSucursales.filter((item: iCatalogoNumeroReferencia) => this.cboPlazaData.find((plaza: iCatalogoCadena) => plaza.Nombre === item.Referencia));

      this.CatalogoSucursalesUbicacion.forEach((item: iSucursalesUbicacion) => {
        coordenadas.push([item.Latitud, item.Longitud]);
      });           
    }

    this.MapaIrCoordenadas(coordenadas);
  }

  public MapaIrCoordenadas(coordenadas: L.LatLngTuple[]){
    const bounds = new L.LatLngBounds(coordenadas);
    this.map.flyToBounds(bounds);
  }
}
