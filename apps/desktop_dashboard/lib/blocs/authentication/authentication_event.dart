part of 'authentication_bloc.dart';

@immutable
abstract class AuthenticationEvent extends Equatable {}

class AuthenticationChanges extends AuthenticationEvent {
  final AuthData authData;

  AuthenticationChanges(this.authData);

  @override
  List<Object?> get props => [authData];
}

class AuthLogoutEvent extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}

class AuthLoginEvent extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}

class CheckAuthenticationStateEvent extends AuthenticationEvent {
  @override
  List<Object?> get props => [];
}
