import {Injectable} from "@angular/core";

export const BOOKSMARKS_KEY = "bookmarks";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {



  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) : any {
    let data = localStorage.getItem(key)

    if (data != null) {
      return JSON.parse(data);
    }

    return null;
  }

  public removeItem(key:string) {
    localStorage.removeItem(key);
  }

  public clear(){
    localStorage.clear();
  }
}
