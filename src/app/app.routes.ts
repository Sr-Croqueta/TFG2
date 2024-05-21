import { Routes } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';
import { LoginComponent } from './login/login.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { InicioComponent } from './inicio/inicio.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { EnlacesComponent } from './enlaces/enlaces.component';
import { ContactosexternosComponent } from './contactosexternos/contactosexternos.component';
import { ContactosinternosComponent } from './contactosinternos/contactosinternos.component';
import { ModalComponent } from './modal/modal.component';
import { CrearenlaceComponent } from './crearenlace/crearenlace.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearusuarioComponent } from './crearusuario/crearusuario.component';
import{TiendasComponent} from './tiendas/tiendas.component';
import{CanvasComponent} from './canvas/canvas.component';
import { RegistrotiendaComponent } from './registrotienda/registrotienda.component';
import { DisenomaniComponent } from './disenomani/disenomani.component';
import { DisponiblesComponent } from './disponibles/disponibles.component';
export const routes: Routes = [ 
    {path: "",redirectTo:"Tiendas", pathMatch:"full"},
    {path:"Seleccion",component:SelectorComponent},
    {path:"login",component:LoginComponent},
    {path:"resultados",component:ResultadosComponent},
    {path:"inicio", component:InicioComponent},
    {path:"aplicaciones", component:AplicacionesComponent},
    {path:"enlaces", component:EnlacesComponent},
    {path:"contactos-externos", component:ContactosexternosComponent},
    {path:"contactos-internos", component:ContactosinternosComponent},
    {path:"modal", component:ModalComponent},
    {path:"CrearEnlace", component:CrearenlaceComponent},
    {path:"CrearUsuario", component:CrearusuarioComponent},
    {path:"Perfil", component:PerfilComponent},
    {path:"Tiendas", component:TiendasComponent},
    {path:"Canvas", component:CanvasComponent},
    {path:"RegistroTienda", component:RegistrotiendaComponent},
    {path:"DiseñoManicurista", component:DisenomaniComponent},
    {path:"Disponibles", component:DisponiblesComponent},



];

