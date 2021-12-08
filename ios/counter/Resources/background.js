console.log("BACKGROUND SCRIPT");
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Receiveda request: ", request);
    if (request.message != "INC") {
        console.log("NOT INC");
        return;
    }
    browser.runtime.sendNativeMessage("application.id", { message: request.message }, function(response) {
        console.log("Received sendNativeMessage response:");
        console.log(response);
    });
});