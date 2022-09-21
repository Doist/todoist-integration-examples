// Borrowed from https://stackoverflow.com/questions/50304604/generic-method-decorator-typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedMethodDecorator<T1 extends (...args: any[]) => any> = <T extends T1>(
    target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void
