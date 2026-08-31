// Synthetic fixture: React Native mobile app storing auth JWT in unencrypted AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeUserSession(jwtToken: string, refreshToken: string) {
  // Vulnerability: AsyncStorage stores plaintext XML/SQLite on device
  await AsyncStorage.setItem('auth_token', jwtToken);
  await AsyncStorage.setItem('refresh_token', refreshToken);
}
