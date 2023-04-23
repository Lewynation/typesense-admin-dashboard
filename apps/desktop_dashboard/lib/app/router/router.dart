import 'package:desktop_dashboard/app/router/route_constants.dart';
import 'package:desktop_dashboard/home/view/view.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppRouter {
  AppRouter();
  static final GlobalKey<NavigatorState> _shellNavigator =
      GlobalKey<NavigatorState>(debugLabel: "shellNavigator");

  GoRouter router = GoRouter(
    // navigatorKey: _rootNavigator,
    debugLogDiagnostics: true,
    initialLocation: RouteConstants.home.toPath(),
    routes: [
      GoRoute(
        path: RouteConstants.home.toPath(),
        name: RouteConstants.home.toName(),
        pageBuilder: (context, state) {
          return MaterialPage(
            key: UniqueKey(),
            child: const Home(),
          );
        },
      ),
      GoRoute(
        path: RouteConstants.login.toPath(),
        name: RouteConstants.login.toName(),
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
  );
}
