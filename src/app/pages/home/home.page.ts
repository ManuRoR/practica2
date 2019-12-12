import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { Device } from '@ionic-native/device/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  optionscamera: CameraOptions;
  base64Image: string;
  infoDevice: string;

  dataQR: string;
  dataBarCode: string;

  constructor(
    private camera: Camera,
    public platform: Platform,
    public device: Device,
    public barcodeScanner: BarcodeScanner,
    private nativeStorage: NativeStorage
    ) {
    this.optionscamera = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };
    this.base64Image = '';
  }

  ngOnInit(): void {
      this.infoDevice = this.device.version;
  }

  openCamera() {
    this.platform.ready().then(() => {
      this.camera.getPicture(this.optionscamera).then(ImageData => {
        this.base64Image = 'data:image/jpeg;base64,' + ImageData;
      },
       err => {
         console.log('Could not opeb the camera: ' + err);
       }
      );
    });
   }

   openBarCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
   }

  }
