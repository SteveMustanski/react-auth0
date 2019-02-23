import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    // the second param to fetch is a configuration object
    fetch("/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was an error.");
      })
      .then(resposne => this.setState({ courses: resposne.courses }))
      .catch(error => this.setState({ message: error.message }));
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.courses.map(course => {
            return <li key={course.id}>{course.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Courses;
