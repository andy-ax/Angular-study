export class DataAccess {
  private static data = {};

  get(key) {
    if (DataAccess.data[key]) {
      return (()=>{
        return DataAccess.data[key];
      }).call(this);
    }
  }

  set(key, pro: Function) {
    const promise = pro();
    if (promise instanceof Promise) {
      DataAccess.data[key] = promise;
    }
  }
}
