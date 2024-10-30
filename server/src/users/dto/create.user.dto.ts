export class CreateUserDto {
  Username: string;
  Email: string;
  Password: string;
  FullName: string;
  PhoneNumber?: string; // Thuộc tính có thể không bắt buộc (optional)
  Address?: string;
  IsAdmin?: boolean; // Thuộc tính có thể không bắt buộc và mặc định là false
}
