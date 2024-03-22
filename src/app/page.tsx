import RegisterForm from "@/components/auth/RegisterForm";

type HomeParams = Readonly<{
  params: {
    register_success: string;
  };
}>;

export default function Home({ params }: HomeParams) {
  
  const registerSuccess = params.register_success === "true";

  return (
    <main className="p-10">
      {registerSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success!</p>
          <p>You have successfully registered.</p>
        </div>
      )}
      <h1 className="text-3xl font-bold">Register</h1>
      <RegisterForm />
    </main>
  );
}
