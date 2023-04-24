import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:typesense/typesense.dart';

part 'auth_credentials_collector_event.dart';
part 'auth_credentials_collector_state.dart';

class AuthCredentialsCollectorBloc
    extends Bloc<AuthCredentialsCollectorEvent, AuthCredentialsCollectorState> {
  AuthCredentialsCollectorBloc()
      : super(AuthCredentialsCollectorState.initial()) {
    on<StoreAuthCredentialsEvent>(_onStoreAuthCredentialsEvent);
  }

  void _onStoreAuthCredentialsEvent(
    StoreAuthCredentialsEvent event,
    Emitter<AuthCredentialsCollectorState> emit,
  ) {
    emit(state.copyWith(
      apiKey: event.apiKey,
      host: event.host,
      port: event.port,
      protocol: event.protocol,
      path: event.path,
    ));
  }
}
