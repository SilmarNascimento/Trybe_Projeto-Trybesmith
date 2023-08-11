type StatusResponseErrorType = 'UNATHORIZED' | 'NOT_FOUND' | 'INVALID_VALUE';

export type ServiceResponseError = {
  status: StatusResponseErrorType,
  data: { message: string }
};

export type ServerResponseSuccess<Type> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: Type
};

export type ServiceResponse<Type> = ServiceResponseError | ServerResponseSuccess<Type>;
