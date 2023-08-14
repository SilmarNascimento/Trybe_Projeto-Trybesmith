type StatusResponseErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_VALUE' | 'BAD_REQUEST';

export type ServiceResponseError = {
  status: StatusResponseErrorType,
  data: { message: string }
};

export type ServerResponseSuccess<Type> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: Type
};

export type ServiceResponse<Type> = ServiceResponseError | ServerResponseSuccess<Type>;
