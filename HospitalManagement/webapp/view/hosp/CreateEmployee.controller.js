

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/f/LayoutType"
], function (Controller, JSONModel, MessageToast, MessageBox, LayoutType) {
    "use strict";

    return Controller.extend("HospitalManagement.view.hosp.CreateEmployee", {
        onInit: function () {
            // Initialize the create employee model
            var oCreateEmpModel = new JSONModel({
                name: "",
                designation: "",
                status: "1" // Default to Active
            });
            this.getView().setModel(oCreateEmpModel, "createEmpMdl");

            // Initialize the master data model for status
            var oMasterDataModel = new JSONModel({
                status: [
                    { key: "1", text: "Active" },
                    { key: "2", text: "Inactive" }
                ]
            });
            this.getView().setModel(oMasterDataModel, "masterdataMdl");

            // Initialize errors model
            var oErrorsModel = new JSONModel([]);
            this.getView().setModel(oErrorsModel, "errors");

            // Get router instance
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        onNameChange: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oInput = oEvent.getSource();
            
            if (!sValue) {
                oInput.setValueState("Error");
                oInput.setValueStateText("Employee name is required");
            } else {
                oInput.setValueState("None");
            }
        },

        onDesignationChange: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oInput = oEvent.getSource();
            
            if (!sValue) {
                oInput.setValueState("Error");
                oInput.setValueStateText("Designation is required");
            } else {
                oInput.setValueState("None");
            }
        },

        validateForm: function() {
            var oModel = this.getView().getModel("createEmpMdl");
            var oData = oModel.getData();
            var aErrors = [];

            if (!oData.name) {
                aErrors.push("Employee name is required");
            }
            if (!oData.designation) {
                aErrors.push("Designation is required");
            }

            this.getView().getModel("errors").setData(aErrors);
            return aErrors.length === 0;
        },

        onPressSave: function() {
            if (!this.validateForm()) {
                MessageBox.error("Please fill in all required fields");
                return;
            }
       
            var oModel = this.getView().getModel("createEmpMdl");
            var oData = oModel.getData();
       
            var oPayload = {
                name: oData.name,
                designation: oData.designation,
                status: oData.status
            };
       
            var sUrl = "http://localhost:8080/api/employees";
       
            $.ajax({
                url: sUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function(response) {
                    MessageBox.success("Employee created successfully", {
                        onClose: function() {
                            this.onPressCancel();
                        }.bind(this)
                    });
                }.bind(this),
                error: function(xhr, status, error) {
                    MessageBox.error("Error saving employee: " + xhr.responseText);
                }
            });
        },

      onPressCancel: function() {
            // Navigate back to the employee list view
            var oAppViewModel = this.getView().getModel("appView");
            oAppViewModel.setProperty("/layout", "OneColumn");
            
        },

        handleMessagePopoverPress: function(oEvent) {
            var aErrors = this.getView().getModel("errors").getData();
            MessageBox.error(aErrors.join("\n"));
        },

        handleFullScreen: function() {
            this.oRouter.navTo("createEmployee", {
                layout: LayoutType.MidColumnFullScreen
            });
        },
        
        handleExitFullScreen: function() {
            this.oRouter.navTo("hospital", { layout: "OneColumn" });
 
        },
        
        handleClose: function() {
            this.onPressCancel();
        }
    });
});