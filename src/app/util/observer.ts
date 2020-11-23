import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';

@Injectable()
export class Observer {
  private static observerList = {};
  private static onceList = {};

  private removeById(index, name, type) {
    const observer = Observer[type+'List'][name];
    return observer.slice(0, index).concat(observer.slice(index+1))
  }

  listen(name: string, event: Function) {
    (<any>event).UUID = UUID.UUID();
    let list = Observer.observerList[name];
    if (list) {
      Observer.observerList[name].push(event);
    } else {
      Observer.observerList[name] = [event];
    }
  }

  once(name: string, event: Function) {
    (<any>event).UUID = UUID.UUID();
    let list = Observer.onceList[name];
    if (list) {
      Observer.onceList[name].push(event);
    } else {
      Observer.onceList[name] = [event];
    }
  }

  unbind(name: string, event: Function){
    const observer = Observer.observerList[name];
    const once = Observer.onceList[name];
    observer.find((item, i) => {
      if (item.UUID === event['UUID']) {
        Observer.observerList[name] = this.removeById(i, name, 'observer');
        return true;
      }
    });
    once.find((item, i) => {
      if (item.UUID === event['UUID']) {
        Observer.onceList[name] = this.removeById(i, name, 'once');
        return true;
      }
    });
  }

  emit(name: string, ...value: any[]) {
    const observer = Observer.observerList[name];
    const once = Observer.onceList[name];
    if (observer.length > 0) {
      observer.forEach(item => {
        item(...value);
      })
    }
    if (once.length > 0) {
      once.forEach(item => {
        item(...value);
      });
      Observer.onceList[name] = [];
    }
  }
}
