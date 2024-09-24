import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import type { TextFieldTypes } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertCtrl: AlertController,
    private toastCrtl: ToastController
  ) {}

  /**
   * 한 개의 버튼이 있는 Alert입니다.
   *
   * 필수 입력: message
   *
   * 선택 입력: header, okText, role
   *
   * 만약 클래스와 헤더가 없고, 버튼 텍스트를 '취소'로 변경하고 싶다면
   *
   * this.alertService.okBtn('메시지 내용', '', '취소');
   *
   * @param message 메시지 내용
   * @param header 헤더 내용
   * @param okText 버튼 텍스트 ( 기본값: '확인' )
   * @param role 'ok'일 경우 버튼을 클릭해야만 true가 리턴되고, 'cancel'일 경우 버튼을 클릭하거나 Backdrop을 클릭하면 true가 리턴됩니다. ( 기본값: 'ok' )
   * @returns true
   */

  async presentAlert(title, message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'present-alert',
      header: title,
      message: message,
      backdropDismiss: false,
      buttons: ['확인'],
    });

    await alert.present();
  }

  async okBtn(
    message: string,
    header?: string,
    okText = '확인',
    role = 'ok'
  ): Promise<any> {
    return new Promise(async (resolve: any) => {
      const alert = await this.alertCtrl.create({
        cssClass: 'ok-alert',
        header,
        message,
        backdropDismiss: false,
        buttons: [
          {
            text: okText,
            role,
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  /**
   * 두 개의 버튼이 있는 Alert입니다. ( 취소, 확인 )
   *
   * 필수 입력: message
   *
   * 선택 입력: header, cancelText, okText
   *
   * 만약 클래스와 헤더가 없고, 확인 버튼의 텍스트를 '로그인'으로 변경하고 싶다면
   *
   * this.alertService.cancelOkBtn('메시지 내용', '', '취소', '로그인');
   *
   * @param message 메시지 내용
   * @param header 헤더 내용
   * @param cancelText 취소 버튼 텍스트 ( 기본값: '취소' )
   * @param okText 확인 버튼 텍스트 ( 기본값: '확인' )
   * @returns 취소 버튼을 클릭하거나 Backdrop을 클릭하면 false가 리턴되고, 확인 버튼을 클릭하면 true가 리턴됩니다.
   */
  async cancelOkBtn(
    message: string,
    header?: string,
    cancelText = '취소',
    okText = '확인'
  ): Promise<any> {
    return new Promise(async (resolve: any) => {
      const alert = await this.alertCtrl.create({
        cssClass: 'cancel-ok-alert',
        header,
        message,
        backdropDismiss: false,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            role: 'ok',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  /**
   * 두 개의 버튼이 있는 Alert입니다. ( 확인, 취소 )
   *
   * 필수 입력: message
   *
   * 선택 입력: header, okText, cancelText
   *
   * 만약 클래스와 헤더가 없고, 취소 버튼의 텍스트를 '아니오'로 변경하고 싶다면
   *
   * this.alertService.okCancelBtn('메시지 내용', '', '확인', '아니오');
   *
   * @param message 메시지 내용
   * @param header 헤더 내용
   * @param okText 확인 버튼 텍스트 ( 기본값: '확인' )
   * @param cancelText 취소 버튼 텍스트 ( 기본값: '취소' )
   * @returns 확인 버튼을 클릭하면 true가 리턴되고, 취소 버튼을 클릭하거나 Backdrop을 클릭하면 false가 리턴됩니다.
   */
  async okCancelBtn(
    message: string,
    header?: string,
    okText = '확인',
    cancelText = '취소'
  ): Promise<any> {
    return new Promise(async (resolve: any) => {
      const alert = await this.alertCtrl.create({
        cssClass: 'ok-cancel-alert',
        header,
        message,
        backdropDismiss: false,
        buttons: [
          {
            text: okText,
            role: 'ok',
            handler: () => {
              resolve(true);
            },
          },
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  /**
   * 두 개의 버튼이 있는 인풋 Alert입니다. ( 확인, 취소 )
   *
   * 필수 입력: inputType, message
   *
   * 선택 입력: placeholder, header, okText
   *
   * 만약 클래스와 헤더가 없고, 텍스트에리어를 사용하고 싶다면
   *
   * this.alertService.inputAlert('textarea', '인풋 도움말', '메시지 내용', '', '확인');
   *
   * @param inputType 인풋 타입
   * @param placeholder 인풋 도움말
   * @param message 메시지 내용
   * @param header 헤더 내용
   * @param okText 확인 버튼 텍스트 ( 기본값: '확인' )
   * @returns 확인 버튼을 클릭하면 true가 리턴되고, 취소 버튼을 클릭하거나 Backdrop을 클릭하면 false가 리턴됩니다.
   */

  async inputAlert(
    inputType: TextFieldTypes | 'checkbox' | 'radio' | 'textarea',
    placeholder = '',
    message: string,
    header?: string,
    okText = '확인'
  ): Promise<any> {
    return new Promise(async (resolve: any) => {
      const alert = await this.alertCtrl.create({
        cssClass: 'input-alert',
        header,
        message,
        backdropDismiss: false,
        inputs: [
          {
            type: inputType as any,
            placeholder: placeholder,
          },
        ],
        buttons: [
          {
            text: '취소',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            role: 'ok',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  /**
   * 토스트 메시지입니다.
   *
   * 필수 입력: message
   *
   * 선택 입력: duration
   *
   * 만약 클래스가 없고, 토스트 메시지의 유지 시간을 1초로 변경하고 싶다면
   *
   * this.alertService.toast('메시지 내용', 1000);
   *
   * @param message 메시지 내용
   * @param duration 토스트 메시지 유지 시간 ( 기본값: 2000 )
   */

  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastCrtl.create({
      cssClass: 'toast',
      message: message,
      duration,
    });

    toast.present();
  }
}
