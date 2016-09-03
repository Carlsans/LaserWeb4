;(function(lw) {

    /**
    * LaserWeb com module.
    *
    * Description...
    */
    lw.add_module('layout.panes.com', {

        // Autoload the module ?
        autoload: true,

        // Module version
        version: '0.0.1',

        // Module title
        title: 'Communication',

        // Module icon
        icon: 'plug',

        // Extends
        extends: ['layout.pane'],

        // Has template (null, false, true or template path)
        has_template: true,

        // Module initialization
        // Called once when all modules are setup.
        init: function() {
            // Add the dock
            this.add_dock();

            // Add the pane
            this.add_pane();

            // Set dock active
            this.set_dock_active(true);

            // Get module pane template
            var pane_template = lw.get_template('layout-com-pane');

            // Add pane template to pane container
            this.$.pane.append(pane_template());

            // Bind the model
            this.bind_model();

            // Notify module init is done.
            this.pub('module.init.done');
        },

        // Bind model
        bind_model: function() {
            // Init pane model data
            this.selected_interface   = ko.observable(lw.libs.com.interfaces[0]);
            this.available_interfaces = ko.observableArray(lw.libs.com.interfaces);

            this.selected_serial_baud_rate   = ko.observable(lw.libs.com.serial.baud_rate);
            this.available_serial_baud_rates = ko.observableArray(lw.libs.com.serial.baud_rates);

            this.serial_interface_available = ko.observable(false);
            this.selected_serial_port       = ko.observable();
            this.available_serial_ports     = ko.observableArray();

            // Get server footprint
            var self = this;

            lw.libs.com.http.get_server_footprint(function(footprint, headers) {
                // LaserWeb server found
                if (footprint.indexOf('LaserWebServer') === 0) {
                    // Set serial interface available
                    self.serial_interface_available(true);
                }
            });

            // Bind pane model to the panel (DOM)
            ko.applyBindings(this, this.$.pane[0]);
        },

        // Called when a new interface is selected
        select_interface: function(obj, evt) {
            // Debug message...
            this.console('debug', 'interface.selected', obj.selected_interface());
            // Publish a message to notify all modules
            this.pub('layout.com.interface.selected', obj.selected_interface());
        },

        // Called when an new serial baud rate is selected
        select_serial_baud_rate: function(obj, evt) {
            // Debug message...
            this.console('debug', 'serial.baud_rate.selected', obj.selected_serial_baud_rate());
            // Publish a message to notify all modules
            this.pub('layout.com.serial.baud_rate.selected', obj.selected_serial_baud_rate());
        },

        // Called when an new serial port is selected
        select_serial_port: function(obj, evt) {
            // Debug message...
            this.console('debug', 'serial.port.selected', obj.selected_serial_port());
            // Publish a message to notify all modules
            this.pub('layout.com.serial.port.selected', obj.selected_serial_port());
        },

        // Called when refresh serial port list is clicked
        refresh_serial_ports_list: function(obj, evt) {
            // Debug message...
            this.console('debug', 'serial.refresh.ports_list');
            // Publish a message to notify all modules
            this.pub('layout.com.serial.refresh.ports_list');
        }

    });

})(laserweb);