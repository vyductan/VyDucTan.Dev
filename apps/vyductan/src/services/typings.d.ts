declare namespace API {
  type ServiceResult<T> = {
    success: boolean;
    data?: T;
  };
}
