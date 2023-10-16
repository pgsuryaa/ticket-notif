sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("leo.controller.View1", {
            onInit: function () {

            },

            onAfterRendering: function () {

                setInterval(function () {
                    $.ajax({
                        url: "https://apiproxy.paytm.com/v3/movies/search/movie?meta=1&reqData=1&city=chennai&movieCode=rur_1kciu&version=3&site_id=1&channel=web&child_site_id=1",
                        cache: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        success: function (oData) {
                            console.log(oData)
                            if (!this._iCinemaCount) {
                                this._iCinemaCount = oData.data.cinemasOrder.length
                            }
                            else {
                                if (this._iCinemaCount < oData.data.cinemasOrder.length) {
                                    this._iCinemaCount = oData.data.cinemasOrder.length
                                    this.sendMessage()
                                }
                            }
                        }.bind(this)
                    });
                }.bind(this), 10 * 1000); // 60 * 1000 milsec
            },

            sendMessage: function () {
                $.ajax({
                    type: 'POST',
                    url: "https://api.twilio.com/2010-04-01/Accounts/AC068bd4d8856f944d4a6d3e1694e18d78/Messages.json",
                    async: true,
                    crossDomain: true,
                    dataType: 'jsonp',
                    data: {
                        "To": "+919047957469",
                        "From": "+13869688349",
                        "Body": "New cinemas found in Paytm"
                    }
                }).done(function (results) {
                    console.log(results);
                });
            }

        });
    });
