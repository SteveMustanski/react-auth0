import React, { Component } from "react";

class Profile extends Component {
  state = {
    profile: null,
    error: ""
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }
  render() {
    if (!this.state.profile) return null;
    return (
      <>
        <h1>Profile</h1>
        <p>{this.state.profile.nickname}</p>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={this.state.profile.picture}
          alt="profile pic"
        />
        <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
      </>
    );
  }
}

export default Profile;
