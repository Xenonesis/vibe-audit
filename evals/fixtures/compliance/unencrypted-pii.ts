// Synthetic fixture: Plain-text PII storage without encryption markers or deletion pathway
export interface UserSchema {
  id: string;
  email: string;
  phoneNumber: string;
  socialSecurityNumber: string;
  dateOfBirth: string;
}

export function saveUser(db: { insert: (table: string, data: UserSchema) => Promise<void> }, user: UserSchema): Promise<void> {
  // Storing raw PII in database without encryption
  return db.insert("users", user);
}
