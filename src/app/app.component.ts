import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocadastroComponent } from "./components/autocadastro/autocadastro.component";
import { LoginComponent } from "./components/login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AutocadastroComponent, LoginComponent]
})
export class AppComponent {
  title = 'lol-lavanderia-online';
}
