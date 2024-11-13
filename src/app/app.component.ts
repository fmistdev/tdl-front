import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  appName = environment.appName;

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.appName); // Définit dynamiquement le titre de la page
  }
}
