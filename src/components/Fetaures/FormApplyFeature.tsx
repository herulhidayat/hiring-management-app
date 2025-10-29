import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import { useMemo, useState } from "react";
import { CardDefault } from "../Styled/card.styled";
import CameraCapture from "../Form/CameraCapure";
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from "next/image";
import ButtonCustom from "../Button/ButtonCustom";
import UploadIcon from "../Icons/UploadIcon";
import { Close } from "@mui/icons-material";
import { FormControl, FormErrorLabel, FormLabel } from "../Styled/form.styled";
import AntDateTimePicker from "../Form/AntDateTimePicker";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateIcon from "../Icons/DateIcon";
import SelectStatic from "../Form/SelectStaticV2";
import SelectCountryCode from "../Form/SelectCountryCode";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
import { useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/api.service";
import { API_PATH } from "@/services/_path.service";
import { useRouter } from "next/router";

interface Props {
  callbackSuccess: (value: any) => void
}
function FormApply({ callbackSuccess }: Props) {
  const searchParams = useSearchParams()
  const [modalPicture, setModalPicture] = useState<boolean>(false);
  const [countrySelected, setCountrySelected] = useState<any>({})
  const [phoneNumber, setPhoneNumber] = useState<any>("")
  const [scheme, setScheme] = useState<any>(yup.object()) 
  const [applicationForm, setApplicationForm] = useState<any>([])
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(scheme)
  });

  const getData = useQuery({
      queryKey: [searchParams.get('id')],
      queryFn: async () => {
        if(!searchParams.get('id')) {
          return
        }

        const response = await api.get(
          `${API_PATH().job}`,
          {
            params: {
              id: `eq.${searchParams.get('id')}`
            }
          }
        );

        if(response.data?.[0]?.application_form?.length > 0) {
          let dataScheme: any = {}

          response.data?.[0]?.application_form?.map((item: any) => {
            dataScheme[item.field] = yup.string().required(`${item.label} is required`)
          })

          setScheme(yup.object().shape(dataScheme))
          setApplicationForm(response.data?.[0]?.application_form)
        }
        return response.data;
      },
    });

  const mutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      setIsLoading(true);
      const auth = await api.post(`${API_PATH().applied}`, 
        params
      );

      return auth.data;
    },
    onSuccess: (data: any) => {
      setIsLoading(false);
      callbackSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  });

  const handleSubmitForm = (data: any) => {
    const form = {
      ...data,
      job_id: searchParams.get('id'),
      phone_number: `${countrySelected.dial_code} ${data.phone_number}`,
    }

    mutation.mutate(form)
  }

  const handlePhoneNumber = (value: any) => {
    if(value.length == 1 && value[0] == '0') return
    setPhoneNumber(value)
    setValue('phone_number', value)
  }

  const checkRequired = (field: string, applicationForm: any) => {
    if(applicationForm?.find((item: any) => item.field == field)?.status_required == 'mandatory') {
      return true
    } else {
      return false
    }
  }

  const renderForm = useMemo(() => {
    return(
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-4">
          <p className="text-xs text-danger font-bold">*Required</p>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-neutral-90">Photo Profile</p>
            <div>
              <Image src={ getValues('photo_profile') || "/assets/Avatar.png"} className="rounded-full object-cover h-[128px] w-[128px]" width={128} height={128} alt="avatar" />
            </div>
            <div>
              <ButtonCustom 
                color="var(--color-neutral-90)"
                bgColor="var(--color-neutral-10)"
                bgColorHover="var(--color-neutral-30)" 
                optionsConfig={{
                  onClick: () => {
                    setModalPicture(true);
                  }
                }}
                styleConfig={{
                  border: '1px solid var(--color-neutral-40)',
                }}
              >
                <UploadIcon /> <span>Take a Picture{checkRequired('photo_profile', applicationForm) && <span className="text-danger">*</span>}</span>
              </ButtonCustom>
            </div>
            {errors.photo_profile && <FormErrorLabel>{errors.photo_profile.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Full Name{checkRequired('full_name', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <FormControl 
              {...register("full_name")}
              className={errors.full_name ? 'error' : ''}
              placeholder="Full Name"
            />
            {errors.full_name && <FormErrorLabel>{errors.full_name.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-0">
            <AntDateTimePicker
              isLabel={true}
              labelName={<>Date of Birth{checkRequired('date_of_birth', applicationForm) && <span className="text-danger">*</span>}</>}
              placeholder={'Select date'}
              showTime={false}
              style={{ 
                borderRadius: '0.5rem',
                width: '100%',
                padding: '0.71rem 1rem',
              }}
              callbackOnChange={(value: any) => {
                setValue('date_of_birth', value)
              }}
              suffixIcon={<ExpandMoreIcon />}
              prefix={
                <div className="me-2"><DateIcon /></div>
              }
            />
            {errors.date_of_birth && <FormErrorLabel>{errors.date_of_birth.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>{'Pronoun (gender)'}{checkRequired('gender', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel sx={{ color: 'var(--color-neutral-90)', fontWeight: 400, fontSize: '0.875rem' }} value="female" control={<Radio sx={{ color: 'var(--color-primary)', '&.Mui-checked': { color: 'var(--color-primary)' }}} {...register("gender")} />} label="She/Her (Female)" />
              <FormControlLabel sx={{ color: 'var(--color-neutral-90)', fontWeight: 400, fontSize: '0.875rem' }} value="male" control={<Radio sx={{ color: 'var(--color-primary)', '&.Mui-checked': { color: 'var(--color-primary)' }}} {...register("gender")} />} label="He/Him (Male)" />
            </RadioGroup>
            {errors.gender && <FormErrorLabel>{errors.gender.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Domicile{checkRequired('domicile', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <SelectStatic
              placeholder="Select your domicile"
              options={[
                {
                  label: 'Jakarta, Indonesia',
                  value: 'Jakarta, Indonesia'
                },
                {
                  label: 'Bandung, Indonesia',
                  value: 'Bandung, Indonesia'
                },
                {
                  label: 'Surabaya, Indonesia',
                  value: 'Surabaya, Indonesia'
                },
                {
                  label: 'Yogyakarta, Indonesia',
                  value: 'Yogyakarta, Indonesia'
                }
              ]} 
              control={control} 
              errors={errors} 
              fieldName={"domicile"}
              />
            {errors.domicile && <FormErrorLabel>{errors.domicile.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Phone Number{checkRequired('phone_number', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 flex gap-2 items-center">
                <div className="border-e border-neutral-40 pe-2">
                  <SelectCountryCode callbackSelected={setCountrySelected}/>
                </div>
                <p className="text-sm">{countrySelected?.dial_code}</p>
              </div>
              <FormControl className={errors.phone_number ? 'error' : ''} style={{paddingLeft: countrySelected?.dial_code?.length > 4 ? '7.5rem' : countrySelected?.dial_code?.length > 3 ? '7rem' : '6.5rem'}} placeholder="81XXXXXXXXX" value={phoneNumber} onChange={(e: any) => handlePhoneNumber(e.target.value)}/>
            </div>
            {errors.phone_number && <FormErrorLabel>{errors.phone_number.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Email{checkRequired('email', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <FormControl 
              {...register("email")}
              type="email"
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <FormErrorLabel>{errors.email.message as string}</FormErrorLabel>}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>LinkedIn Link{checkRequired('linkedin_link', applicationForm) && <span className="text-danger">*</span>}</FormLabel>
            <FormControl 
              {...register("linkedin_link",)}
              type="url"
              className={errors.linkedin_link ? 'error' : ''}
              placeholder="https://linkedin.com/in/username"
            />
            { watch('linkedin_link') && (
              <div className="flex gap-1 text-primary items-center">
                <CheckCircleIcon />
                <p className="text-xs">URL Address found</p>
              </div>
            )}
            {errors.linkedin_link && <FormErrorLabel>{errors.linkedin_link.message as string}</FormErrorLabel>}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonCustom
              optionsConfig={{
                type: 'submit'
              }}
              styleConfig={{
                height: '2.5rem'
              }}
            >Submit</ButtonCustom>
          </div>
        </div> 
      </form>
    )
  }, [control, errors, phoneNumber, watch, countrySelected, applicationForm, watch('photo_profile')]);

  return(
    <>
      {renderForm}

      <Modal
        open={modalPicture}
        onClose={() => setModalPicture(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CardDefault className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-10">
          <div className="flex flex-col gap-0">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-0">
                <h4 className="text-xl font-bold text-neutral-100">Raise Your Hand to Capture</h4>
                <p className="text-base text-neutral-100">We’ll take the photo once your hand pose is detected.</p>
              </div>
              <div onClick={() => setModalPicture(false)}>
                <Close />
              </div>
            </div>
            <div className="p-6 pt-0">
              <CameraCapture callbackData={(value) => {
                setValue('photo_profile', value);
                setModalPicture(false);
              }}/>
            </div>
          </div>
        </CardDefault>
      </Modal>
    </>
  )
}

const queryClient = new QueryClient();

export default function FormApplyFeature({ callbackSuccess }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <FormApply callbackSuccess={callbackSuccess} />
    </QueryClientProvider>
  );
}
