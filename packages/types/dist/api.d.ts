export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
export interface UserDto {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: Date;
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
}
export interface PageDto {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: 'PUBLISHED' | 'DRAFT';
    visibility: 'PUBLIC' | 'PRIVATE';
    createdAt: Date;
    updatedAt: Date;
}
export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
}
//# sourceMappingURL=api.d.ts.map