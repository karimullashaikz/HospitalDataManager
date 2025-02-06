sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("HospitalManagement.controller.Home", {
        onInit: function () {
            // Initialize any required data or models
        },

        press: function () {
            // Navigate to hospital view when tile is clicked
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("hospital");
        },

    
      
        menuPopoverOpen: function (oEvent) {
            // Handle avatar click event for menu popover
        }
    });
});