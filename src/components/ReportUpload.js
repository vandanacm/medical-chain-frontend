import React, { Component } from "react";
import axios from "axios";
import "../styles/upload.css";

export default class ReportUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      age: null,
      sex: null,
      doctorName: null,
      institution: null,
      date: null,
      time: null,
      lowContrast: true, 
      buffer: null,
      patient: this.props.patient,
      account: this.props.account,
      fhash: null,
      selectedImage: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  captureFile = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  captureImage = (e) => {
    e.preventDefault();
    this.setState({
      selectedImage: e.target.files[0],
    });
  };

  handleInputChange = (e) => {
    // e.preventDefault();
    // // if(e.target.name === "lowContrast") {
    // //   // if(e.target.value === "1") {
    // //      this.setState((state) => {
    // //        return {lowContrast: !state.lowContrast};
    // //     });
    //   // } else {
    //   //   this.setState((state) => {
    //   //     return {lowContrast: !state.lowContrast};
    //   //   });
    //   // }
    //   console.log(this.state.lowContrast);
    // } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
      console.log(this.state.lowContrast);
     //}
  };

  onSubmit = (e) => {
    console.log("here");
    var temp = this;
    e.preventDefault();
    var data = new FormData();
    data.append("patient_name", this.state.fname);
    data.append("age", this.state.age);
    data.append("sex", this.state.sex);
    data.append("doctor_name", this.state.doctorName);
    data.append("institution", this.state.institution);
    data.append("date", this.state.date);
    data.append("time", this.state.time);
    // data.append("image", this.state.selectedImage);
    data.append("low_contrast", this.state.lowContrast)
    // for (const file of this.state.selectedImage){
      // data.append("image", this.state.selectedImage);
    // }
    data.append ('file', this.state.selectedImage)
    axios({
      method : "POST",
      url : "http://localhost:5050/reportUpload",
      data : data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    })
      // .post("http://localhost:5050/reportUpload", {
      // //   headers:{
      //     "Content-Type": "multipart/form-data",
      //     "Access-Control-Allow-Origin": "*",
      // //   },
      //   data: JSON.stringify(data)
      // }) 
      .then(function (response) {
       // console.log(response);
        var predicted_label = response.data
        // temp.setState({ fhash: response.data });
        // temp.addFileToPatient();
      });
  };

  addFileToPatient() {
    console.log(this.state);
    this.setState({ loading: true });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    this.state.patient.methods
      .saveFile(this.state.fname, this.state.fhash, today)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4
            htmlFor="file"
            style={{ fontSize: "40px", color: "black", width: "70%" }}
          >
            Upload Chest XRay
          </h4>
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            style={{ width: "70%" }}
          >
            <label htmlFor="fname" style={{ fontSize: "20px" }}>
              Patient Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="inputBox"
              placeholder="Please enter your name"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="age" style={{ fontSize: "20px" }}>
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="inputBox"
              placeholder="Please enter your age"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="sex" style={{ fontSize: "20px" }}>
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              className="inputBox"
              placeholder="M/F"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="doctorName" style={{ fontSize: "20px" }}>
              Doctor Name
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              className="inputBox"
              placeholder="Please enter name of doctor"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="institution" style={{ fontSize: "20px" }}>
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              className="inputBox"
              placeholder="Please enter name of institution"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="date" style={{ fontSize: "20px" }}>
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="inputBox"
              placeholder="Please enter procedure date (dd/mm/yyyy)"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="time" style={{ fontSize: "20px" }}>
              Time
            </label>
            <input
              type="text"
              id="time"
              name="time"
              className="inputBox"
              placeholder="Please enter procedure time in 24-hr format (hh:mm)"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <label htmlFor="lowContrast" style={{ fontSize: "20px", marginBottom: "10px" }}>Low Contrast</label>
            <br></br>
            {/* <label style={{marginLeft: "10px"}}>
              <input type="radio" className="with-gap" id="lowContrastTrue" checked name="lowContrast" value="1" onClick={this.handleInputChange} />
              <label htmlFor="lowContrastTrue" style={{color: "black", fontSize: "17px"}}>Yes</label>
              <br></br>
            </label>
            <label style={{marginLeft: "10px"}}>
              <input type="radio" id="lowContrastFalse" name="lowContrast" value="0" onClick={this.handleInputChange} />
              <label htmlFor="lowContrastFalse" style={{color: "black", fontSize: "17px"}}>No</label>
              <br></br>
            </label> */}

            <label>
              <input type="radio" name="lowContrast" value="true" onChange={this.handleInputChange} checked={this.state.lowContrast=="true"} />
              <span>Yes</span>
            </label>
            <br></br>
            <label>
              <input type="radio" name="lowContrast" value="false" onChange={this.handleInputChange} checked={this.state.lowContrast=="false"} />
              <span>No</span>
            </label>
            <br></br>
            <p>Hi: {this.state.lowContrast.toString()}</p>
            
            {/* <p>
              <label>
                <input name="lowContrast" value="1" type="radio" onChange={this.handleInputChange} checked />
                <span>Yes</span>
              </label>
            </p>
            <p>
              <label>
                <input name="lowContrast" value="0" type="radio" onChange={this.handleInputChange} />
                <span>No</span>
              </label>
            </p> */}
            
            <br></br>
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.captureImage}
              required
            />
            <br></br>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <button className="btn teal darken-3" type="submit" name="action">
                Upload
                <i className="material-icons right">arrow_upward</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
