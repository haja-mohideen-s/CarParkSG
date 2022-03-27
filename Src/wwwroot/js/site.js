"use strict";
var SVY21Convertor = /** @class */ (function () {
    function SVY21Convertor() {
    }
    SVY21Convertor.prototype.ConvertLL2EN = function (latDeg, lngDeg) {
        var x = this.SecondEccentricity();
        var num = this.CnvDegToRad(latDeg);
        var lngRad = this.CnvDegToRad(lngDeg);
        var num2 = this.calc_A(num, lngRad);
        var num3 = this.calc_T(num);
        var num4 = this.calc_C(num);
        var num5 = this.calc_M(num);
        var num6 = this.calc_v(num);
        var num7 = this.calc_M(this.CnvDegToRad(SVY21Convertor.PROJ_NATURALORIGINLATITUDE));
        var num8 = num2 + (1.0 - num3 + num4) * Math.pow(num2, 3.0) / 6.0 + (5.0 - 18.0 * num3 + num3 * num3 + 72.0 * num4 - 58.0 * Math.pow(x, 2.0)) * Math.pow(num2, 5.0) / 120.0;
        num8 = SVY21Convertor.PROJ_FALSEEASTINGS + SVY21Convertor.PROJ_SCALEFACTOR * num6 * num8;
        var num9 = num2 * num2 / 2.0 + (5.0 - num3 + 9.0 * num4 + 4.0 * num4 * num4) * Math.pow(num2, 4.0) / 24.0 + (61.0 - 58.0 * num3 + num3 * num3 + 600.0 * num4 - 330.0 * Math.pow(x, 2.0)) * Math.pow(num2, 6.0) / 720.0;
        num9 = SVY21Convertor.PROJ_FALSENORTHINGS + SVY21Convertor.PROJ_SCALEFACTOR * (num5 - num7 + num6 * Math.tan(num) * num9);
        return new Array(num8, num9);
    };
    SVY21Convertor.prototype.ConvertEN2LL = function (easting, northing) {
        var x = this.SecondEccentricity();
        var e = this.calc_e1();
        var m = this.calc_M1(northing);
        var u = this.calc_u1(m);
        var num = this.calc_lat1(u, e);
        var num2 = this.calc_T1(num);
        var num3 = this.calc_c1(num);
        var num4 = this.calc_v1(num);
        var num5 = this.calc_p1(num);
        var num6 = (easting - SVY21Convertor.PROJ_FALSEEASTINGS) / (num4 * SVY21Convertor.PROJ_SCALEFACTOR);
        var num7 = num6 * num6 / 2.0 - (5.0 + 3.0 * num2 + 10.0 * num3 - 4.0 * num3 * num3 - 9.0 * Math.pow(x, 2.0)) * (Math.pow(num6, 4.0) / 24.0) + (61.0 + 90.0 * num2 + 298.0 * num3 + 45.0 * num2 * num2 - 252.0 * Math.pow(x, 2.0) - 3.0 * num3 * num3) * (Math.pow(num6, 6.0) / 720.0);
        num7 = num - num4 * Math.tan(num) * num7 / num5;
        var num8 = this.CnvRadToDeg(num7);
        var num9 = (num6 - (1.0 + 2.0 * num2 + num3) * Math.pow(num6, 3.0) / 6.0 + (5.0 - 2.0 * num3 + 28.0 * num2 - 3.0 * num3 * num3 + 8.0 * Math.pow(x, 2.0) + 24.0 * num2 * num2) * Math.pow(num6, 5.0) / 120.0) / Math.cos(num);
        num9 = this.CnvDegToRad(SVY21Convertor.PROJ_NATURALORIGINLONGITUDE) + num9;
        var num10 = this.CnvRadToDeg(num9);
        return new Array(num10, num8);
    };
    SVY21Convertor.prototype.SecondEccentricity = function () {
        return Math.sqrt(SVY21Convertor.ELLIPSOID_ECCENTRICITY * SVY21Convertor.ELLIPSOID_ECCENTRICITY / (1.0 - SVY21Convertor.ELLIPSOID_ECCENTRICITY * SVY21Convertor.ELLIPSOID_ECCENTRICITY));
    };
    SVY21Convertor.prototype.CnvRadToDeg = function (rad) {
        return 180.0 * rad / Math.PI;
    };
    SVY21Convertor.prototype.CnvDegToRad = function (deg) {
        return Math.PI * deg / 180.0;
    };
    SVY21Convertor.prototype.calc_A = function (latRad, lngRad) {
        return (lngRad - this.CnvDegToRad(SVY21Convertor.PROJ_NATURALORIGINLONGITUDE)) * Math.cos(latRad);
    };
    SVY21Convertor.prototype.calc_T = function (latRad) {
        return Math.tan(latRad) * Math.tan(latRad);
    };
    SVY21Convertor.prototype.calc_C = function (latRad) {
        var num = Math.cos(latRad) * Math.cos(latRad) * Math.pow(SVY21Convertor.ELLIPSOID_ECCENTRICITY, 2.0);
        return num / (1.0 - Math.pow(SVY21Convertor.ELLIPSOID_ECCENTRICITY, 2.0));
    };
    SVY21Convertor.prototype.calc_v = function (latRad) {
        var d = 1.0 - Math.pow(SVY21Convertor.ELLIPSOID_ECCENTRICITY * Math.sin(latRad), 2.0);
        return SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS / Math.sqrt(d);
    };
    SVY21Convertor.prototype.calc_M = function (latRad) {
        var eLLIPSOID_ECCENTRICITY = SVY21Convertor.ELLIPSOID_ECCENTRICITY;
        var num = 1.0 - Math.pow(eLLIPSOID_ECCENTRICITY, 2.0) / 4.0 - 3.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 4.0) / 64.0 - 5.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 6.0) / 256.0;
        var num2 = 3.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 2.0) / 8.0 + 3.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 4.0) / 32.0 + 45.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 6.0) / 1024.0;
        var num3 = 15.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 4.0) / 256.0 + 45.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 6.0) / 1024.0;
        var num4 = 35.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 6.0) / 3072.0;
        var num5 = num * latRad - num2 * Math.sin(2.0 * latRad) + num3 * Math.sin(4.0 * latRad) - num4 * Math.sin(6.0 * latRad);
        return num5 * SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS;
    };
    SVY21Convertor.prototype.calc_T1 = function (lat1) {
        var num = Math.tan(lat1);
        return num * num;
    };
    SVY21Convertor.prototype.calc_v1 = function (lat1) {
        var num = SVY21Convertor.ELLIPSOID_ECCENTRICITY * Math.sin(lat1);
        num = Math.sqrt(1.0 - num * num);
        return SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS / num;
    };
    SVY21Convertor.prototype.calc_p1 = function (lat1) {
        var eLLIPSOID_ECCENTRICITY = SVY21Convertor.ELLIPSOID_ECCENTRICITY;
        var x = 1.0 - eLLIPSOID_ECCENTRICITY * eLLIPSOID_ECCENTRICITY * Math.pow(Math.sin(lat1), 2.0);
        x = Math.pow(x, 1.5);
        return SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS * (1.0 - eLLIPSOID_ECCENTRICITY * eLLIPSOID_ECCENTRICITY) / x;
    };
    SVY21Convertor.prototype.calc_c1 = function (lat1) {
        var num = this.SecondEccentricity();
        var num2 = num * Math.cos(lat1);
        return num2 * num2;
    };
    SVY21Convertor.prototype.calc_e1 = function () {
        var num = 1.0 - Math.sqrt(1.0 - Math.pow(SVY21Convertor.ELLIPSOID_ECCENTRICITY, 2.0));
        return num / (1.0 + Math.sqrt(1.0 - Math.pow(SVY21Convertor.ELLIPSOID_ECCENTRICITY, 2.0)));
    };
    SVY21Convertor.prototype.calc_M1 = function (north) {
        var num = this.calc_M(this.CnvDegToRad(SVY21Convertor.PROJ_NATURALORIGINLATITUDE));
        return num + (north - SVY21Convertor.PROJ_FALSENORTHINGS) / SVY21Convertor.PROJ_SCALEFACTOR;
    };
    SVY21Convertor.prototype.calc_u1 = function (M1) {
        var eLLIPSOID_ECCENTRICITY = SVY21Convertor.ELLIPSOID_ECCENTRICITY;
        var num = SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS * (1.0 - eLLIPSOID_ECCENTRICITY * eLLIPSOID_ECCENTRICITY / 4.0 - 3.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 4.0) / 64.0 - 5.0 * Math.pow(eLLIPSOID_ECCENTRICITY, 6.0) / 256.0);
        return M1 / num;
    };
    SVY21Convertor.prototype.calc_lat1 = function (u1, e1) {
        var num = u1 + (3.0 * e1 / 2.0 - 27.0 * e1 * e1 / 32.0) * Math.sin(2.0 * u1);
        num += (21.0 * e1 * e1 / 16.0 - 55.0 * Math.pow(e1, 4.0) / 32.0) * Math.sin(4.0 * u1);
        num += 151.0 * Math.pow(e1, 3.0) / 96.0 * Math.sin(6.0 * u1);
        return num + 1097.0 * Math.pow(e1, 4.0) / 512.0 * Math.sin(8.0 * u1);
    };
    SVY21Convertor.ELLIPSOID_SEMIMAJORAXIS = 6378137.0;
    SVY21Convertor.ELLIPSOID_ECCENTRICITY = 0.0818191908426215;
    SVY21Convertor.ELLIPSOID_FLATTENING = 0.00335281066474746;
    SVY21Convertor.PROJ_NATURALORIGINLATITUDE = 1.36666666666667;
    SVY21Convertor.PROJ_NATURALORIGINLONGITUDE = 103.833333333333;
    SVY21Convertor.PROJ_SCALEFACTOR = 1.0;
    SVY21Convertor.PROJ_FALSEEASTINGS = 28001.642;
    SVY21Convertor.PROJ_FALSENORTHINGS = 38744.572;
    return SVY21Convertor;
}());


 //let carParkData = [];
        ////If the page was already loaded then then carparkData is already loaded into local Storage
        //if (window.localStorage) {
        //    // localStorage supported
        //    if (localStorage.getItem('carParkData') != null) {
        //        carParkData = JSON.parse(localStorage.getItem('carParkData'));
        //    }
        //}
        ////load Car Park data for first time only
        //if (carParkData.length == 0) {
        //    $.ajax({
        //        url: 'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=5000',
        //        type: 'post',
        //        success: function (data) {
        //            // alert('Total results found: ' + data.result.total)
        //            console.log(data);
        //            if (data.success) {

        //                carParkData = data.result.records.reduce((accumulator, currentValue, index, array) => {
        //                    accumulator.push({
        //                        //"name": currentValue
        //                        "address": currentValue.address,
        //                        "car_park_basement": currentValue.car_park_basement,
        //                        "car_park_decks": currentValue.car_park_decks,
        //                        "car_park_no": currentValue.car_park_no,
        //                        "car_park_type": currentValue.car_park_type,
        //                        "free_parking": currentValue.free_parking,
        //                        "gantry_height": currentValue.gantry_height,
        //                        "night_parking": currentValue.night_parking,
        //                        "short_term_parking": currentValue.short_term_parking,
        //                        "type_of_parking_system": currentValue.type_of_parking_system,
        //                        "x_coord": currentValue.x_coord,
        //                        "y_coord": currentValue.y_coord,
        //                        "available_lots": 0
        //                    });
        //                    return accumulator;
        //                }, []);
        //                localStorage.setItem('carParkData', JSON.stringify(carParkData));

        //                $('#SGCarParkMap').html();
        //            }
        //        },
        //        error: function (xhr, status, error) {
        //            var errorMessage = xhr.status + ': ' + xhr.statusText;
        //            console.log('Error - ' + errorMessage);
        //        }
        //    });
        //}


 // get the parking info
        //let d = new Date();
        //d.setSeconds(0, 0);

        //let qs = d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + d.getDate() + "T" +
        //    d.getHours() + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":00";

        //$.getJSON('https://api.data.gov.sg/v1/transport/carpark-availability?date_time=' + qs,
        //    function (json) {
        //        for (var i = 0; i < carParkData.length; i++) {
        //            carParkData[i].available_lots = jsonata("items.carpark_data[carpark_number='" + carParkData[i].car_park_no + "'].carpark_info.lots_available").evaluate(json);
        //        }
        //    });


        //get auth token
        //$.ajax({
        //    type: 'post',
        //    url: '',
        //    data: { }
        //});

        //function getLocation() {
        //    if (navigator.geolocation) {
        //        navigator.geolocation.getCurrentPosition(showPosition);
        //    }
        //}

        //function showPosition(position) {
        //    marker = new L.Marker([position.coords.latitude, position.coords.longitude], { bounceOnAdd: false }).addTo(map);
        //    var popup = L.popup()
        //        .setLatLng([position.coords.latitude, position.coords.longitude])
        //        .setContent('You are here!')
        //        .openOn(map);
        //}



        //function addMarker(x, y) {
        //  var point = new L.Point(x, y);
        //  var earthRadius = 6378137;
        //  var latlng = L.Projection.SphericalMercator.unproject(
        //       point.divideBy(earthRadius));

        //  new L.Marker([latlng.lat, latlng.lng], {bounceOnAdd: true}).addTo(map);
        //}

        //function addMarker(x,y){
        //    // Add marker to map at click location; add popup window
        //    var latlng = SVY21Convertor.prototype.ConvertEN2LL(x,y);
        //    L.marker([latlng[1], latlng[0]]).addTo(map);
        //}