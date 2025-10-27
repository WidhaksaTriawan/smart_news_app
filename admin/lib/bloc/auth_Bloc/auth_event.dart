import 'package:equatable/equatable.dart';

/// Event digunakan untuk memberitahu Bloc bahwa ada aksi yang perlu diproses.
/// Misalnya: user menekan tombol login.
abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object> get props => [];
}

/// Event ini dikirim ketika user menekan tombol "Login"
class LoginRequested extends AuthEvent {
  final String email;
  final String password;

  const LoginRequested(this.email, this.password);

  @override
  List<Object> get props => [email, password];
}

/// (Opsional) Event ini bisa digunakan untuk logout
class LogoutRequested extends AuthEvent {}
