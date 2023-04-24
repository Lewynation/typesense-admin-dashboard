import 'package:custom_logger/custom_logger.dart';
import 'package:typesense/typesense.dart';
import 'package:typesense_comms/abstract/itypesense_comms.dart';

/// Communicates with the Typesense server.
class TypesenseComms implements ITypesenseComms {
  @override
  Client? client;

  AuthData? authData;
  final _logger = getLogger("TypesenseComms");

  // factory TypesenseComms({AuthData? authData}) {
  //   return TypesenseComms._(authData);
  // }

  // TypesenseComms._(this.authData) {
  //   final config = Configuration(
  //     authData != null ? authData!.apiKey : "default",
  //     nodes: {
  //       Node(
  //         authData != null ? authData!.protocol : Protocol.http,
  //         authData != null ? authData!.host : "localhost",
  //         port: authData != null ? authData!.port : 8108,
  //         path: authData != null ? authData!.path! : "",
  //       ),
  //     },
  //     numRetries: 25,
  //   );

  //   client = Client(config);
  // }

  set config(AuthData authData) {
    this.authData = authData;
    final config = Configuration(
      authData.apiKey,
      nodes: {
        Node(
          authData.protocol,
          authData.host,
          port: authData.port,
          path: authData.path!,
        ),
      },
      numRetries: 25,
    );

    client = Client(config);
  }

  @override
  Future<Map<String, dynamic>> createAPIKey(Map<String, dynamic> params) {
    // TODO: implement createAPIKey
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> createAlias(
      String aliasName, Map<String, String> mapping) {
    // TODO: implement createAlias
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> deleteAPIKey(String keyId) {
    // TODO: implement deleteAPIKey
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> deleteAlias(String aliasName) {
    // TODO: implement deleteAlias
    throw UnimplementedError();
  }

  @override
  Future<Schema> deleteCollection(String collectionName) {
    // TODO: implement deleteCollection
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> getAPIKeys() {
    // TODO: implement getAPIKeys
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> getAliases() {
    // TODO: implement getAliases
    throw UnimplementedError();
  }

  @override
  Future<Schema> getCollectionSchema(String collectionName) {
    // TODO: implement getCollectionSchema
    throw UnimplementedError();
  }

  @override
  Future<List<Schema>> getCollections() {
    // TODO: implement getCollections
    throw UnimplementedError();
  }

  @override
  Future<Map<String, dynamic>> getHealth() async {
    try {
      final heathStatus = await client!.health.retrieve();
      final metrics = await client!.metrics.retrieve();

      _logger.d(heathStatus);
      _logger.d(metrics);
      return heathStatus;
    } catch (e) {
      _logger.e(e);
      throw Exception(e);
    }
  }
}
