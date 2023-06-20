enum RouteConstants { home, login }

extension ToPathName on RouteConstants {
  String toPath() {
    switch (this) {
      case RouteConstants.home:
        return "/home";
      case RouteConstants.login:
        return "/login";
    }
  }

  String toName() {
    switch (this) {
      case RouteConstants.home:
        return "Home";
      case RouteConstants.login:
        return "Login";
    }
  }
}
