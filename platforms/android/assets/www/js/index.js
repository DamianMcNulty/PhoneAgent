/*
 * app.js: Main entry point into phonegap application
 * All the getters / setters of DOM happens here and sections are clearly mentioned in the comments below.
 * @abbastheedawood +AbbasDawood
 *
 * */

var app = {

    holder: document.querySelector('holder-data'),

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var tabs = document.querySelector('paper-tabs');
        var holder = document.querySelector('holder-data');
        tabs.addEventListener('core-select', function() {
            console.log(tabs.selected);
            holder.show = tabs.selected;

            switch (tabs.selected) {
                case 'device':
                    app.getDeviceName();
                    app.checkConnection();
                    break;

                case 'sensor':
                    window.addEventListener('batterystatus', app.getBatteryInfo, false);
                    var watchID = null;
                    var options = {
                        frequency: 10000
                    };
                    var watchID = navigator.accelerometer.watchAcceleration(app.onAccSuccess, app.onError, options);
            }
        });
    },

    /* Sensor related functions here */

    /*Battery Info*/
    getBatteryInfo: function(info) {
        app.holder.battery = info;
    },

    /*Accelerometer */
    onAccSuccess: function(acceleration) {
        app.holder.accelerometer = acceleration;
    },

    /*Pressure*/


    /*Handle error*/
    onError: function() {
        alert('Error!');
    },

    /*Sensor Ends*/

    /* Device level functions here 
     * Includes:
     * 1. Device Info
     * 2. Geolocation
     * 3. Signal Strength
     * 4. Network Information
     * */

    /*Get device info*/
    getDeviceName: function() {
        app.holder.phone = device;
    },

    /*Check connection info*/
    checkConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI] = 'WiFi';
        states[Connection.CELL_2G] = 'Cellular-2G';
        states[Connection.CELL_3G] = 'Cellular-3G';
        states[Connection.CELL_4G] = 'Cellular-4G';
        states[Connection.CELL] = 'Cellular';
        states[Connection.NONE] = 'Not Connected';

        app.holder.network = states[networkState];
    }

};