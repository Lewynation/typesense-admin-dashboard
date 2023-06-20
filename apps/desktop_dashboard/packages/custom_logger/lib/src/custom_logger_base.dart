import 'package:logger/logger.dart';

/// Logs messages to the console.

Logger getLogger(String className) {
  return Logger(
    printer: CustomPrinter(className),
    output: CustomOutput(),
  );
}

class CustomPrinter extends LogPrinter {
  final String className;
  CustomPrinter(this.className);

  @override
  List<String> log(LogEvent event) {
    var color = PrettyPrinter.levelColors[event.level];
    var emoji = PrettyPrinter.levelEmojis[event.level];
    String output = color!('$emoji $className - ${event.message}');

    return [output];
  }
}

class CustomOutput extends LogOutput {
  @override
  void output(OutputEvent event) {
    for (var line in event.lines) {
      print(line);
    }
  }
}
