

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("HospitalManagement.view.hosp.hospital", {
        onInit: function () {
            this._initializeModels();
            this._loadEmployeeData();
        },

        _initializeModels: function () {
            // Filter model
            const oFiltersModel = new JSONModel({
                empId: "",
                empName: "",
                designation: "",
                status: ""
            });

            // Status model
            const oStatusModel = new JSONModel([
                { key: "1", text: "Active" },
                { key: "2", text: "Inactive" }
            ]);

            // Employees model
            const oEmployeesModel = new JSONModel([]);

            this.getView().setModel(oFiltersModel, "filters");
            this.getView().setModel(oStatusModel, "statusModel");
            this.getView().setModel(oEmployeesModel, "employees");

            // App view model for layout management
            const oAppViewModel = new JSONModel({
                layout: "OneColumn"
            });
            this.getView().setModel(oAppViewModel, "appView");
        },

        _loadEmployeeData: function () {
            // Simulate API call - replace with actual backend call
            fetch("http://localhost:8080/api/employees")
                .then(response => response.json())
                .then(data => {
                    this.getView().getModel("employees").setData(data);
                })
                .catch(error => {
                    MessageToast.show("Error loading employee data");
                    console.error(error);
                });
        },

        onSearch: function () {
            const oFilters = this.getView().getModel("filters").getData();
            const aFilters = [];

            if (oFilters.empId) {
                aFilters.push(new Filter("id", FilterOperator.EQ, oFilters.empId));
            }
            if (oFilters.empName) {
                aFilters.push(new Filter("name", FilterOperator.Contains, oFilters.empName));
            }
            if (oFilters.designation) {
                aFilters.push(new Filter("designation", FilterOperator.Contains, oFilters.designation));
            }
            if (oFilters.status) {
                aFilters.push(new Filter("status", FilterOperator.EQ, oFilters.status));
            }

            const oTable = this.byId("employeesTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },

        clearAllFilters: function () {
            this.getView().getModel("filters").setData({
                empId: "",
                empName: "",
                designation: "",
                status: ""
            });
            
            const oTable = this.byId("employeesTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter([]);
        },

        onCreateEmployee: function () {
            const oAppViewModel = this.getView().getModel("appView");
            oAppViewModel.setProperty("/layout", "TwoColumnsMidExpanded");
        },

        onEmployeePress: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const sPath = oItem.getBindingContext("employees").getPath();
            const oEmployee = this.getView().getModel("employees").getProperty(sPath);
            
            this.getOwnerComponent().getRouter().navTo("employeeDetail", {
                employeeId: oEmployee.id
            });
        },

        formatStatus: function (sStatus) {
            return sStatus === "1" ? "Active" : "Inactive";
        },

        formatStatusState: function (sStatus) {
            return sStatus === "1" ? "Success" : "Error";
        },

        onAvatarPress: function (oEvent) {
            MessageToast.show("Avatar pressed");
        },

        onImagePress: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        }
    });
});