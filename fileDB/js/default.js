// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
            var applicationData = Windows.Storage.ApplicationData.current;
            var roamingFolder = applicationData.roamingFolder;
            write(roamingFolder);
            
            var dataList  = read(roamingFolder);
            dataList.push({ name: "cos", link: "cos2" });
            var addLinkButton = document.getElementById("addLinkButton");
            addLinkButton.addEventListener("click", this.saveLinkButtonHandler, false);
            
            var saveLinkButtonHandler = function () {

            }
        }
    };


    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
    
    var write = function (roamingFolder) {
       roamingFolder.createFileAsync("dataFile.txt", Windows.Storage.CreationCollisionOption.replaceExisting)
               .then(function (file) {
                   var dataToSave = [{ name: 'test123', link: 'test123' }, { name: 'test1qw23', link: 'test12qwe3' }];
                   

                   return Windows.Storage.FileIO.writeTextAsync(file,JSON.stringify(dataToSave));
               }).done(function () {
                   console.log("zapis udany");
               });
        
    };

    var read = function (roamingFolder) {
        var dataList;
        
        roamingFolder.getFileAsync("dataFile.txt")
        .then(function (sampleFile) {
            return Windows.Storage.FileIO.readTextAsync(sampleFile);
        }).done(function (content) {
            console.log(content);

            //dataList.push(JSON.parse(content) );
            //dataList.push({ name: JSON.parse(content).name, link:JSON.parse(content).link });
            var data = JSON.parse(content);
            console.log("asd");
            dataList = new WinJS.Binding.List(data);
            var simpleListView = document.getElementById('basicListView').winControl;
            var simpleTemplate = document.getElementById('mediumListIconTextTemplate');
            simpleListView.itemTemplate = simpleTemplate;
            simpleListView.itemDataSource = dataList.dataSource;
            dataList.push({ name: "asdd", link: "asdasd" });
        }, function () {
            console.log("cos");
        });
        return dataList;
    };

})();
