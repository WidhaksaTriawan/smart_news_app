import 'package:flutter_bloc/flutter_bloc.dart';
import 'auth_event.dart';
import 'auth_state.dart';
import '../../data/repositories/auth_repository.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository authRepository;

  AuthBloc(this.authRepository) : super(AuthInitial()) {
    /// Ketika event LoginRequested dipanggil, proses login dijalankan
    on<LoginRequested>((event, emit) async {
      emit(AuthLoading());
      try {
        final token = await authRepository.login(event.email, event.password);
        emit(AuthSuccess(token));
      } catch (e) {
        emit(AuthFailure("Login gagal: ${e.toString()}"));
      }
    });

    /// Kalau LogoutRequested dipanggil, reset state ke awal
    on<LogoutRequested>((event, emit) async {
      emit(AuthInitial());
    });
  }
}
