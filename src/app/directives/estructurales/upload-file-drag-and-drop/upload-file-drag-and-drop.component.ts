import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nexus-upload-file-drag-and-drop',
  templateUrl: './upload-file-drag-and-drop.component.html',
  styleUrls: ['./upload-file-drag-and-drop.component.scss']
})
export class UploadFileDragAndDropComponent implements OnInit, OnDestroy {


  @Input() maxUpload?: number;

  /**
   * typeDocument: image | audio | video
   */
  @Input() typeDocument: string[] = []// ['image'];
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  disabledDragDrop: boolean = false;
  intervalProguess: any;
  img: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.intervalProguess) {
      clearInterval(this.intervalProguess);
    }
  }

  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    if (this.maxUpload && this.files.length < this.maxUpload) {
      this.prepareFilesList($event);
    } else if (!this.maxUpload) {
      this.prepareFilesList($event);
    } else {
      this.disabledDragDrop = false;
    }

    this.onFileChanged($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(target: any) {
    // this.onFileChanged(files)
    let files: any[] = target?.files ? target?.files : []
    if (this.maxUpload && this.files.length < this.maxUpload) {
      this.prepareFilesList(files);
    } else if (!this.maxUpload) {
      this.prepareFilesList(files);
    } else {
      this.disabledDragDrop = false;
    }

    this.onFileChanged(files);
  }

  // onFileChanged(files) {
  //   const reader = new FileReader();
  //     const file = files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = (e: any) => {
  //       console.log(reader.result.toString().split(',')[1])
  //     };
  // }

  validateTypeDocument(files: any): boolean {
    if (this.typeDocument && this.typeDocument.length > 0) {
      if (files.type && files.type.split('/')) {
        let type = files.type.split('/');
        let findTypeDocument = this.typeDocument.find(f => type[0]);
        if(findTypeDocument){
          return true;
        } else {
          return false
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  disabledButton(){
    if(this.maxUpload && this.maxUpload <= this.files.length ){
      this.disabledDragDrop = true;
    } else {
      this.disabledDragDrop = false;
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);    
    this.disabledButton()    
    
    if(this.files.length > 0){
      this.onFileChanged(this.files);
    }
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    this.intervalProguess = setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (this.validateTypeDocument(item)) {
        item.progress = 0;
        if (this.maxUpload && this.files.length < this.maxUpload) {
          this.files.push(item);
        } else if (!this.maxUpload) {
          this.files.push(item);
        }
        this.disabledButton()
        this.uploadFilesSimulator(0);
      }
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onFileChanged(files: any) {
    const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.img = reader.result!.toString().split(',')[1];        
        if(this.img){
          this.onChange.emit(file);
        }
      };
  }
}
