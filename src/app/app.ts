import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mrg-flight');
}
