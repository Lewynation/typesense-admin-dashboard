import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter/material.dart';

class TitleBar extends StatelessWidget {
  const TitleBar({super.key});

  @override
  Widget build(BuildContext context) {
    return WindowTitleBarBox(
      child: Row(
        children: [
          Expanded(
            child: MoveWindow(),
          ),
          WindowButtons()
        ],
      ),
    );
  }
}

class WindowButtons extends StatelessWidget {
  WindowButtons({super.key});

  final buttonColors = WindowButtonColors(
    iconNormal: Colors.black,
    mouseOver: Colors.grey.shade200,
    mouseDown: Colors.grey.shade300,
    iconMouseOver: Colors.black,
    iconMouseDown: Colors.black,
  );

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        MinimizeWindowButton(
          colors: buttonColors,
        ),
        MaximizeWindowButton(),
        CloseWindowButton(),
      ],
    );
  }
}
