export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
    // createdAt: string | null;
    // updatedAt: string | null;
    // deletedAt: string | null;
  // role: string | null;
  email: string;
  telNumber: number | null;
  // password: string;
  isActive: boolean;
}

export type UsersResponseDto = UserResponseDto[];
