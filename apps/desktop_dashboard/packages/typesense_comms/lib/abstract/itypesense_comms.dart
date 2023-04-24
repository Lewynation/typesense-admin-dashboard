import 'package:typesense/typesense.dart';

abstract class ITypesenseComms {
  Client? client;

  Future<Schema> getCollectionSchema(String collectionName);

  Future<List<Schema>> getCollections();

  // Future<>- Get Curations
  Future<Map<String, dynamic>> getAPIKeys();

  Future<Map<String, dynamic>> createAPIKey(Map<String, dynamic> params);

  Future<Map<String, dynamic>> getHealth();

  //Create Curation

  Future<Schema> deleteCollection(String collectionName);

  Future<Map<String, dynamic>> getAliases();

  ///upserts/creates an alias
  Future<Map<String, dynamic>> createAlias(
    String aliasName,
    Map<String, String> mapping,
  );

  Future<Map<String, dynamic>> deleteAPIKey(String keyId);

  Future<Map<String, dynamic>> deleteAlias(String aliasName);

//delete curation
}

class AuthData {
  final String apiKey;
  final Protocol protocol;
  final int port;
  final String host;
  final String? path;

  const AuthData({
    required this.apiKey,
    required this.protocol,
    required this.port,
    required this.host,
    this.path = "",
  });

  static const empty = AuthData(
    apiKey: "",
    protocol: Protocol.http,
    port: 8180,
    host: "",
    path: "",
  );

  static AuthData fromMap(Map<String, dynamic> map) {
    return AuthData(
      apiKey: map["apiKey"],
      protocol:
          map["protocol"] == "Protocol.http" ? Protocol.http : Protocol.https,
      port: map["port"],
      host: map["host"],
      path: map["path"],
    );
  }
}
