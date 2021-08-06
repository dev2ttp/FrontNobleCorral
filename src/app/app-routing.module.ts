import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoEfectivoComponent } from './components/pago-efectivo/pago-efectivo.component';
import { IngresoNotaComponent } from './components/ingreso-nota/ingreso-nota.component';
import { DetalleCompraComponent } from "./components/detalle-compra/detalle-compra.component";
import { TipoPagoComponent } from "./components/tipo-pago/tipo-pago.component";
import { TipoDocumentoComponent } from "./components/tipo-documento/tipo-documento.component";
import { PagoDebitoComponent } from "./components/pago-debito/pago-debito.component";
import { PagoCreditoComponent } from "./components/pago-credito/pago-credito.component";
import { TBKComponent } from './components/TBK/tbk/tbk.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ingresonota', component: IngresoNotaComponent },
  { path: 'detalleCompra', component: DetalleCompraComponent },
  { path: 'tipoPago', component: TipoPagoComponent},
  { path: 'inicioPago', component: PagoComponent},
  { path: 'efectivo', component: PagoEfectivoComponent},
  { path: 'tipoDocumento', component: TipoDocumentoComponent},
  { path: 'debito', component: PagoDebitoComponent},
  { path: 'credito', component: PagoCreditoComponent},
  { path: 'ConfigTBK', component: TBKComponent},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
