import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeStorageService } from '../../services/native-storage.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  inputNombre: string;
  inputEdad: number;
  dataStorage: Usuario[];
  selectGroup: any;


  // tslint:disable-next-line:variable-name
  constructor(private _nativeStorage: NativeStorageService) {

  }

  ngOnInit() {

  }

  addNombre() {
    this._nativeStorage.addNombreByGroup(this.selectGroup, {nombre: this.inputNombre, edad: this.inputEdad});
    this.dataStorage = this._nativeStorage.getAllByGroup(this.selectGroup);
  }

  updateList() {
    this.dataStorage = this._nativeStorage.getAllByGroup(this.selectGroup);
  }
}
