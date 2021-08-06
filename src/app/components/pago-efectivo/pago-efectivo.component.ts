import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagoServiceService } from '../../services/service/pago-service.service';
import { interval, Subscription, from } from 'rxjs';
import { Pago } from '../../models/pago/pago';
import { Vuelto } from '../../models/pago/vuelto';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert/sweet-alert.service';
import { NgxToastrService } from '../../services/ngx-toastr/ngx-toastr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NotaVenta } from "../../models/notaVenta/notaVenta";
import { ServiceXmlService } from "../../services/xmlService/service-xml.service";

@Component({
  selector: 'app-pago-efectivo',
  templateUrl: './pago-efectivo.component.html',
  styleUrls: ['./pago-efectivo.component.css']
})

export class PagoEfectivoComponent implements OnInit, OnDestroy {

  dineroIngresado: number;
  dinerFaltarte: number; 
  montoAPagar: number;
  subCancelacion: Subscription;
  subOutPago: Subscription;
  flagOutPago: boolean = false;
  subAlertCtn: Subscription;
  subDetenerVuelto: Subscription;
  flagVuelto: boolean = false;
  flagPago: boolean = true;
  flagEstPago: boolean = false;
  flagEstVuelto: boolean = false;
  flagModalProcesandodatos: boolean = false;
  flagModalProcesandoVueltos: boolean = false;
  flagConsultaEST: boolean = false;
  flagDetenerVuelto: boolean = false;
  flagPagocan: boolean = false;

  subConsultaEST: Subscription;
  flagMensajeEST: boolean = false;
  flagMensajeFloat: boolean = false;

  //Datos de nota de venta
  ItemArrayC;
  notaV: NotaVenta = {
    notaVenta: '',
    cliente: '',
    fecha:'',
    montoTotal: 0
  };
  ItemsArray;

  pago: Pago = {
    montoAPagar: 0,
    dineroIngresado: 0,
    dineroFaltante: 0
  };

  vuelto: Vuelto = {
    VueltoTotal: 0,
    DineroFaltante: 0,
    DineroRegresado: 0,
    VueltoFinalizado: false
  };

  //Datos de estdos e pago

  PagoInicio:boolean
  Pagoefallido:boolean;
  PagoeExitoso:boolean;
  PagoeRetireRecivo:boolean;
  PagoeMuchasGracias:boolean;

  response:any;
  notaventa;
  respuestaTBK:any;
  DataCongf;
  tipoDoc;

  constructor(private serviceXmlService:ServiceXmlService, private PagoService: PagoServiceService, private router: Router, private sweetAlertService: SweetAlertService, private ngxToastrService: NgxToastrService,private route: ActivatedRoute) {
  }
  async ngOnInit() {
    //this.pago.montoAPagar = (Math.round(Math.floor(Math.random() * (2000 - 100)) + 100))*10;
    //this.pago.montoAPagar = 2000//(Math.round(Math.floor(Math.random() * (10 - 1)) + 1)) * 2000
    //this.pago.montoAPagar = 1500
    // this.estadoDinero()
    //this.sweetAlertService.swalSuccess("Ingrese dinero");
    this.PagoInicio = true;
    this.Pagoefallido = false;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;

    this.response = JSON.parse(localStorage.getItem("detalle"));
    this.notaventa = JSON.parse(localStorage.getItem("Notaventa"));
    this.tipoDoc = localStorage.getItem("TipoDocumento");
    await this.Configuracion();
    this.getDetalle();
    
  }

  async Configuracion() {
    var response = await this.serviceXmlService.getJSON();  
    await this.serviceXmlService.getJSON();
    console.log(response);
    this.DataCongf = response;
  }
  
  async getDetalle(){
    var response = JSON.parse(localStorage.getItem("detalle"));
    console.log("response" + JSON.stringify(response));
    
    response['dataD'].forEach(element => {
      element.cantidad = element.cantidad.split('.')[0];
      element.totalProd = element.totalProd.split('.')[0];
    });  
    this.ItemArrayC = response['dataC'];
    this.notaV.cliente = this.ItemArrayC['cliente']; 
    this.notaV.fecha = this.ItemArrayC['fecha'];
    this.notaV.montoTotal = 0;//this.ItemArrayC['total'].split('.')[0];
    this.ItemsArray =  response['dataD'];   
    this.pago.montoAPagar = Number.parseInt(this.ItemArrayC.total);
    this.InicioMaquinas();
  }

