part of 'auth_credentials_collector_bloc.dart';

@immutable
abstract class AuthCredentialsCollectorEvent extends Equatable {}

class StoreAuthCredentialsEvent extends AuthCredentialsCollectorEvent {
  final String apiKey;
  final String host;
  final int port;
  final Protocol protocol;
  String? path;

  StoreAuthCredentialsEvent({
    required this.apiKey,
    required this.host,
    required this.protocol,
    required this.port,
    this.path,
  });

  @override
  List<Object?> get props => [
        apiKey,
        host,
        port,
        protocol,
        path,
      ];
}
