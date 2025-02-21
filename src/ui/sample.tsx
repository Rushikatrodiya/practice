import { ReactElement, ComponentType } from "react";
import BaseErrorMessage from "../ui/BaseErrorMessage";
import BaseLabel from "../ui/BaseLabel";

type IFormFieldProps<T> = {
  label: string;
  name: string;
  component: ComponentType<T>; // Accepts any React component
  error?: string;
} & T; // Spreads additional props to the component

export default function FormField<T>(props: IFormFieldProps<T>): ReactElement {
  const { label, name, component: Component, error, ...componentProps } = props;

  return (
    <div className="mb-4">
      <BaseLabel htmlFor={name} labeltitle={label} />
      <Component id={name} {...(componentProps as T)} />
      {error && <BaseErrorMessage error={new Error(error)} />}
    </div>
  );
}




import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";
import FormGroup from "./FormGroup";
import BaseButton from "../ui/BaseButton"; // Using your button component

const userSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log("User Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <FormGroup>
        <FormField
          label="Full Name"
          name="fullName"
          component="input"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormField
          label="Email"
          name="email"
          component="input"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Password"
          name="password"
          component="input"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
      </FormGroup>
      <BaseButton type="submit" intent="primary">Submit</BaseButton>
    </form>
  );
};

export default UserForm;






import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";
import FormGroup from "./FormGroup";
import BaseButton from "../ui/BaseButton"; // Using your button component

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <FormGroup>
        <FormField
          label="Email"
          name="email"
          component="input"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Password"
          name="password"
          component="input"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
      </FormGroup>
      <BaseButton type="submit" intent="success">Login</BaseButton>
    </form>
  );
};

export default LoginForm;









export async function signUpAction(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
  };

  // Validate the data
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    // Return validation errors
    return { errors: result.error.flatten().fieldErrors };
  }

  // Here, you would handle successful sign-up (e.g., save to DB)
  console.log("Valid SignUp Data:", result.data);

  return { success: true };
}
