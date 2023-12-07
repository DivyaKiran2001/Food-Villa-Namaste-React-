import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const { name, location } = this.props;
    return (
      <div className="user-card">
        <h2>Name: {this.props.name}</h2>
        <h3>Location : {this.props.location}</h3>
      </div>
    );
  }
}

export default UserClass;
