import 'package:desktop_dashboard/app/router/router.dart';
import 'package:desktop_dashboard/blocs/auth_credentials_collector/auth_credentials_collector_bloc.dart';
import 'package:desktop_dashboard/blocs/authentication/authentication_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:local_storage_comms/local_storage_comms.dart';
import 'package:typesense_comms/typesense_comms.dart';

class App extends StatelessWidget {
  final LocalStorageComms _localStorageComms;

  const App({
    super.key,
    required LocalStorageComms localStorageComms,
  }) : _localStorageComms = localStorageComms;

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(
          value: _localStorageComms,
        ),
        RepositoryProvider<TypesenseComms>(
          create: (context) => TypesenseComms(),
        ),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthCredentialsCollectorBloc>(
            create: (context) => AuthCredentialsCollectorBloc(),
          ),
          BlocProvider<AuthenticationBloc>(
            create: (context) => AuthenticationBloc(
              authCredBloc: context.read<AuthCredentialsCollectorBloc>(),
              localStorageComms:
                  RepositoryProvider.of<LocalStorageComms>(context),
              typesenseComms: RepositoryProvider.of<TypesenseComms>(context),
            )..add(CheckAuthenticationStateEvent()),
          ),
        ],
        child: const AppHome(),
      ),
    );
  }
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: AppRouter(
        authenticationBloc: context.read<AuthenticationBloc>(),
      ).router,
    );
  }
}
