import 'package:desktop_dashboard/blocs/authentication/authentication_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Hellooo"),
      ),
      body: Center(
        child: TextButton(
            onPressed: () {
              context.read<AuthenticationBloc>().add(AuthLogoutEvent());
            },
            child: const Text("Logout")),
      ),
    );
  }
}
