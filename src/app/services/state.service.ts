import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private courseIntakeDateIdSource = new BehaviorSubject<number>(0)
  courseIntakeDateId = this.courseIntakeDateIdSource.asObservable()

  private ernrolmentIdSource = new BehaviorSubject<number>(0)
  ernrolmentId = this.ernrolmentIdSource.asObservable()

  constructor() { }

  changeCourseIntakeDateId(Id: number) {
    this.courseIntakeDateIdSource.next(Id)
    //console.log(Id)
  }

  changeErnrolmentId(Id: number) {
    this.ernrolmentIdSource.next(Id)
    //console.log(Id)

  }
}
