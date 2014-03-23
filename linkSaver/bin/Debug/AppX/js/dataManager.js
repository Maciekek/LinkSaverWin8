(function () {
    "use strict";

   
    var dataArray = [];
    var dataList;

    
    
    var getLinks = function (){
        dataList = new WinJS.Binding.List([dataArray]);
        var applicationData = Windows.Storage.ApplicationData.current;
        var roamingSettings = applicationData.roamingSettings;
       
        var numberOfLinks = getNumberOfLinks(roamingSettings);
        for (var i = 1; i <= numberOfLinks; i++) {
            dataList.pop();
        };
        for (var i = 1; i <= numberOfLinks; i++) {
            var name = roamingSettings.values[i]["name"];
            var link = roamingSettings.values[i]["link"];
            console.log("Odebrane na home name " + name + " link " + link);
           
            dataList.push({ name: name, link: link });
        };
        
        return dataList;
    };

    var publicMembers =
        {
            getLinks: getLinks,
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