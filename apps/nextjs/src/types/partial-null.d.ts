declare type PartialNull<T> = {
  [P in keyof T]?: T[P] | undefined | null;
};