import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { id: string; name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  export class AppComponent {
    private itemsCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;
    constructor(private readonly afs: AngularFirestore) {
      this.itemsCollection = afs.collection<Item>('heroes');
      this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }
  addItem(name: string) {
    // Persist a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item);
}
  }