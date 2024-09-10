import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, FocusEvent, BlurEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import Adapter from './ckeditorAdapter';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-encrypt-image',
  templateUrl: './encrypt-image.component.html',
  styleUrls: ['./encrypt-image.component.sass']
})
export class EncryptImageComponent implements OnInit {
  HFormGroup1: FormGroup
  HFormGroup2: FormGroup
  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('previewCanvas') previewCanvas: ElementRef;
  @ViewChild('messageTextarea') messageTextarea: ElementRef;
  @ViewChild('originalCanvas') originalCanvas: ElementRef;
  @ViewChild('nulledCanvas') nulledCanvas: ElementRef;
  @ViewChild('messageCanvas') messageCanvas: ElementRef;
  public Editor = ClassicEditor;
  userInfo: any;
  imageUrl: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'))
    this.HFormGroup1 = this.fb.group({
      subject: ['', [Validators.required, Validators.maxLength(30)]],
      image_data: ['', [Validators.required, Validators.maxLength(30)]],
      msg: [''],
      user_id: [this.userInfo.user.user_id]
    })
    this.HFormGroup2 = this.fb.group({
      image_id: '',
      message: ''
    })
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      console.log(this.imageUrl)
    };
    reader.readAsDataURL(file);
  }

  customAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  // encryptImage() {
  //   const { subject, image_data, msg, user_id } = this.HFormGroup1.value;
  //   if (image_data && image_data._files && image_data._files.length > 0) {
  //     const file = image_data._files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const img = new Image();
  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         const ctx = canvas.getContext('2d');
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx.drawImage(img, 0, 0);
  //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //         const data = imageData.data;
  //         const binaryMsg = msg.split('').map(char => char.charCodeAt(0).toString(2)).join('');
  //         let msgIndex = 0;
  //         for (let i = 0; i < data.length; i += 4) {
  //           if (msgIndex >= binaryMsg.length) break;
  //           data[i] = (data[i] & 0xFE) | parseInt(binaryMsg[msgIndex], 2); // Red channel
  //           data[i + 1] = (data[i + 1] & 0xFE) | parseInt(binaryMsg[msgIndex + 1], 2); // Green channel
  //           data[i + 2] = (data[i + 2] & 0xFE) | parseInt(binaryMsg[msgIndex + 2], 2); // Blue channel

  //           msgIndex += 3;
  //         }
  //         ctx.putImageData(imageData, 0, 0);
  //         canvas.toBlob(blob => {
  //           const stegoImageURL = blob;
  //           this.addStegoImage(stegoImageURL)
  //         }, 'image/jpeg');
  //       };
  //       img.src = reader.result as string; // Set the image source from the FileReader result
  //     };
  //     reader.readAsDataURL(file); // Read the image file
  //   }
  //   else {
  //     console.error('No file selected');
  //   }
  // }
  encryptImage() {
    const { subject, image_data, msg, user_id } = this.HFormGroup1.value;
    if (image_data && image_data._files && image_data._files.length > 0) {
      const file = image_data._files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          let binaryMsg = msg.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
          binaryMsg += '00000000'; // Add a null character to signify the end of the message

          console.log("Binary Message to encode:", binaryMsg); // Debug

          let msgIndex = 0;
          for (let i = 0; i < data.length && msgIndex < binaryMsg.length; i += 4) {
            if (msgIndex < binaryMsg.length) {
              data[i] = (data[i] & 0xFE) | parseInt(binaryMsg[msgIndex], 2); // Red channel
              msgIndex++;
            }
            if (msgIndex < binaryMsg.length) {
              data[i + 1] = (data[i + 1] & 0xFE) | parseInt(binaryMsg[msgIndex], 2); // Green channel
              msgIndex++;
            }
            if (msgIndex < binaryMsg.length) {
              data[i + 2] = (data[i + 2] & 0xFE) | parseInt(binaryMsg[msgIndex], 2); // Blue channel
              msgIndex++;
            }
          }

          ctx.putImageData(imageData, 0, 0);
          canvas.toBlob(blob => {
            this.addStegoImage(blob);
          }, 'image/jpeg');
        };
        img.src = reader.result as string; // Set the image source from the FileReader result
      };
      reader.readAsDataURL(file); // Read the image file
    } else {
      console.error('No file selected');
    }
  }








  // addStegoImage(image: Blob){
  //   let body = this.HFormGroup1.value
  //   body.image_data = image
  //   delete body.msg;
  //   console.log(body)
  //   this.apiService.postAPI('addstegoimage.php', body).subscribe((data) =>{
  //     console.log(data)
  //   })
  // }
  // addStegoImage(image: File) {
  //   let body = this.HFormGroup1.value;
  //   delete body.msg;
  //   let file: File = this.HFormGroup1.value.image_data
  //   let formData = new FormData();
  //   formData.append('image_data', file);
  //   for (let key in body) {
  //     formData.append(key, body[key]);
  //   }
  //   console.log(formData);
  //   this.apiService.postAPI('addstegoimage.php', formData).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  addStegoImage(imageData: Blob) {
    const file = new File([imageData], 'uploaded_image.png', { type: imageData.type });
    console.log(file)
    const formData = new FormData();
    formData.append('subject', this.HFormGroup1.value.subject);
    formData.append('user_id', this.userInfo.user.user_id);
    formData.append('image', file);
    console.log(formData)
    this.apiService.postAPI(`addstegoimage.php`, formData).subscribe((data) => {
      const path: any = data
      console.log(path.image_id)
      this.HFormGroup2.value.image_id = path.image_id
      this.HFormGroup2.value.message = this.HFormGroup1.value.msg
      this.apiService.postAPI(`addstegos.php`, this.HFormGroup2.value).subscribe((finalData) => {
        console.log(finalData)
        this.router.navigate(['./admin/stego/all-encrypted-image'])
      })
    });

  }
  getImage() {
    let imageName = 'uploaded_image.png'
    this.apiService.getAPIIMG(`getimage.php?imagename=${imageName}`).subscribe((data: any) => {
      const imageUrl = URL.createObjectURL(data);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    })
  }
  previewEncodeImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    const image = new Image();
    const canvas = this.previewCanvas.nativeElement;
    const context = canvas.getContext('2d');

    reader.onloadend = () => {
      image.src = reader.result as string;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  encodeMessage() {
    const text = this.messageTextarea.nativeElement.value;

    const originalContext = this.originalCanvas.nativeElement.getContext('2d');
    const nulledContext = this.nulledCanvas.nativeElement.getContext('2d');
    const messageContext = this.messageCanvas.nativeElement.getContext('2d');

    const width = this.originalCanvas.nativeElement.width;
    const height = this.originalCanvas.nativeElement.height;

    // Check if the image is big enough to hide the message
    if ((text.length * 8) > (width * height * 3)) {
      // You can handle this error condition in your Angular application as per your requirements
      console.error("Text too long for chosen image....");
      return;
    }

    this.nulledCanvas.nativeElement.width = width;
    this.nulledCanvas.nativeElement.height = height;

    this.messageCanvas.nativeElement.width = width;
    this.messageCanvas.nativeElement.height = height;

    // Normalize the original image and draw it
    const original = originalContext.getImageData(0, 0, width, height);
    let pixel = original.data;
    for (let i = 0, n = pixel.length; i < n; i += 4) {
      for (let offset = 0; offset < 3; offset++) {
        if (pixel[i + offset] % 2 !== 0) {
          pixel[i + offset]--;
        }
      }
    }
    nulledContext.putImageData(original, 0, 0);

    // Convert the message to a binary string
    let binaryMessage = "";
    for (let i = 0; i < text.length; i++) {
      let binaryChar = text[i].charCodeAt(0).toString(2);

      // Pad with 0 until the binaryChar has a length of 8 (1 Byte)
      while (binaryChar.length < 8) {
        binaryChar = "0" + binaryChar;
      }

      binaryMessage += binaryChar;
    }
    // You can bind this binaryMessage to a variable in your component and display it in your template if needed

    // Apply the binary string to the image and draw it
    const message = nulledContext.getImageData(0, 0, width, height);
    pixel = message.data;
    let counter = 0;
    for (let i = 0, n = pixel.length; i < n; i += 4) {
      for (let offset = 0; offset < 3; offset++) {
        if (counter < binaryMessage.length) {
          pixel[i + offset] += parseInt(binaryMessage[counter]);
          counter++;
        } else {
          break;
        }
      }
    }
    messageContext.putImageData(message, 0, 0);
    this.downloadEncodedImage()
    // You can handle fadeIn for elements in your Angular template using Angular animations or ngClass/ngStyle
  }
  downloadEncodedImage(): void {
    const link = document.createElement('a');
    link.download = 'encoded_image.png';
    link.href = this.messageCanvas.nativeElement.toDataURL('image/png');
    link.click();
  }

}
