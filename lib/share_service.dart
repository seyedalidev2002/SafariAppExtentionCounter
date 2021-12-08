import 'package:flutter/services.dart';

class ShareService {
  Future<String> getSharedData() async {
    return await MethodChannel('com.example.extcounter')
            .invokeMethod("getSharedData") ??
        "";
  }
}
