import { Component, OnInit } from '@angular/core';
import { NgxToastrService } from '../../services/ngx-toastr/ngx-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  disabled = false;

  botonuno: boolean;
  botondos: boolean;
  botontres: boolean;

  constructor(
    private ngxToastrService: NgxToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem("detalle", "");
    localStorage.setItem("TipoDocumento", "");
  }

  async getAuthorization(event: any) {
    event.preventDefault();
    this.disabled = true;
    try {
      // Lógica
    } catch (error) {
      this.disabled = false;
      this.ngxToastrService.error('Error de acceso al login de clave única');
    }
  }

  menuespecial(numboton) {
    console.log(numboton);
    
    if (numboton == 1) {
      this.botonuno = true;
      this.botondos = this.botontres = false;
    }
    if (numboton == 2 && this.botonuno == true) {
      this.botondos = true;
      this.botontres = false;
    }
    if (numboton == 2 && this.botonuno == false) {
      this.botonuno = this.botondos = this.botontres = false;
    }

    if (numboton == 3 && this.botonuno == true && this.botondos == true) {
      this.botontres = true;
    }
    if (numboton == 2 && this.botonuno == false || numboton == 2 && this.botondos == false) {
      this.botonuno = this.botondos = this.botontres = false;
    }

    if (this.botonuno == true && this.botondos == true && this.botontres == true) {
      this.router.navigate(['/ConfigTBK']);
    }

  }
}
