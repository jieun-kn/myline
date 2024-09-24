import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DbService } from '../services/db.service';
import { NavController } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const db = inject(DbService);
  const navController = inject(NavController);

  // 1 intro
  // const admin: any = await db.toDoc$(`admin/info`);

  // if (admin.isIntro && !localStorage.getItem('intro')) {
  //   navController.navigateRoot('intro');
  //   return;
  // }

  // 2 login

  // 3 status == '정지'

  if (!localStorage.getItem('uuid')) {
    navController.navigateRoot('login');
    return;
  }

  return true;
};
