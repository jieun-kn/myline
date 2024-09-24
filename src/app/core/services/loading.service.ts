import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading;
  constructor(public loader: LoadingController) { }

  // 기본 로딩
  async load(message?) {
    if (!this.loading) {
      this.loading = await this.loader.create({
        translucent: true,
        backdropDismiss: false,
        message,
        cssClass: 'no-backdrop',
      });
      await this.loading.present();
      this.loading.onDidDismiss().then(() => {
        this.loading = null;
      });
    }
  }

  // 로딩바 없는 로딩
  async emptyLoad() {
    if (!this.loading) {
      this.loading = await this.loader.create({
        translucent: true,
        backdropDismiss: false,
        message: '',
        cssClass: 'empty-load',
      });
      await this.loading.present();
      this.loading.onDidDismiss().then(() => {
        this.loading = null;
      });
    }
  }

  // 로딩 감추기 
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
