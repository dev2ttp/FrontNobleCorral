import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotaVenta } from "../../models/notaVenta/notaVenta";
import { ServiceXmlService } from "../../services/xmlService/service-xml.service";
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert/sweet-alert.service';
declare var $;

@Component({
  selector: 'app-ingreso-nota',
  templateUrl: './ingreso-nota.component.html',
  styleUrls: ['./ingreso-nota.component.css']
})
export class IngresoNotaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  notaVenta:string = '';
  numberbutton = [];

  CodigoBarra="";
  DataCongf;


  notaV: NotaVenta = {
    notaVenta: '',
    cliente: '',
    fecha:'',
    montoTotal: 0
  };

  constructor(private formBuilder: FormBuilder, private serviceXmlService: ServiceXmlService, private router: Router, private sweetAlertService: SweetAlertService,) { }

  ngOnInit() {
    this.numberbutton = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "", "¬"];
    this.notaVenta = "";
    this.registerForm = this.formBuilder.group({
      notaVenta: ['', [Validators.required]],
    });
    document.getElementById("#CodigoBarra").focus();
    window.dispatchEvent(new Event('resize'));
    $(document).ready(function () {
      $(document).scannerDetection({
        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        avgTimeByChar: 100, // it's not a barcode if a character takes longer than 100ms
        onComplete: function (barcode, qty) {
          $('#CodigoBarra').text(barcode);
          this.CodigoBarra = barcode;
          console.log(this.CodigoBarra);
        } // main callback function	
      });
    });
    this.Configuracion();
  }

  async Configuracion() {
    var response = await this.serviceXmlService.getJSON();  
    console.log(response);
    this.DataCongf = response;
  }
  
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.getNotaVenta();
  }

  async getNotaVenta(){
    console.log(this.notaVenta);
    this.sweetAlertService.CalcularOperacion("Por favor espere unos segundos");
    var response = await this.serviceXmlService.getNotaVenta(this.notaVenta);
    console.log(response);
    
    if(response['status']){
      this.sweetAlertService.swalClose();
      localStorage.setItem("detalle", JSON.stringify(response));
      localStorage.setItem("Notaventa", JSON.stringify(this.notaVenta));
      
      this.router.navigate(['/detalleCompra']);
    }
    else{
      this.sweetAlertService.swalErrorM(response['message']);
    }
  }

  setnota(numero){
    if (this.notaVenta.includes(",")) {
      if (this.numberbutton[numero] != ",") {
        this.notaVenta += this.numberbutton[numero];
      }
    }else{
      this.notaVenta += this.numberbutton[numero];
    }
    
  }

  borar(){
    if (this.notaVenta != "") {
      this.notaVenta = this.notaVenta.substring(0, this.notaVenta.length - 1)
    }
  }
}
