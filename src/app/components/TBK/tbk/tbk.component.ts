import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from '../../../services/sweet-alert/sweet-alert.service';
import { PagoTBKService } from '../../../services/PagoTBK/pago-tbk.service';
import { ServiceXmlService } from "../../../services/xmlService/service-xml.service";

@Component({
  selector: 'app-tbk',
  templateUrl: './tbk.component.html',
  styleUrls: ['./tbk.component.css']
})
export class TBKComponent implements OnInit {

  Glosa;
  Message;
  constructor(private SweetAlertService:SweetAlertService, private PagoTBKService:PagoTBKService, private ServiceXmlService:ServiceXmlService) { }

  ngOnInit() {
  }

  async CierreTBK(){
    this.SweetAlertService.swalLoading("Cargando Cierre Por Favor espere");
    var respuesta = await this.PagoTBKService.CierreTBK();
    if (respuesta["status"] == true ) {
      var respuesta = await this.ServiceXmlService.ImprimirVoucherTBK(respuesta["data"].glosa);
      this.SweetAlertService.swalSuccess("Cierre TBK Realizado Correctamente");
      this.Glosa = "Imrimiendo reporte de cierre de Terminal";
      this.Message = "Cierre realizado correctamente";
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error aL realizar el cierre");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }


  async InicializacionTBK(){
    this.SweetAlertService.swalLoading("Cargando Inicializacion Por Favor espere");
    var respuesta = await this.PagoTBKService.InicializacionTBK();
    if (respuesta["status"] == true ) {
      this.SweetAlertService.swalSuccess("Inicializacion TBK Realizada Correctamente");
      this.Glosa = respuesta["data"].glosa.split("|")[0].split("~")[0] + " " 
      + respuesta["data"].glosa.split("|")[0].split("~")[1] + "; "
      + respuesta["data"].glosa.split("|")[1].split("~")[0] + " "
      + respuesta["data"].glosa.split("|")[1].split("~")[1];
      this.Message = "Llaves Cargadas satisfactorimente";
      this.Message = "TranskBank Inicializado Correctamente";
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error aL realizar la inicializacion");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }

  async CargarLlavesTBK(){
    this.SweetAlertService.swalLoading("Cargando llaves Por Favor espere");
    var respuesta = await this.PagoTBKService.CargarLlavesTBK();
    if (respuesta["status"] == true ) {
      this.SweetAlertService.swalSuccess("llaves TBK cargadas Correctamente");
      this.Glosa = respuesta["data"].glosa.split("|")[0].split("~")[0] + " " 
      + respuesta["data"].glosa.split("|")[0].split("~")[1] + "; "
      + respuesta["data"].glosa.split("|")[1].split("~")[0] + " "
      + respuesta["data"].glosa.split("|")[1].split("~")[1];
      this.Message = "Llaves Cargadas satisfactorimente";
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error aL realizar la carga de llaves");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }

  async poolingTBK(){
    this.SweetAlertService.swalLoading("Cargando Poling Por Favor espere");
    var respuesta = await this.PagoTBKService.poolingTBK();
    if (respuesta == true || respuesta == "true") {
      this.SweetAlertService.swalSuccess("Pooling TBK Realizado Correctamente");
      this.Glosa = respuesta;
      this.Message = "Pooling Realizado correctamente"
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error aL realizar el Pooling");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }

  async AnularTBK(){
    this.SweetAlertService.swalLoading("Anulando Cierre Por Favor espere");
    var respuesta = await this.PagoTBKService.AnularTBK();
    if (respuesta["status"] == true ) {
      this.SweetAlertService.swalSuccess("nulacion TBK Realizada Correctamente");
      this.Glosa = respuesta["data"].glosa;
      this.Message = respuesta["message"];
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error aL realizar la Anulacion");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }

  async UltimaTBK(){
    this.SweetAlertService.swalLoading("Cargando Ultima transaccion Por Favor espere");
    var respuesta = await this.PagoTBKService.UltimaTBK();
    if (respuesta["status"] == true ) {
      this.SweetAlertService.swalSuccess("Ultima transaccion TBK cargada Correctamente");
      this.Glosa = respuesta["data"].glosa;
      this.Message = respuesta["message"];
    }
    else{
      this.SweetAlertService.swalErrorM("Ha ocurrido un error al cargar Ultima transaccion");
      this.Glosa = "";
      this.Message = respuesta["message"];
    }
  }



}
