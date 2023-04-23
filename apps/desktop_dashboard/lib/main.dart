import 'package:desktop_dashboard/app/app.dart';
import 'package:desktop_dashboard/bootstrap.dart';
import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  bootstrap(() => const App());
}
