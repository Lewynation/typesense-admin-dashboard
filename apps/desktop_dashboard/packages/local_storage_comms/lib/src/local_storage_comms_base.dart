import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:typesense_comms/typesense_comms.dart';

/// Access the locals storage
class LocalStorageComms {
  final SharedPreferences prefs;

  LocalStorageComms({
    required this.prefs,
  });

  /// Get the auth data from the local storage
  AuthData getAuthData() {
    final storedAuthData = prefs.getString("authData");
    if (storedAuthData == null) {
      throw Exception("Auth data not found in local storage");
    }
    final auththData = AuthData.fromMap(json.decode(storedAuthData));
    return auththData;
  }

  /// Store the auth data in the local storage
  Future<bool> storeAuthData(AuthData authData) async {
    return prefs.setString("authData", json.encode(authData.toMap()));
  }

  /// Delete the auth data from the local storage
  Future<bool> deleteAuthData() async {
    return prefs.remove("authData");
  }
}

extension on AuthData {
  Map<String, dynamic> toMap() {
    return {
      "apiKey": apiKey,
      "protocol": protocol.toString(),
      "port": port,
      "host": host,
      "path": path,
    };
  }
}
