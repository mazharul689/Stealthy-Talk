import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  cliLogo = 'assets/images/banner/DSS.png'

  logoSrc = 'assets/images/banner/diit.png'
  logoSrc1 = 'assets/images/banner/stgimg.png'
  public messageSource = new BehaviorSubject<string>('Stego Image')
  public clientLogo = new BehaviorSubject<any>(this.cliLogo)
  public logoSouce = new BehaviorSubject<any>(this.logoSrc)
  public logoSouce1 = new BehaviorSubject<any>(this.logoSrc1)
  constructor() { }
}
