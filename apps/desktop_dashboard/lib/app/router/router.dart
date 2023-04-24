import 'dart:async';

import 'package:custom_logger/custom_logger.dart';
import 'package:desktop_dashboard/app/router/route_constants.dart';
import 'package:desktop_dashboard/blocs/authentication/authentication_bloc.dart';
import 'package:desktop_dashboard/login/view/view.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppRouter {
  AppRouter({
    required AuthenticationBloc authenticationBloc,
  }) : _authenticationBloc = authenticationBloc;

  final AuthenticationBloc _authenticationBloc;
  final _logger = getLogger("AppRouter");

  static final GlobalKey<NavigatorState> _shellNavigator =
      GlobalKey<NavigatorState>(debugLabel: "shellNavigator");

  late final GoRouter router = GoRouter(
    // navigatorKey: _rootNavigator,
    debugLogDiagnostics: true,
    initialLocation: RouteConstants.login.toPath(),
    routes: [
      GoRoute(
        path: RouteConstants.login.toPath(),
        name: RouteConstants.login.toName(),
        pageBuilder: (context, state) {
          return MaterialPage(
            key: UniqueKey(),
            child: const Login(),
          );
        },
      ),
      GoRoute(
        path: RouteConstants.home.toPath(),
        name: RouteConstants.home.toName(),
        pageBuilder: (context, state) {
          return MaterialPage(
            key: UniqueKey(),
            child: Scaffold(
              appBar: AppBar(
                title: const Text("Hello"),
              ),
              body: const Center(
                child: Text("Login"),
              ),
            ),
          );
        },
      ),
      // ShellRoute(
      //   navigatorKey: _shellNavigator,
      //   builder: (context, state, child) {
      //     return Home(
      //       key: state.pageKey,
      //       child: child,
      //     );
      //   },
      //   routes: [
      //     GoRoute(
      //       path: RouteConstants.map.toPath(),
      //       name: RouteConstants.map.toName(),
      //       pageBuilder: (context, state) {
      //         return const NoTransitionPage(
      //           child: GoogleMapViewWidget(),
      //         );
      //       },
      //     ),
      //     GoRoute(
      //       path: RouteConstants.activity.toPath(),
      //       name: RouteConstants.activity.toName(),
      //       pageBuilder: (context, state) {
      //         return const NoTransitionPage(
      //           child: ActivityView(),
      //         );
      //       },
      //     ),
      //     GoRoute(
      //       path: RouteConstants.settings.toPath(),
      //       name: RouteConstants.settings.toName(),
      //       pageBuilder: (context, state) {
      //         return const NoTransitionPage(
      //           child: SettingsView(),
      //         );
      //       },
      //     ),
      //   ],
      // )
    ],
    redirect: (BuildContext context, GoRouterState state) {
      final loggedIn = _authenticationBloc.state.status ==
          AuthenticationStatus.authenticated;

      final bool loggingIn = state.subloc == RouteConstants.login.toPath();
      _logger.wtf(loggedIn);

      if (!loggedIn) {
        return loggingIn ? null : RouteConstants.login.toPath();
      }
      if (loggingIn) {
        return RouteConstants.home.toPath();
      }
      return null;
    },
    refreshListenable: GoRouterRefreshStream(_authenticationBloc.stream),
  );
}

class GoRouterRefreshStream extends ChangeNotifier {
  late final StreamSubscription<dynamic> _subscription;

  GoRouterRefreshStream(Stream<dynamic> stream) {
    notifyListeners();
    _subscription = stream.asBroadcastStream().listen(
          (dynamic _) => notifyListeners(),
        );
  }

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
