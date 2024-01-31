import { Component, OnInit } from '@angular/core';
import { Health, HealthData, HealthDataType } from '@awesome-cordova-plugins/health/ngx';

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
      this.requestAuth({
        read: ['steps', 'calories', 'calories.basal', 'calories.active']
      });
    }, (e: any) => {
      console.info("Err:", e)
    });
  }


  private requestAuth(data : HealthDataType) {
    // @ts-ignore
    cordova.plugins.health.requestAuthorization(data, (res) => {
      console.info("Health-Auth:", res)

      // @ts-ignore
      cordova.plugins.health.query({
        startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 3),
        endDate: new Date(),
        dataType: 'calories'
      }, (s:any) => {
        console.info("Success", s)
      }, (s:any) => {
        console.info("Error", s)
      })

    },((err: any) => console.error(err)))
  }

  private query(dStart: Date, dEnd: Date, type: string, limit = 1000): Promise<HealthData[]> {
    return new Promise((resolve, reject) => {
      const successCallback = (data: any) => {
        console.info("Query-data:", dStart, dEnd, type, data);
        resolve(data);
      };
      const errorCallback = (error: any) => {
        console.error("Could not query health data.", dStart, dEnd, type)
        reject(error);
      };

      // @ts-ignore
      cordova.plugins.health.query({
          dataType: type,
          startDate: dStart,
          endDate: dEnd,
          filterOutUserInput: true,
          limit: limit
        }, successCallback, errorCallback)
      })
  }
}
