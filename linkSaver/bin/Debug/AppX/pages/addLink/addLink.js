// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/addLink/addLink.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var saveLinkButton = document.getElementById("saveLinkButton");
            saveLinkButton.addEventListener("click", this.saveLinkButtonHandler, false);

            var reset = document.getElementById("reset");
            reset.addEventListener("click", this.reset, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
        saveLinkButtonHandler: function (eventInfo) {
            var applicationData = Windows.Storage.ApplicationData.current;
            var roamingSettings = applicationData.roamingSettings;
            var composite = new Windows.Storage.ApplicationDataCompositeValue();
            var numberOfLinks = getNumberOfLinks(roamingSettings);

            composite["name"] = document.getElementById("nameInput").value;
            composite["link"] = document.getElementById("linkInput").value;
            if (roamingSettings.values["numberOfLinks"] === NaN) {
                roamingSettings.values["numberOfLinks"] = 0;
            }

            console.log("1. liczba zapisanych linkow " + numberOfLinks);
            roamingSettings.values[numberOfLinks + 1] = composite;

            console.log(roamingSettings.values[numberOfLinks + 1]["name"]);
            roamingSettings.values["numberOfLinks"]++;
            eventInfo.preventDefault();
            var link = eventInfo.target;
            link.href = "/pages/home/home.html";


            WinJS.Navigation.navigate(link.href);
        },
        reset: function () {
            var applicationData = Windows.Storage.ApplicationData.current;
            var roamingSettings = applicationData.roamingSettings;
            var composite = new Windows.Storage.ApplicationDataCompositeValue();
            roamingSettings.values["numberOfLinks"] = 0;
            roamingSettings.values.remove(1);

            console.log(roamingSettings.values["numberOfLinks"]);
        }
    });

    var getNumberOfLinks = function (roamingSettings) {
        var numberOfLinks;
        try {
            numberOfLinks = roamingSettings.values["numberOfLinks"];
            console.log("ilość linków z add " + numberOfLinks);
        }
        catch (e) {

            console.log("brak wcześniejszych wpisów.");
        };
        return numberOfLinks;
    };
})();

