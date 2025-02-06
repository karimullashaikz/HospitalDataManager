// Define a module with dependencies using sap.ui.define
sap.ui.define([
    "sap/ui/core/UIComponent" // Import the UIComponent class from SAP UI5 core
], function(UIComponent) {
    "use strict"; // Enforce strict mode to catch common coding mistakes
    
    // Extend UIComponent to create a new component for MYLOGINAPP
    return UIComponent.extend("HospitalManagement.Component", {
        
        // Specify metadata for the component
        metadata: {
            // Link to manifest.json for application configuration
            manifest: "json"
        },
        
        // Initialize the component
        init: function() {
            // Call the init function of the parent (UIComponent) to inherit setup functionality
            UIComponent.prototype.init.apply(this, arguments);
            
            // Initialize the router to handle URL-based navigation within the app
            this.getRouter().initialize();
        }
    });
});
