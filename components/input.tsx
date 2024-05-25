import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface IInput {
  readonly name: string;
  readonly errors?: string[];
}

const _Input = (
  {
    name,
    errors = [],
    ...restProps
  }: IInput & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-blue-400 border-none placeholder:text-neutral-400 transition"
        {...restProps}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
