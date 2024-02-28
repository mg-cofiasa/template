import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class GraficasParametrizacionService {
  public graficaBase: Highcharts.Options = {
    chart: {
      type: 'column',
      borderWidth: 0,
      style:{
        fontSize: '12px'
      }
    },     
    credits: {
      enabled: false
    },
    title: {
      text: ''
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
          style:{fontSize:'12px',backgroundColor:'transparent'}
        }
      }
    },
    xAxis: {
      type: 'category',
      gridLineWidth: 1,
      gridLineColor: '#d0e5ff',
      labels:{
        style: {
          fontSize:'11px'
        }
      }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: '#f0f0f0',
      title: {
        text: 'MILES &nbsp; DE &nbsp; PESOS',
        style: {
          fontSize: '11px'
        }
      },
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.tooltip}',
      style: {
        color:'#ffffff', fontSize:'12px'
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

  public graficaProyeccion: Highcharts.Options = {
    chart: {
      type: 'column',
      style:{
        fontSize:'12px'
      }
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
        text: '',
        style: {
          fontSize: '11px'
        }
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
            fontSize:'12px',
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
        color:'#ffffff', fontSize:'12px'
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
  constructor() { }
}
