import React, { Component } from "react";
import axios from "axios";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
    };
  }
  uploadFileApi = async (e) => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    try {
      let res = await axios.post("http://localhost:4000/uploadfile", data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <br />
        <button type="submit" onClick={this.uploadFileApi}>
          Upload
        </button>
      </div>
    );
  }
}

export default App;
