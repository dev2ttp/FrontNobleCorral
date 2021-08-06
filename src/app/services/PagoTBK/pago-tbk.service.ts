import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoTBKService {

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

    this.apiUrl = this.config.APIurl.APItbk;
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

  async RealizarPAgo(req) {
    try {
      if (req["RutCliente"] == "") {
        req["RutCliente"] = "1";
        req["DvCliente"] = "9";
      }
      var request = {
        "RutCliente": req["RutCliente"],
        "DvCliente": req["DvCliente"],
        "TotalCancelado": req["TotalCancelado"],
        "NroCliente": "0"

      };
      return await this.http.post(`${this.apiUrl}v1/pago/tbk`, request, { headers: this.headers }).toPromise()
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

  async CierreTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/cierre`, { headers: this.headers }
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

  async InicializacionTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/inicializacion`, { headers: this.headers }
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

  async CargarLlavesTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/cargaLLaves`, { headers: this.headers }
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

  async poolingTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/pooling`, { headers: this.headers }
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

  async AnularTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/anular`, { headers: this.headers }
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

  async UltimaTBK() {
    try {
      return await this.http.get(
        `${this.apiUrl}v1/pago/ultima`, { headers: this.headers }
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
