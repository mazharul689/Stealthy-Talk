import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { StateService } from './state.service'


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  FOLDER = 'wonderrtom/'
  coursId
  enrolId

  constructor(private state: StateService) { }
 
  uploadFile(file): Observable<any>{
    this.state.courseIntakeDateId.subscribe(result => {
      this.coursId = result
    })
    this.state.ernrolmentId.subscribe(result => {
      this.enrolId = result
    })

    return new Observable<number>((subscriber) => {
      const contentType = file.type;
      const bucket = new S3(
        {
          accessKeyId: 'AKIAZ4AE4SJSBV6ZNZOD',
          secretAccessKey: '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',
          region: 'ap-southeast-2'
        }
      );
      const params = {
        Bucket: 'rtomwonderit',
        Key: this.FOLDER + this.coursId + '/' + this.enrolId + '/' + file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        subscriber.next(data);
        return true;  
      });  
      return () => {
        subscriber.complete();
      };
    })
  }
}


