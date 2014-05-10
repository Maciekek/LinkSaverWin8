(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        
        ready: function (element, options) {
            var applicationData = Windows.Storage.ApplicationData.current;
            var roamingFolder = applicationData.roamingFolder;

            var addLinkButton = document.getElementById("cmdAdd");
            addLinkButton.addEventListener("click", this.addLinkButtonClickHandler, false);

            var addLinkButton = document.getElementById("addLinkButton");
            addLinkButton.addEventListener("click", this.addLinkButtonClickHandler, false);

            
            var deleteButton = document.getElementById("cmdDelete");
            deleteButton.addEventListener("click", this.deleteClickHandler, false);

            appBar = document.getElementById("scenarioAppBar");
            
            var listView = document.getElementById("basicListView");
            listView.addEventListener("selectionchanging", this.showClickHandler, false);

            DataManager.read(roamingFolder);
            //var textInFile = [{ name: "asda", link: "asdasd" }];
            //var dataToSaveTest = [{ name: "test", link: "tetst" }];

            //var jsonFile = JSON.stringify(textInFile);
            //var jsonToSave = JSON.stringify(dataToSaveTest);

            //var ostatnie = /}]/g;

            //var pierwsze = new RegExp("/*\"g");
            //var text1 = jsonFile.replace(ostatnie, "},");
            //var text2 = jsonToSave.replace("[", "");
            //console.log(text1.concat(text2));
            

           
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
            console.log("asdad");
            appBar = document.getElementById("scenarioAppBar");
            var style = document.getElementById("scenarioAppBar").winControl;
            document.getElementById("scenarioAppBar").winControl.show();
            document.getElementById("scenarioAppBar").winControl.sticky = true;
            console.log(style);
        },
        deleteClickHandler: function (eventInfo) {
            console.log("---Delete item---");
            var listView = document.getElementById("basicListView").winControl;
            var test = listView.selection.getItems().done(function(selectedItemsToDelete){
                var applicationData = Windows.Storage.ApplicationData.current;
                var roamingFolder = applicationData.roamingFolder;
                var itemsToDelete = JSON.stringify(selectedItemsToDelete[0].data.name);
                eventInfo.preventDefault();
                var link = eventInfo.target;
                link.href = "/pages/home/home.html";

                console.log(itemsToDelete);
                DataManager.removeSelectedLinks(selectedItemsToDelete, listView.selection.getIndices());
              
                
            });
            
        },
    });
    var appBar;

    var deleteClickHandler = function () {
        console.log("asdasdasdzxcz");
    }
})();
