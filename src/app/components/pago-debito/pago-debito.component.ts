import { Component, OnInit } from '@angular/core';
import { ServiceXmlService } from "../../services/xmlService/service-xml.service";
import { PagoTBKService } from "../../services/PagoTBK/pago-tbk.service";
import { SweetAlertService } from '../../services/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-debito',
  templateUrl: './pago-debito.component.html',
  styleUrls: ['./pago-debito.component.css']
})
export class PagoDebitoComponent implements OnInit {

  PagoInicio:boolean
  Pagoefallido:boolean;
  PagoeExitoso:boolean;
  PagoeRetireRecivo:boolean;
  PagoeMuchasGracias:boolean;
  response:any;
  notaventa;
  respuestaTBK:any;
  tipoDoc
  DataCongf;

  voucher:string;
  
  constructor( private serviceXmlService: ServiceXmlService, private SweetAlertService:SweetAlertService, private PagoTBKService: PagoTBKService, private router: Router) { }
  async ngOnInit() {
    this.PagoInicio = true;
    this.Pagoefallido = false;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;
    this.response = JSON.parse(localStorage.getItem("detalle"));
    this.notaventa = JSON.parse(localStorage.getItem("Notaventa"));
    this.tipoDoc = localStorage.getItem("TipoDocumento");
    
    await this.Configuracion();
    this.RealzarPago();
    
  }

  async Configuracion() {
    var response = await this.serviceXmlService.getJSON();  
    await this.PagoTBKService.getJSON(); 
    console.log(response);
    this.DataCongf = response;
  }

  

  pagofallido(){
    this.PagoInicio = false;
    this.Pagoefallido = true;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;
    setTimeout(() => {this.router.navigate(['/tipoPago']);}, 6000);
  }

  pagoexitoso(){
    this.PagoInicio = false;
    this.Pagoefallido = false;
    this.PagoeExitoso = true;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;
    this.ImprimirVoucher();
    var codpago;
    if (this.respuestaTBK["data"]["numCuotas"] != "") {
      codpago  = this.respuestaTBK["data"]["numCuotas"] + " CUOTAS";
    }
    else {
      codpago = "CONTADO";
    }

    var inyeccion = {
      "montoPago": this.response["dataC"]["total"].tostring(),
      "tipoDoctoPago": this.tipoDoc  == "B"? this.DataCongf.DatosEmpresa.tipoDoctoPagoB:this.DataCongf.DatosEmpresa.tipoDoctoPagoF,
      "montoIngreso": this.response["dataC"]["total"].tostring(),
      "monto": this.response["dataC"]["total"].tostring(),
      "codigoPago": codpago,
      "correlativo": this.response["dataC"]["correlativo"],
      "empresa": this.DataCongf.DatosEmpresa.Empresa,
      "nroDoctoPago":  this.respuestaTBK["data"]["codAuth"],
      "nrodeCuotas": this.respuestaTBK["data"]["numCuotas"],
      "montoCuotas": this.respuestaTBK["data"]["montoCuotas"],
      "tipoPago": this.respuestaTBK["data"]["tipoTarjeta"],
      "nroNotaVenta": this.notaventa
    }
    this.serviceXmlService.InyectarDocumento(inyeccion);
  }

  Retirorecivo(){
    this.PagoInicio = false;
    this.Pagoefallido = false;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = true;
    this.PagoeMuchasGracias = false;
    setTimeout(() => { this.MuchasgraciasFin();}, 6000);
  }

  MuchasgraciasFin(){
    this.PagoInicio = false;
    this.Pagoefallido = false;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = true;
    setTimeout(() => { this.router.navigate(['']);}, 6000);
  }

  async ImprimirNota(){
    var respuesta = await this.serviceXmlService.ImprimirNota(this.response);
    console.log(respuesta);
  }

  async ImprimirVoucher(){
    var respuesta = await this.serviceXmlService.ImprimirVoucherTBK(this.voucher);
    console.log(respuesta);
    if (respuesta == true ) {
      this.Retirorecivo();
    }
    else{
      this.Retirorecivo();
    }
  }

  async RealzarPago(){
    console.log(this.response);
    var datosPago = {
      "RutCliente": this.response["dataC"]["cliente"].split("-")[0],
        "DvCliente": this.response["dataC"]["cliente"].split("-")[1],
        "TotalCancelado": this.response["dataC"]["total"],
        "NroCliente": "1"
    }
    var pool = await this.PagoTBKService.poolingTBK();
    console.log(pool);
    
    if (pool == true || pool == "true") {
      var respuesta = await this.PagoTBKService.RealizarPAgo(datosPago);
      console.log(respuesta);
      if (respuesta["status"] == true) {
        this.voucher = respuesta["data"]["voucher"];
        this.respuestaTBK = respuesta;
        this.pagoexitoso();
        
      }
      else{
        this.pagofallido();
      }
    }
    else{
      this.SweetAlertService.swalWarning("No se pueden realizar Pagon con Tarjeta, Por favor intente con efectivo");
      this.pagofallido();
    }
  }


}
