import ButtonCustom from "@/components/Button/ButtonCustom";
import { FormControl, FormLabel } from "@/components/Styled/form.styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { deleteItem, getItem, setItem } from "@/components/Helper/localstorage.helper";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { BadgeDefaultOutline } from "@/components/Styled/badge.styled";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect')
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required("Password is required"),
    // remeberMe: yup.boolean()
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formModel] = useState<any>({
    email: "",
    password: "",
    // remeberMe: false
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formModel
  });
  


  const mutation = useMutation({
    mutationFn: async (newDataset: { email: string; password: string }) => {
      setIsLoading(true);
      const auth = await api.post(`${API_PATH().login}?grant_type=password`, newDataset);

      if(auth.data?.user?.id) {
        const profiles = await api.get(
          `${API_PATH().profiles}`,
          {
            headers: {
              Authorization: `Bearer ${auth.data?.access_token}`
            },
            params: {
              id: `eq.${auth.data?.user?.id}`
            }
          }
        )

        const expirationDate = new Date(auth.data?.expires_at);
        Cookies.set("authToken", auth.data?.access_token, { expires: expirationDate });

        setItem('token', auth.data?.access_token)
        setItem('user', profiles.data[0])
      }
      
  
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        router.push("/")
      }

      setIsLoading(false);
      return auth.data;
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  });

  // Handle form submission
  const handleSubmitForm = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if(getItem('token')) {
      deleteItem('token')
    } 
    if(getItem('user')) {
      deleteItem('user')
    }
  }, [])
  return (
    <>
      <Container sx={{mt:5}} className="flex justify-center h-[calc(100vh-8.5rem)] font-sans">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-6">
            <div>
              <Image src="/assets/logo.png" alt="logo" height={50} width={145} />
            </div>
            <div className="border border-neutral-40 p-10 bg-neutral-10 md:min-w-96">
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl/relaxed font-bold">Masuk ke Aplikasi</h2>
                  <p className="text-sm">Belum punya akun? <span className="text-primary cursor-pointer">Daftar menggunakan email</span></p>
                  {errorMessage && (
                    <BadgeDefaultOutline color="danger">{errorMessage}</BadgeDefaultOutline>
                  )}
                  <div className="flex flex-col gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl 
                      {...register("email")}
                      type="email"
                      placeholder="Masukkan Email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl 
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan Password"
                      />
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-70 cursor-pointer">
                        {showPassword ? (
                          <Visibility sx={{ fontSize: '1.25rem'}} onClick={() => setShowPassword(false)} />
                        ) : (
                          <VisibilityOff sx={{ fontSize: '1.25rem'}} onClick={() => setShowPassword(true)} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end cursor-pointer">
                    <p className="text-sm text-primary">Lupa kata sandi?</p>
                  </div>
                  <ButtonCustom 
                    color="var(--color-neutral-90)"
                    bgColor="var(--color-secondary)"
                    bgColorHover="var(--color-secondary-hover)" 
                    optionsConfig={{
                      type: "submit",
                      loading: isLoading
                    }}
                    styleConfig={{
                      height: '2.5rem'
                    }}
                  >
                    Masuk
                  </ButtonCustom>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

const queryClient = new QueryClient();

export default function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}
