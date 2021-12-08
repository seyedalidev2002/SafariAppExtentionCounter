import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self) 
      print("HEY");

      let sharedSuiteName :String = "group.com.example.extcounter";
      let sharedDataKey: String = "KEY"

          let controller: FlutterViewController = window?.rootViewController as! FlutterViewController
          let methodChannel = FlutterMethodChannel(name: "com.example.extcounter", binaryMessenger: controller.binaryMessenger)

          methodChannel.setMethodCallHandler({
              (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
              if call.method == "getSharedData" {
                  if let prefs = UserDefaults(suiteName: sharedSuiteName) {
                      if let sharedText = prefs.string(forKey: sharedDataKey) {
                          print("HEY WE HAVE STH");

                          result(sharedText);
                      }
                      // clear out the cached data
                    // prefs.set(0, forKey: sharedDataKey);
                  }
              }
          })    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
