(function () {
    "use strict";

   
    var dataArray = [];
    var dataList = new WinJS.Binding.List([]);
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingSettings = applicationData.roamingSettings;
    
    
    var getLinks = function (){
        dataList = new WinJS.Binding.List([]);
        
       
        var numberOfLinks = getNumberOfLinks(roamingSettings);
        
        for (var i = 1; i <= numberOfLinks; i++) {
            try{
                var name = roamingSettings.values[i]["name"];
                var link = roamingSettings.values[i]["link"];
                console.log("Odebrane na home name " + name + " link " + link);
           
                dataList.push({ name: name, link: link });
            } catch (e) {
                console.log("blad przejscai")
            }
        };
        
        return dataList;
    };

    var deleteElement = function (index) {
        console.log(index);
        //var name = roamingSettings.values[index]["name"];
        //var link = roamingSettings.values[index]["link"];
        //console.log("Odebrane na home name " + name + " link " + link);

       
        console.log(roamingSettings.values.size);
        //sortItems();
    };

    var sortItems = function () {
        var licznik;
        var numberOfLinks = getNumberOfLinks(roamingSettings);

        for (var i = 1; i <= numberOfLinks; i++) {
            try {
                var name = roamingSettings.values[i]["name"];
                var link = roamingSettings.values[i]["link"];
                console.log("Odebrane na home name " + name + " link " + link);

                dataList.push({ name: name, link: link });
            } catch (e) {
                licznik++;
                roamingSettings.values[i + 1]["name"] = roamingSettings.values[i]["name"];
                roamingSettings.values[i + 1]["link"] = roamingSettings.values[i]["link"];
                roamingSettings.values.remove(i);
            }
        };
        roamingSettings.values["numberOfLinks"] -= licznik;
    };

    var publicMembers =
        {
            getLinks: getLinks,
            deleteElement: deleteElement,
            itemList: dataList
        };
    WinJS.Namespace.define("DataManager", publicMembers);

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