import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/api/api.service";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  ChangeEvent,
  FocusEvent,
  BlurEvent,
} from "@ckeditor/ckeditor5-angular/ckeditor.component";
import Adapter from "./ckeditorAdapter";
@Component({
  selector: "app-decrypt-image",
  templateUrl: "./decrypt-image.component.html",
  styleUrls: ["./decrypt-image.component.sass"],
})
export class DecryptImageComponent implements OnInit {
  HFormGroup1: FormGroup;
  userInfo: any;
  decryptedMsg: string;
  image_id: any;
  imagePath: any;
  imageUrl: SafeUrl;
  public Editor = ClassicEditor;
  magic: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private actRoute: ActivatedRoute
  ) {
    this.image_id = this.actRoute.snapshot.params.id;
    this.getImageData(this.image_id);
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
    this.HFormGroup1 = this.fb.group({
      subject: ["", [Validators.required, Validators.maxLength(30)]],
      image_data: ["", [Validators.required]], // Remove maxLength validation for image_data
      msg: [""],
      user_id: [this.userInfo.user.user_id],
    });
  }
  getImageData(id) {
    this.apiService
      .getAPI(`getstegoimagesbyimageid.php?image_id=${id}`)
      .subscribe((data) => {
        let path: any = data;
        this.HFormGroup1.patchValue({
          subject: path.subject,
        });
        this.imagePath = path.imagePath.replace("stego_uploads/", "");
        this.getImage(this.imagePath);
      });
    this.apiService.getAPI(`getstegos.php?image_id=${id}`).subscribe((data) => {
      let temp: any = data;
      this.magic = temp.message;
      console.log(this.magic);
      this.HFormGroup1.patchValue({
        msg: this.magic,
      });
    });
  }

  customAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  getImage(filename) {
    let imageName = filename;
    this.apiService
      .getAPIIMG(`getimage.php?imagename=${imageName}`)
      .subscribe((data: any) => {
        const imageUrl = URL.createObjectURL(data);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      });
    this.apiService.getAPIIMG(`getimage.php?imagename=${imageName}`).subscribe(
      (data: Blob) => {
        this.decryptImage(data)
          .then((decryptedMsg) => {
            console.log("Decrypted Message:", decryptedMsg);
            this.decryptedMsg = decryptedMsg;
          })
          .catch((error) => {
            console.error("Error decrypting image:", error);
          });
      },
      (error) => {
        console.error("Error fetching image:", error);
      }
    );
  }
  decryptImage(encryptedImageData: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let binaryMsg = "";
        for (let i = 0; i < data.length; i += 4) {
          binaryMsg += (data[i] & 1).toString(); // Red channel
          binaryMsg += (data[i + 1] & 1).toString(); // Green channel
          binaryMsg += (data[i + 2] & 1).toString(); // Blue channel
        }

        console.log("Extracted Binary Message:", binaryMsg); // Debug

        let decryptedMsg = "";
        for (let i = 0; i < binaryMsg.length; i += 8) {
          const byte = binaryMsg.substr(i, 8);
          if (byte === "00000000") {
            break; // Stop at the termination character
          }
          const charCode = parseInt(byte, 2);
          decryptedMsg += String.fromCharCode(charCode);
        }

        console.log("Decrypted Message:", decryptedMsg); // Debug

        resolve(decryptedMsg);
      };

      img.onerror = () => reject("Error loading image");

      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result as string; // Set the image source from the FileReader result
      };
      reader.onerror = () => reject("Error reading image data");
      reader.readAsDataURL(encryptedImageData); // Read the blob as data URL
    });
  }
}
