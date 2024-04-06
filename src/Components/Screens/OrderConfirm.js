import React from "react";
import { LoginContext } from "../../context/contex";
import { firest,auth } from "../../redux/actions/fr";
import { Link } from "react-router-dom";
import { Component } from "react";


class Confirmation extends Component {
    renderOrderSummary() {
     
  
      return (
        <div className="confirmation">
            <div className="confirmation__wrapper">
            <div className="confirmation__wrapper-message">
                <h4>Thank you for your purchase, {auth.currentUser.displayName}!</h4>
                <p className="confirmation__wrapper-reference">
                  
                </p>
            </div>
            <Link
                className="confirmation__wrapper-back"
                type="button"
                to="/"
                
            >
                
                <span>Back to home</span>
            </Link>
            </div>
        </div>
      );
    }
  
    render() {
      return (
        <>
          { this.renderOrderSummary() }
        </>
      );
    };
  }
  
  export default Confirmation;