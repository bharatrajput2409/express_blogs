import React, { Component } from "react";
import axios from "axios";
import CircularProgressWithLabel from "./components/ProgressWithLabel";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      uploadProgress: 0,
    };
  }
  uploadFileApi = async (e) => {
    const data = {
      file: this.state.selectedFile,
    };
    try {
      let res = await axios.post("http://localhost:4000/uploadfile", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            uploadProgress: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  onChangeHandler = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.setState({
        selectedFile: reader.result,
        loaded: 0,
      });
    };
  };

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <br />
        <button type="submit" onClick={this.uploadFileApi}>
          Upload
        </button>
        <CircularProgressWithLabel value={this.state.uploadProgress} />
      </div>
    );
  }
}

export default App;
