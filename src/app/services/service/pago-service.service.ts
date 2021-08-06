import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PagoServiceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  status: string;
  config;

  constructor(private http: HttpClient) {
    this.ngOnInit();
  }

  async  ngOnInit() {
    this.config = await this.getJSON();
    console.log(this.config);

    this.apiUrl = this.config.APIurl.APIPago;
  }
  async InicioVersion() {
    try {
      var version = {
        "app":"APP_EFE",
        "version":"1.1.0"
      }; 
      var urlc = this.apiUrl.replace("pago","Version")
        return await this.http.post(`${urlc}/InicioVersion`,version, { headers: this.headers }).toPromise()
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

  async iniciarPago(req,cliente) {
    try {
      var request = {
        "MontoApagar": req,
        "rut":cliente
      };
      console.log(request);
      
      return await this.http.post(`${this.apiUrl}/IniciarPago`, request, { headers: this.headers }).toPromise()

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
  async finalizarPago() {
    try {
      return await this.http.get(
        this.apiUrl + "/finalizarPago", { headers: this.headers }
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
  async cancelarOp() {
    try {
      return await this.http.get(
        this.apiUrl + "/Cancelarpago", { headers: this.headers }
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
  async estadoCancelacion() {
    try {
      return await this.http.get(
        this.apiUrl + "/EstadoCancelacionPago", { headers: this.headers }
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
  async detallesPago2(req) {
    try {
      var request = {
        "MontoApagar": req
      };
      return await this.http.post(`${this.apiUrl}/DineroIngresado`, request, { headers: this.headers }).toPromise()

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
  async detallesVuelto(req) {
    try {
      var request = {
        "VueltoTotal": req
      };
      return await this.http.post(`${this.apiUrl}/VueltoRegresado`, request, { headers: this.headers }).toPromise()
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
  async floatByDenomination() {
    try {
      return await this.http.get(
        this.apiUrl + "/Float", { headers: this.headers }
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
  async estadSalud() {
    try {
      return await this.http.get(
        this.apiUrl + "/EstadoSalud", { headers: this.headers }
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
  async detenerVuelto() {
    try {
      return await this.http.get(
        this.apiUrl + "/DetenerVuelto", { headers: this.headers }
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
}