  async InicioMaquinas(){    
    var response = await this.PagoService.estadSalud();
    console.log("estado salud:" + JSON.stringify(response));
    if (response['statusMaquina'].floating) {
      if (!this.flagMensajeFloat) {
        this.sweetAlertService.CalcularOperacion("Por favor espere unos segundos");
        this.flagMensajeFloat = true;
      }
    }
    else {
      if (this.flagMensajeFloat) {
        Swal.close();
      }
      this.flagMensajeFloat = false;
      if (this.subConsultaEST) this.subConsultaEST.unsubscribe();
      this.inicioPago();
    }
  }
  async inicioPago() {
    var version = await this.PagoService.InicioVersion();
    this.sweetAlertService.swalLoading("Iniciando");
    var response = await this.PagoService.iniciarPago(this.pago.montoAPagar,this.notaV.cliente);
    Swal.close();
    console.log("estadoInicio: " + JSON.stringify(response));
    if (response['bloqueoEfectivo']) {
      this.PagoService.finalizarPago();
      this.flagMensajeEST = true;
      this.sweetAlertService.CalcularOperacion("Temporalmente fuera de servicio");
      this.pagofallido();
      setTimeout( () => {
      }, 6000 );
    }
    else {
      if (response['status']) {
        if (response['statusMaquina'] == false && response['nivelBloqueo'] == true) {
          this.sweetAlertService.swalErrorM(response['mensajeAmostrar']);
          this.pagofallido();
        }
        else if (response['statusMaquina'] == false && response['nivelBloqueo'] == false) {
          this.ngxToastrService.warn(response['mensajeAmostrar']);
          this.estadoDinero()
          //this.router.navigate(['/efectivo']);
        }
        else {
          this.estadoDinero()
          //this.router.navigate(['/efectivo']);
          this.sweetAlertService.swalSuccess("Ingrese dinero");
        }
      }
      else {
        this.sweetAlertService.swalErrorM("No tenemos vuelto");
        this.pagofallido();
        setTimeout( () => {
        }, 6000 );
        this.router.navigate(['/tipoPago']); 
      }
    }
  }

