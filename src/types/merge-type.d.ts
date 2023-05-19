type Merge<T, R> = Omit<T, keyof R> & R
