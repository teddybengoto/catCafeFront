import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direction } from 'src/app/model/esp';
import { ChatService } from 'src/app/sevice.api/chat.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {


  espaces = Object.keys(Direction);
  //keys = Object.keys;
  updateimage!: FormGroup;
  showUpdateForm = true;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) {



    this.updateimage = this.formBuilder.group({
      image: this.formBuilder.control('', Validators.required),
    });



  }
  file: File = null; // Variable to store file

  fileChange(event: any) {
    // Instantiate an object to read the file content
    console.log(event);


    //let reader = new FileReader();
    // when the load event is fired and the file not empty
    //if(event.target.files && event.target.files.length > 0) {
    // Fill file variable with the file content

    this.file = event.target.files[0];
    //}
  }/*
  updateImage() {
    //this.file = this.updateimage.value;
    //this.file.

    // Instantiate a FormData to store form fields and encode the file
    const data = new FormData();
    // Add file content to prepare the request
    console.log("file ", this.file);



    data.append("image", this.file, this.file.name);

    //console.log("this.file.name; ", this.file.name);

    // Launch post request
    console.log("bodydd: ", data);
    console.log(JSON.stringify(data));




    //console.log("this.updateimage.value: ",);
    //console.log("file: ",event.target.files[0]);

    this.chatService.updateImage(1, data);



  }
*/
  /************New**********/
  loading: boolean = false; // Flag variable
// Variable to store shortLink from api response
shortLink: string = "";
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.chatService.upload(1,this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }
}
