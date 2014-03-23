(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var addLinkButton = document.getElementById("addLinkButton");
            addLinkButton.addEventListener("click", this.addLinkButtonClickHandler, false);

            var showButton = document.getElementById("show");
            showButton.addEventListener("click", this.showClickHandler, false);

            var dataList =  DataManager.getLinks();

            var simpleListView = document.getElementById('basicListView').winControl;
            var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
            simpleListView.itemTemplate = simpleTemplate;
            simpleListView.itemDataSource = dataList.dataSource;

            var deleteIndex = 0;
            var list = document.getElementById("basicListView").winControl;
            list.addEventListener('selectionchanged', function () {
                deleteIndex = list.selection.getItems;
                DataManager.deleteElement(deleteIndex);
                
                console.log(deleteIndex.length);
            });

           
        },

        addLinkButtonClickHandler: function (eventInfo) {
            //linkArray.push({ name: "facebook", path: "www.facebook.pl" });
            eventInfo.preventDefault();
            var link = eventInfo.target;
            link.href = "/pages/addLink/addLink.html";


            WinJS.Navigation.navigate(link.href);

        },
        showClickHandler: function (eventInfo) {
            //linkArray.push({ name: "facebook", path: "www.facebook.pl" });
           
           
        }
    });
    var deleteItem = function () {

    }
})();
