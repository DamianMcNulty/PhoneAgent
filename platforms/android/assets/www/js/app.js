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
        app.getDeviceName();
        window.addEventListener('watchingnetwork', app.getNetworkInfo, false);
        window.addEventListener('google-map-ready', app.getLocationInfo, false);

        tabs.addEventListener('core-select', function() {
            holder.show = tabs.selected;
            switch (tabs.selected) {
                case 'phone':
                case 'sensor':
                    window.addEventListener('batterystatus', app.getBatteryInfo, false);
                    var watchID = null;
                    var options = {
                        frequency: 10000
                    };
                    var watchID = navigator.accelerometer.watchAcceleration(app.onAccSuccess, app.onError, options);
                    break;
                case 'network':
                    window.addEventListener('watchingnetwork', app.getNetworkInfo, false);
                    app.checkConnection();
                    break;
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
     * 2. Signal Strength
     * 3. Geolocation
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
        states[Connection.UNKNOWN] = 'Unknown ';
        states[Connection.ETHERNET] = 'Ethernet ';
        states[Connection.WIFI] = 'WiFi ';
        states[Connection.CELL_2G] = 'Cellular - 2G ';
        states[Connection.CELL_3G] = 'Cellular - 3G ';
        states[Connection.CELL_4G] = 'Cellular - 4G ';
        states[Connection.CELL] = 'Cellular ';
        states[Connection.NONE] = 'Not Connected ';

        app.holder.network = states[networkState];
    },

    /* Signal Strength & advanced parameters such as imei, operator, cellids, lac & neighboring cell ids*/
    getNetworkInfo: function(info) {
        app.holder.advanced = info;
        app.holder.neighbors = info.neighbors;
    },


    /* Geolocation function */
    getLocationInfo: function() {
        var geoLocationOptions = {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: false
        };
        navigator.geolocation.getCurrentPosition(app.geolocationSuccess, app.geolocationError, geoLocationOptions);
    },

    geolocationSuccess: function(position) {
        app.holder.location = position.coords;
    },

    geolocationError: function(error) {
        alert('Geolocation error reason:' + error.message);
    }

};