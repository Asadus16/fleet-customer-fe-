export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface SelectOption {
  label: string;
  value: string;
}

export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
