import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

interface SSInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  error?: FieldError;
  autoComplete?: string;
  autoFocus?: boolean;
}

const SSInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon,
  register,
  validation,
  error,
  autoComplete,
  autoFocus,
}: SSInputProps<T>) => {
  const [showLocalPassword, setShowLocalPassword] = useState(false);
  const inputType = type === "password" ? (showLocalPassword ? "text" : "password") : type;

  return (
    <div className="w-full min-w-0 box-border">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <div className="relative w-full box-border">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
            <i className={icon}></i>
          </span>
        )}

        <input
          type={inputType}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          {...register(name, validation)}
          className={`w-full max-w-full h-11 block rounded-xl border bg-transparent text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
            icon ? "pl-10" : "px-4"
          } ${type === "password" ? "pr-10" : "pr-4"} ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200"
              : "border-slate-200 dark:border-slate-700 text-gray-900 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
          style={{ boxSizing: "border-box", width: "100%", maxWidth: "100%" }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowLocalPassword(!showLocalPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showLocalPassword ? "Hide password" : "Show password"}
          >
            {showLocalPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SSInput;
