import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // @ts-ignore
    cordova.plugins.health.setPrivacyPolicyURL("https://example.com", () => {
      console.info("success")
      this.launch();
    }, (e: any) => {
      console.info("Err:", e)
      this.launch();
    });
  }

  launch() {
    // @ts-ignore
    cordova.plugins.health.launchPrivacyPolicy(() => {
      console.info("success")
    }, (e: any) => {
      console.info("Err:", e)
    });
  }
}
