import 'package:bloc/bloc.dart';
import 'package:custom_logger/custom_logger.dart';
import 'package:desktop_dashboard/blocs/auth_credentials_collector/auth_credentials_collector_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:local_storage_comms/local_storage_comms.dart';
import 'package:meta/meta.dart';
import 'package:typesense_comms/typesense_comms.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  final AuthCredentialsCollectorBloc _authCredentialsCollectorBloc;
  final LocalStorageComms _localStorageComms;
  final TypesenseComms _typesenseComms;
  final _logger = getLogger("AuthenticationBloc");

  AuthenticationBloc({
    required AuthCredentialsCollectorBloc authCredBloc,
    required LocalStorageComms localStorageComms,
    required TypesenseComms typesenseComms,
  })  : _authCredentialsCollectorBloc = authCredBloc,
        _localStorageComms = localStorageComms,
        _typesenseComms = typesenseComms,
        super(const AuthenticationState.unknown()) {
    on<CheckAuthenticationStateEvent>(_onCheckAuthenticationStateEvent);
    on<AuthLogoutEvent>(_onAuthLogoutEvent);
    on<AuthLoginEvent>(_onAuthLoginEvent);
  }

  void _onCheckAuthenticationStateEvent(
    CheckAuthenticationStateEvent event,
    Emitter<AuthenticationState> emit,
  ) {
    try {
      final authData = _localStorageComms.getAuthData();
      _typesenseComms.config = authData;
      _typesenseComms.getHealth();
      emit(AuthenticationState.authenticated(authData));
    } catch (e) {
      emit(const AuthenticationState.unauthenticated());
      _logger.wtf(e);
    }
  }

  void _onAuthLogoutEvent(
    AuthLogoutEvent event,
    Emitter<AuthenticationState> emit,
  ) async {
    await _localStorageComms.deleteAuthData();
    emit(const AuthenticationState.unauthenticated());
  }

  Future<void> _onAuthLoginEvent(
    AuthLoginEvent event,
    Emitter<AuthenticationState> emit,
  ) async {
    final authCredsState = _authCredentialsCollectorBloc.state;

    final authData = AuthData(
      apiKey: authCredsState.apiKey,
      protocol: authCredsState.protocol,
      port: authCredsState.port,
      host: authCredsState.host,
      path: authCredsState.path,
    );
    try {
      _typesenseComms.config = authData;
      final healthResponse = await _typesenseComms.getHealth();
      await _localStorageComms.storeAuthData(authData);
      emit(AuthenticationState.authenticated(authData));
      _logger.wtf("healthResponse: $healthResponse");
    } catch (e) {
      emit(const AuthenticationState.unauthenticated());
      _logger.wtf(e);
    }
  }
}
