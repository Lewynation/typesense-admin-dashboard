import 'dart:async';

import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:custom_logger/custom_logger.dart';
import 'package:flutter/material.dart';

typedef Builder = FutureOr<Widget> Function();

void bootstrap(Builder builder) async {
  final logger = getLogger('bootstrap');
  WidgetsFlutterBinding.ensureInitialized();
  await runZonedGuarded(
    () async {
      runApp(await builder());
      doWhenWindowReady(() {
        const initialSize = Size(800, 600);
        appWindow.minSize = initialSize;
        appWindow.size = initialSize;
        appWindow.alignment = Alignment.center;
        appWindow.title = 'Desktop Dashboard';
        appWindow.show();
      });
    },
    (error, stackTrace) => logger.wtf(error, stackTrace),
  );
}
