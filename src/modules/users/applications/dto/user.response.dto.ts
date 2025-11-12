export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  role: string | null;
}

export type UsersResponseDto = UserResponseDto[];