  async estadoDinero() {
    try {
      var response = await this.PagoService.detallesPago2(this.pago.montoAPagar)
      console.log("estadoDinero: " + JSON.stringify(response));
      //no timer
        if (response['status']) {
          if (response['bloqueoEfectivo'] && this.flagConsultaEST == false) {
            this.flagConsultaEST = true;
            this.pagofallido();
            this.cancelarOp();
            this.router.navigate(['']);
            //this.subEstDinero.unsubscribe();
          }
          if (response['pagoStatus'] == false) {
            if (this.pago.dineroIngresado == response['data']['dineroIngresado']) {
              if (!this.flagOutPago) {
                this.flagOutPago = true;
                this.timerOutPago();
              }
            }
            else {
              this.flagOutPago = false;
              this.subOutPago.unsubscribe();
            }
            this.pago.dineroIngresado = response['data']['dineroIngresado'];
            this.pago.dineroFaltante = response['data']['dineroFaltante'];
            
            if (this.pago.dineroFaltante > 0 && this.flagPagocan == false) {              
              setTimeout(() => { this.estadoDinero();}, 2000);
            }            
            if (this.pago.dineroFaltante == 0 && this.flagModalProcesandodatos == false) {
              this.flagModalProcesandodatos = true;
              this.sweetAlertService.CalcularOperacion("Procesando datos Por favor espere");
            }
            if (this.pago.dineroFaltante < 0) {
              this.sweetAlertService.swalClose();
              this.flagVuelto = true;
              this.flagPago = false;
              this.ngxToastrService.warn("entregando vuelto");
              //this.subEstDinero.unsubscribe();
              this.vuelto.VueltoTotal = this.pago.dineroFaltante * -1;
              this.pago.dineroFaltante = 0;
              this.estadoVuelto();
            }
          }
          else if (!this.flagEstPago) {
            //this.router.navigate(['']);
            this.pagoexitoso();
            this.sweetAlertService.swalSuccess("Pago realizado, imprimiendo ticket")
            this.flagEstPago = true;
            //this.subEstDinero.unsubscribe();
            //float
            this.PagoService.floatByDenomination();
          }
        }
        else if (response['status'] == false && this.flagEstPago == false) {
          this.sweetAlertService.swalWarning("Ha ocurrido un problema, intentelo nuevamente");
          this.pagofallido();
          this.cancelarOp();
        }      
    } catch (error) {
      console.log(error);
    }
  }
  async estadoVuelto() {
    try {
      var response = await this.PagoService.detallesVuelto(this.vuelto.VueltoTotal)
      console.log("estadoVuelto: " + JSON.stringify(response));
      //no timer
        if (response['status']) {
          if (response['bloqueoEfectivo'] && this.flagConsultaEST == false) {
            this.flagConsultaEST = true;
            this.detenerVuelto();
            this.router.navigate(['']);
            this.pagofallido();
            //this.subStdVuelto.unsubscribe();
          }
          if (response['pagoStatus'] == false) {
            if (this.vuelto.DineroFaltante == response['data']['dineroFaltante']) {
              if (!this.flagDetenerVuelto) {
                this.flagDetenerVuelto = true;
                this.timerDetenerVuelto();
              }
            }
            else {
              this.flagOutPago = false;
              this.subOutPago.unsubscribe();
              if (this.subDetenerVuelto) {
                this.subDetenerVuelto.unsubscribe();
              }
            }
            this.vuelto.VueltoFinalizado = response['data']['vueltoFinalizado'];
            this.vuelto.DineroFaltante = response['data']['dineroFaltante'];
            this.vuelto.DineroRegresado = response['data']['dineroRegresado'];
            var vueltoFinilazado = response['data']['vueltoFinalizado'];

            if (this.vuelto.DineroFaltante == 0 && this.flagModalProcesandoVueltos == false) {
              this.flagModalProcesandoVueltos = true;
              this.sweetAlertService.CalcularOperacion("Procesando datos Por favor espere");
            }         
          }
          else if (!this.flagEstVuelto || vueltoFinilazado == true) {
            //this.router.navigate(['']);
            this.pagoexitoso();
            this.sweetAlertService.swalSuccess("Pago realizado, imprimiendo ticket")
            //this.subStdVuelto.unsubscribe();
            this.flagEstVuelto = true;
            //float
            this.PagoService.floatByDenomination();
          }         
        }
        else {
          this.sweetAlertService.swalError();
          this.router.navigate(['/tipoPago']);
          //this.subStdVuelto.unsubscribe();
        }
        if (vueltoFinilazado == false) {
          setTimeout(() => { this.estadoVuelto();}, 2000);
        }       
    } catch (error) {
      console.log(error);
    }
  }
  async cancelarOp() {
    try {
      this.flagPagocan = true;
      //this.subEstDinero.unsubscribe();
      this.pagofallido();
      this.sweetAlertService.swalLoading("Cancelando operacion");
      var response = await this.PagoService.cancelarOp();
      if (response['status']) {
        this.timerCancelacionPago();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async estadoCancelacionPago() {
    try {
      var response = await this.PagoService.estadoCancelacion();
      console.log("estadoCancelacionPago: " + JSON.stringify(response));
      if (response['cancelacionCompleta'] == true && response['entregandoVuelto'] == false) {
        this.router.navigate(['/tipoPago']);
        Swal.close();
        this.subCancelacion.unsubscribe();
      }
      else if (response['cancelacionCompleta'] == false && response['entregandoVuelto'] == true) {
      }
    } catch (error) {
      console.log(error)
    }
  }
  async cancelaTimeOutPago() {
    if (this.subOutPago) this.subOutPago.unsubscribe();
    if (this.subCancelacion) this.subCancelacion.unsubscribe();
    if (this.subAlertCtn) this.subAlertCtn.unsubscribe();
    this.sweetAlertService.swalTimeOutPago();
    this.subAlertCtn = this.sweetAlertService.confirmation.subscribe(data => {
      if (data == "cancelar") {
        this.cancelarOp();
        this.subAlertCtn.unsubscribe();
      }
      else if (data == "continuar") {
        this.flagPagocan = false;
        this.flagOutPago = false;
        this.estadoDinero();
        this.subAlertCtn.unsubscribe();
      }
    });
  }
  async detenerVuelto() {
    var response = await this.PagoService.detenerVuelto();
  }
  timerCancelacionPago() {
    const source = interval(2000);
    this.subCancelacion = source.subscribe(val => this.estadoCancelacionPago());
  }
  timerOutPago() {
    const source = interval(20000);
    this.subOutPago = source.subscribe(val => this.cancelaTimeOutPago());
  }
  timerDetenerVuelto() {
    const source = interval(60000);
    this.subDetenerVuelto = source.subscribe(val => this.detenerVuelto());
  }


  //cambios de estado
  pagofallido(){
    this.PagoInicio = false;
    this.Pagoefallido = true;
    this.PagoeExitoso = false;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;
  }

  pagoexitoso(){
    this.PagoInicio = false;
    this.Pagoefallido = false;
    this.PagoeExitoso = true;
    this.PagoeRetireRecivo = false;
    this.PagoeMuchasGracias = false;

    var codpago = "CONTADO";


    var inyeccion = {
      "montoPago": this.ItemArrayC["total"].tostring(),
      "tipoDoctoPago": this.tipoDoc  == "B"? this.DataCongf.DatosEmpresa.tipoDoctoPagoB:this.DataCongf.DatosEmpresa.tipoDoctoPagoF,
      "montoIngreso": this.ItemArrayC["total"].tostring(),
      "monto": this.ItemArrayC["total"].tostring(),
      "codigoPago": codpago,
      "correlativo":this.ItemArrayC["correlativo"],
      "empresa": this.DataCongf.DatosEmpresa.Empresa,
      "nroDoctoPago":  "0",
      "nrodeCuotas": "0",
      "montoCuotas": "0",
      "tipoPago": "Efectivo",
      "nroNotaVenta": this.notaventa
    }
    this.serviceXmlService.InyectarDocumento(inyeccion);
    setTimeout(() => { this.Retirorecivo();}, 6000);
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

  ngOnDestroy() {
    if (this.subOutPago) this.subOutPago.unsubscribe();
    if (this.subCancelacion) this.subCancelacion.unsubscribe();
    if (this.subAlertCtn) this.subAlertCtn.unsubscribe();
    if (this.subDetenerVuelto) this.subDetenerVuelto.unsubscribe();
  }
}
