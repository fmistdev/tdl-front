import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { VersionService } from '../../core/services/version/version.service';
import { env } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  appName = env.appName;

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    this.versionService.getAppVersion().subscribe((version) => {
      this.appName = `${this.appName} v${version}`;
    });
  }
}
