export class UserResponseDto {
  UserID?: number;
  Username: string;
  Email: string;
  FullName: string;
  PhoneNumber?: string;
  Address?: string;
  IsAdmin: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
}
