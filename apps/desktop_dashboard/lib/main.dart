import 'package:desktop_dashboard/app/app.dart';
import 'package:desktop_dashboard/bootstrap.dart';
import 'package:flutter/material.dart';
import 'package:local_storage_comms/local_storage_comms.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  bootstrap(() async {
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    final LocalStorageComms localStorageComms =
        LocalStorageComms(prefs: preferences);

    return App(
      localStorageComms: localStorageComms,
    );
  });
}
