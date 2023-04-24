part of 'authentication_bloc.dart';

enum AuthenticationStatus { authenticated, unauthenticated }

class AuthenticationState extends Equatable {
  final AuthenticationStatus status;
  final AuthData authData;

  const AuthenticationState._({
    required this.status,
    this.authData = AuthData.empty,
  });

  const AuthenticationState.authenticated(AuthData authData)
      : this._(
          status: AuthenticationStatus.authenticated,
          authData: authData,
        );

  const AuthenticationState.unauthenticated()
      : this._(
          status: AuthenticationStatus.unauthenticated,
        );

  @override
  List<Object?> get props => [
        status,
        authData,
      ];
}
