import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { Model } from '../models/models';
import { ICrud } from './icrud.interface';

export abstract class ServiceFirebase<T extends Model> implements ICrud<T> {
  ref: AngularFirestoreCollection<T>;

  constructor(
    protected type: new () => T,
    protected firestore: AngularFirestore,
    public path: string
  ) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    const doc = this.ref.doc<T>(id);
    return doc.get().pipe(map((snapshot) => this.docToClass(snapshot)));
  }

  docToClass(snapshotDoc): T {
    const obj = {
      id: snapshotDoc.id,
      ...(snapshotDoc.data() as T),
    };
    const typed = plainToClass(this.type, obj);
    return typed;
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  createOrUpdate(item: T, id?: string): Promise<T | void> {
    if (id === null) {
      return this.ref
        .doc(id)
        .set(item)
        .then((response) => {
          console.log(response);
        });
    }

    return this.ref.add(item).then((response) => {
      item.id = response.id;
      this.ref.doc(response.id).set(item);
    });
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
 }

}
