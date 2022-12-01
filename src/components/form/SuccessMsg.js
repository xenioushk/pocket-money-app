import React, { Component } from "react";

class SuccessMsg extends Component {
  render() {
    return (
      <div className="flex flex-wrap justify-center mt-3">
        <h1 className="text-xl underline underline-offset-4">Great!</h1>
        <div>
          <p>
            Your task is on its way. You will received an email with a link to
            the task. The link can be used to edit or remove the task. A task
            expires in 30 days by default.
          </p>
        </div>
      </div>
    );
  }
}

export default SuccessMsg;
