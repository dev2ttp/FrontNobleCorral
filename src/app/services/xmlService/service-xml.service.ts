import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceXmlService {

  apiUrl: string;
  //headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  status: string;
  config;

  constructor(private http: HttpClient) {
    this.ngOnInit();
  }


  async  ngOnInit() {
    this.config = await this.getJSON();
    console.log(this.config);

    this.apiUrl = this.config.APIurl.APINobleCorral;
  }
  
  async  getJSON() {
    try {
      return await this.http.get("./assets/cnfg.json", { headers: this.headers }
      ).toPromise();
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }
  }

  async getNotaVenta(req) {
    try {
      var request = {
        "numeroDocumento": ""+req
      };
      return await this.http.post(`${this.apiUrl}NotaVenta/ConsultaNota`, request, { headers: this.headers }).toPromise()
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }   
  }

  async InyectarDocumento(req) {
    try {

      return await this.http.post(`${this.apiUrl}NotaVenta/INyeccionFactura`, req, { headers: this.headers }).toPromise()
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }   
  }

  async ImprimirNota(req) {
    try {
      var request = {
        "dataC": req["dataC"],
        "dataD": req["dataD"]

      };
      return await this.http.post(`${this.apiUrl}Impresion/ImprimirNota`, request, { headers: this.headers }).toPromise()
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }   
  }

  async ImprimirVoucherTBK(req) {
    try {
      var request = {
        "document": req
      };
      return await this.http.post(`${this.apiUrl}Impresion/ImprimirVoucherTBK`, request, { headers: this.headers }).toPromise()
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }
  }
}
