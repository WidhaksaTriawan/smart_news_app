import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../core/constants.dart';

class AuthRepository {
  Future<String> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/admin/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['token'];
    } else {
      throw Exception('Login gagal');
    }
  }
}
