sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("HospitalManagement.view.hosp.employeeDetail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("employeeDetail").attachPatternMatched(this._onRouteMatched, this);
            
            // Initialize master data model
            var oMasterDataModel = new JSONModel({
                status: [
                    { key: "1", text: "Active" },
                    { key: "2", text: "Inactive" }
                ]
            });
            this.getView().setModel(oMasterDataModel, "masterdataMdl");

            // Initialize errors model
            this.getView().setModel(new JSONModel([]), "errors");
        },

        _onRouteMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            this.loadEmployeeDetails(sEmployeeId);
        },

        loadEmployeeDetails: function (sEmployeeId) {
            // Replace with your actual API endpoint
            fetch(`http://localhost:8080/api/employees/${sEmployeeId}`)
                .then(response => response.json())
                .then(data => {
                    // Store original data for cancel functionality
                    this._originalData = Object.assign({}, data);
                    this.getView().setModel(new JSONModel(data), "detailsEmpMdl");
                })
                .catch(error => {
                    MessageBox.error("Error loading employee details");
                    console.error(error);
                });
        },

        validateForm: function() {
            var oModel = this.getView().getModel("detailsEmpMdl");
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

        // onSave: function () {
        //   if (!this.validateForm()) {
        //         MessageBox.error("Please fill in all required fields");
        //         return;
        //     }

        //     var oModel = this.getView().getModel("detailsEmpMdl");
        //     var oData = oModel.getData();

        //     // Replace with your actual API endpoint
        //     fetch(`http://localhost:8080/api/employees/${oData.id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }, 
        //         body: JSON.stringify(oData)
        //     })
        //     .then(response => response.json())
        //     .then(() => {
        //         MessageToast.show("Employee updated successfully");
        //         this.onCancel(); // Navigate back after successful save
        //     })
        //     .catch(error => {
        //         MessageBox.error("Error updating employee");
        //         console.error(error);
        //     });
        // },  

        // onSave: function () {
        //     var oModel = this.getView().getModel("detailsEmpMdl");
        //     var oData = oModel.getData();
        
        //     // Ensure the employee ID is included in the URL
        //     var sUrl = `http://localhost:8080/api/employees/${oData.id}`; // Adjust this URL based on your backend path
        
        //     fetch(sUrl, {
        //         method: "PUT", // Use PUT for updating existing resources
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(oData)
        //     })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
        //         return response.json(); // Parse the response as JSON
        //     })
        //     .then(data => {
        //         MessageBox.success("Employee updated successfully", {
        //             onClose: function () {
        //                 this.oRouter.navTo("hospital", { layout: "OneColumn" });
        //             }.bind(this)
        //         });
        //     })
        //     .catch(error => {
        //         MessageBox.error("Error updating employee: " + error.message);
        //     });
        // },
        // onSave: function () {
        //     var oModel = this.getView().getModel("detailsEmpMdl");
        //     var oData = oModel.getData();
        //     var sUrl = `http://localhost:8080/api/employees/${oData.id}`;
        
        //     // Validate form before saving
        //     if (!this.validateForm()) {
        //         MessageBox.error("Please fill in all required fields");
        //         return;
        //     }
        
        //     // Send PUT request to update employee
        //     fetch(sUrl, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(oData)
        //     })
        //     .then(response => {
        //         if (!response.ok) {
        //             // If the response is not OK, throw an error with the status text
        //             throw new Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         // Show success message and navigate back to the hospital view
        //         MessageBox.success("Employee updated successfully", {
        //             onClose: function () {
        //                 this.oRouter.navTo("hospital", { layout: "OneColumn" });
        //             }.bind(this)
        //         });
        //     })
        //     .catch(error => {
        //         // Show error message if something went wrong
        //         MessageBox.error("Error updating employee: " + error.message);
        //     });
        // },
        
        onSave: function () {
            var oModel = this.getView().getModel("detailsEmpMdl");
            var oData = oModel.getData();
            var sUrl = `http://localhost:8080/api/employees/${oData.id}`;
            
            // Validate form before saving
            if (!this.validateForm()) {
                MessageBox.error("Please fill in all required fields");
                return;
            }
            
            // Use fetch with promises
            fetch(sUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(oData)
            })
            .then(response => {
                const contentType = response.headers.get("Content-Type");
                
                if (!response.ok) {
                    // If the response is not OK, reject the promise with status text
                    return Promise.reject(new Error(response.statusText));
                }
        
                // Check if the response is JSON
                if (contentType && contentType.includes("application/json")) {
                    return response.json(); // Parse JSON response
                } else {
                    // If the response is plain text
                    return response.text();
                }
            })
            .then(data => {
                // Show success message with either JSON or plain text response
                MessageBox.success(
                    data || "Employee updated successfully", // Use data if available
                    {
                        onClose: function () {
                            this.oRouter.navTo("hospital", { layout: "OneColumn" });
                        }.bind(this)
                    }
                );
            })
            .catch(error => {
                // Show error message if something went wrong
                MessageBox.error("Error updating employee: " + error.message);
            });
        },
        

        onCancel: function() {
            // Show confirmation dialog before canceling
            MessageBox.confirm("Are you sure you want to cancel? All changes will be lost.", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.NO,
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.YES) {
                        this.oRouter.navTo("hospital", {}, true);
                    }
                }.bind(this)
            });
        },

        handleFullScreen: function () {
            var oLayout = this.getView().byId("oplConfigDetail");
            oLayout.setHeaderExpanded(!oLayout.getHeaderExpanded());
        },

        handleExitFullScreen: function () {
            var oLayout = this.getView().byId("oplConfigDetail");
            oLayout.setHeaderExpanded(true);
        },

        handleClose: function () {
            this.onCancel();
        }
    });
});