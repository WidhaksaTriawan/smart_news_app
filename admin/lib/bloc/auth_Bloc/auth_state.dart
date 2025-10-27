import 'package:equatable/equatable.dart';

/// State menggambarkan kondisi aplikasi saat ini.
/// Bisa: awal, loading, sukses login, atau gagal login.
abstract class AuthState extends Equatable {
  const AuthState();

  @override
  List<Object?> get props => [];
}

/// State awal (belum login)
class AuthInitial extends AuthState {}

/// State loading (sedang proses login)
class AuthLoading extends AuthState {}

/// State sukses login
class AuthSuccess extends AuthState {
  final String token;

  const AuthSuccess(this.token);

  @override
  List<Object?> get props => [token];
}

/// State gagal login
class AuthFailure extends AuthState {
  final String message;

  const AuthFailure(this.message);

  @override
  List<Object?> get props => [message];
}
