sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
    "use strict";
 
    return Controller.extend("HospitalManagement.controller.Login", {
        onInit: function() {
            // Initialize the model for binding
            var oModel = new JSONModel({
                username: "",
                password: ""
            });
            this.getView().setModel(oModel, "loginModel");
           
            // Add console log to verify initialization
            console.log("Login Controller initialized");
        },
 
        // Toggle password visibility
        onShowPassword: function(oEvent) {
            var oSource = oEvent.getSource();
            var oPasswordField = this.getView().byId("passwordInput");
           
            if (oPasswordField.getType() === "Password") {
                oPasswordField.setType("Text");
                oSource.setIcon("sap-icon://hide");
            } else {
                oPasswordField.setType("Password");
                oSource.setIcon("sap-icon://show");
            }
        },

        onLoginPress: function() {
            var username = this.getView().byId("userInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();
            
            // Static credential check
            if (username === "karim" && password === "karim123") {
                var userModel = new JSONModel({
                    username: username,
                    status: "active"
                });
                this.getOwnerComponent().setModel(userModel, "userModel");

                MessageBox.success("Login successful!! - User is active", {
                    onClose: function() {
                        var router = this.getOwnerComponent().getRouter();
                        router.navTo("home");
                    }.bind(this)
                });
            } else {
                MessageBox.error("Invalid username or password", {
                    title: "Login Failed"
                });
            }
        }
    });
});