(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var addLinkButton = document.getElementById("addLinkButton");
            addLinkButton.addEventListener("click", this.addLinkButtonClickHandler, false);
            var dataList =  DataManager.getLinks();

            var simpleListView = document.getElementById('basicListView').winControl;
            var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
            simpleListView.itemTemplate = simpleTemplate;
            simpleListView.itemDataSource = dataList.dataSource;
        },

        addLinkButtonClickHandler: function (eventInfo) {
            //linkArray.push({ name: "facebook", path: "www.facebook.pl" });
            eventInfo.preventDefault();
            var link = eventInfo.target;
            link.href = "/pages/addLink/addLink.html";


            WinJS.Navigation.navigate(link.href);

        }
    });
})();
