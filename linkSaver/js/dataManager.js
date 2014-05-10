(function () {
    "use strict";
    var textInFile;
    var dataList;
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingFolder = applicationData.roamingFolder;

    var write = function (roamingFolder, nameRetrieved, linkRetrieved) {
        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    textInFile = textInFile.replace(/"/g, "");
                    
                    var fileContent = textInFile;
                    var stringToSave = textInFile + '### ' + nameRetrieved + ' %%% ' + linkRetrieved + ' &&&';
                 
                    return Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(stringToSave));
                }).done(function () {
                    console.log("zapis udany");
                });
    };

    var read = function (roamingFolder) {
        console.log("JESTEM READ");
        roamingFolder.getFileAsync("dataFile.txt")
        .then(function (sampleFile) {
            return Windows.Storage.FileIO.readTextAsync(sampleFile);
        }).done(function (content) {
          

            textInFile = content;
            content =  content.replace(/"/g, "");
            content = "[{".concat(content.replace(/&&&###/g, "'}, {name :'"));
            content = content.replace(/###/g, "name: '");
            content = content.replace(/%%%/g, "', link: '");
            content = content.replace(/&&&/g, "'}]");
            content = content.replace("\"", "");
            var simpleListView = document.getElementById('basicListView').winControl;
            var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
            try {
                var linkList = JSON.parse(JSON.stringify(eval('' + content + '')));
                console.log(content);
                dataList = new WinJS.Binding.List(linkList);
                

                simpleListView.itemTemplate = simpleTemplate;
                simpleListView.itemDataSource = dataList.dataSource;
            }
            catch (e) {
                console.log("Nic do czytania");
                var emptyList = [];
                dataList = new WinJS.Binding.List(emptyList);
                simpleListView.itemTemplate = simpleTemplate;
                simpleListView.itemDataSource = dataList.dataSource;
            }
        }, function () {
            console.log("cos");
        });
        return dataList;
    };
    
  
    var removeSelectedLinks = function (itemsToDelete, number) {
        console.log("---remove method---");
        var countOfSelectedItems = itemsToDelete.length;
        for (var i = 0; i < itemsToDelete.length; i++) {
            var nameLink = JSON.stringify(itemsToDelete[i].data.name)
            var pathLink = JSON.stringify(itemsToDelete[i].data.link);

            nameLink = nameLink.replace(/"/g, "");
            pathLink = pathLink.slice(9, pathLink.length -2);

            var prepareReg = "###" + nameLink + "*.*" + pathLink + " &&&";

            var removeName = new RegExp(prepareReg, "g");
            console.log(removeName.toString());
            textInFile = textInFile.replace(removeName, "")

        }
        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {

                    return Windows.Storage.FileIO.writeTextAsync(file, textInFile);
                }).done(function () {
                    console.log("zapis udany");
                    read(roamingFolder);
                });
 
        //### stackoverflow %%% http://stackoverflow.com/questions/2906582/how-to-create-an-html-button-that-acts-like-a-link &&&### facebook %%% https://www.facebook.com/ &&&

    };

    var publicMembers =
        {
            write: write,
            read: read,
            removeSelectedLinks: removeSelectedLinks,
           
        };
    WinJS.Namespace.define("DataManager", publicMembers);

    

})();