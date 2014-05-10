(function () {
    "use strict";
    var textInFile;
    var dataList;
    var applicationData = Windows.Storage.ApplicationData.current;
    var roamingFolder = applicationData.roamingFolder;
    var sizeDB = 0;
    var db = [];
    db.links = [];
    
    var write = function (roamingFolder, nameRetrieved, linkRetrieved) {
        console.log("JESTEM WRITE");
       
       
       console.log(sizeDB);
       console.log(db[0]);

        roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                   
                  
                    console.log(sizeDB);
                    console.log(db[0]);
                    var newLink_ = {
                        id: ++sizeDB,
                        link: linkRetrieved,
                        name: nameRetrieved
                    };
                    db.push(newLink_);
                    return Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(db));
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
            var simpleListView = document.getElementById('basicListView').winControl;
            var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
            //try {
            console.dir(content.length);
            if (content.length === 0) {
                console.log("Plik najprawdopodobniej jest pusty...");
                return;
            };
          
            var json_file = JSON.parse(content);
            sizeDB = json_file.length;
            console.log(sizeDB);
            db = json_file;
            console.log(db);
            dataList = new WinJS.Binding.List(db);
                

            simpleListView.itemTemplate = simpleTemplate;
            simpleListView.itemDataSource = dataList.dataSource;
          
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