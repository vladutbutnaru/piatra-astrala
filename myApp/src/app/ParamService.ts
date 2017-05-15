import {Injectable} from '@angular/core';

 @Injectable()
 export class ParamService {

  public paramsData: any;

  constructor(){
    this.paramsData = {};
  }
}