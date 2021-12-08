//
//  SafariWebExtensionHandler.swift
//  counter
//
//  Created by Ali on 08/09/1400 AP.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    let sharedSuiteName = "group.com.example.extcounter";
    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)
        os_log("hellloooa,am,a")
        print("HELLLO")
        let response = NSExtensionItem()
        var myMes  = "NO";
        do{
        if let userDefaults = UserDefaults(suiteName: sharedSuiteName) {
            var count = userDefaults.integer(forKey: "KEY") ?? 0;
            count+=1;
            userDefaults.set(count, forKey: "KEY");
        }}
        catch{
            myMes = "YS"
        }
        response.userInfo = [ SFExtensionMessageKey: [ "Response to"+myMes: message ] ]
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
