import React from "react";
import InputError from "./InputError";

/**
 * Props for the FormInput component
 */
interface FormInputProps {
  /** Label text for the input */
  label: string;
  /** Unique identifier for the input */
  id: string;
  /** Input type (text, email, etc.) */
  type?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display */
  error?: string | null;
  /** Reference to the input element */
  inputRef?: React.RefObject<HTMLInputElement>;
  /** Whether the input is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the FormTextarea component
 */
interface FormTextareaProps {
  /** Label text for the textarea */
  label: string;
  /** Unique identifier for the textarea */
  id: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display */
  error?: string | null;
  /** Reference to the textarea element */
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  /** Number of visible text rows */
  rows?: number;
  /** Whether the textarea is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable form input component with consistent styling and accessibility
 *
 * Features:
 * - Consistent styling across all inputs
 * - Built-in error handling and display
 * - Full accessibility support (ARIA attributes)
 * - Focus states and transitions
 *
 * @example
 * ```tsx
 * const nameRef = useRef<HTMLInputElement>(null);
 * <FormInput
 *   label="Name"
 *   id="name"
 *   type="text"
 *   placeholder="John Doe"
 *   error={errors.name}
 *   inputRef={nameRef}
 *   required
 * />
 * ```
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  placeholder = "",
  error = null,
  inputRef,
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 w-full px-5 py-2 ${className}`}>
      <label
        className="block text-gray-400 font-bold mb-2 text-sm sm:text-base"
        htmlFor={id}
      >
        {label} {error && <InputError message={error} />}
      </label>
      <input
        ref={inputRef}
        className="border rounded-full w-full py-3 sm:py-2 px-4 sm:px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[44px] text-base"
        id={id}
        type={type}
        placeholder={placeholder}
        aria-required={required ? "true" : "false"}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </div>
  );
};

/**
 * Reusable form textarea component with consistent styling and accessibility
 *
 * Features:
 * - Consistent styling matching FormInput
 * - Built-in error handling and display
 * - Full accessibility support (ARIA attributes)
 * - Focus states and transitions
 *
 * @example
 * ```tsx
 * const messageRef = useRef<HTMLTextAreaElement>(null);
 * <FormTextarea
 *   label="Message"
 *   id="message"
 *   placeholder="Enter your message"
 *   error={errors.message}
 *   textareaRef={messageRef}
 *   rows={10}
 *   required
 * />
 * ```
 */
export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  placeholder = "",
  error = null,
  textareaRef,
  rows = 4,
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 w-full px-5 py-2 ${className}`}>
      <label
        className="block text-gray-400 font-bold mb-2 text-sm sm:text-base"
        htmlFor={id}
      >
        {label} {error && <InputError message={error} />}
      </label>
      <textarea
        ref={textareaRef}
        className="border rounded-xl w-full py-3 sm:py-2 px-4 sm:px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-vertical text-base"
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-required={required ? "true" : "false"}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </div>
  );
};
