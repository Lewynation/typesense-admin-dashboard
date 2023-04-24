part of 'auth_credentials_collector_bloc.dart';

class AuthCredentialsCollectorState extends Equatable {
  final String apiKey;
  final String host;
  final int port;
  final Protocol protocol;
  String? path;

  AuthCredentialsCollectorState({
    required this.apiKey,
    required this.host,
    required this.port,
    required this.protocol,
    this.path = "",
  });

  factory AuthCredentialsCollectorState.initial() {
    return AuthCredentialsCollectorState(
      apiKey: "",
      host: "",
      port: 8180,
      protocol: Protocol.http,
      path: "",
    );
  }

  AuthCredentialsCollectorState copyWith({
    String? apiKey,
    String? host,
    int? port,
    Protocol? protocol,
    String? path,
  }) {
    return AuthCredentialsCollectorState(
      apiKey: apiKey ?? this.apiKey,
      host: host ?? this.host,
      port: port ?? this.port,
      protocol: protocol ?? this.protocol,
      path: path ?? this.path,
    );
  }

  @override
  List<Object?> get props => [
        apiKey,
        host,
        port,
        protocol,
        path,
      ];
}
