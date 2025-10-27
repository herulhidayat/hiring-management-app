import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { CardDefault } from "../Styled/card.styled";
import CameraCapture from "../Form/CameraCapure";
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from "next/image";
import ButtonCustom from "../Button/ButtonCustom";
import UploadIcon from "../Icons/UploadIcon";
import { Close } from "@mui/icons-material";
import { FormControl, FormLabel } from "../Styled/form.styled";
import AntDateTimePicker from "../Form/AntDateTimePicker";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateIcon from "../Icons/DateIcon";
import SelectStatic from "../Form/SelectStaticV2";
import SelectCountryCode from "../Form/SelectCountryCode";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

export default function FormApplyFeature() {
  const [modalPicture, setModalPicture] = useState<boolean>(false);
  const [countrySelected, setCountrySelected] = useState<any>({})
  const [phoneNumber, setPhoneNumber] = useState<any>("")
  const scheme = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    photo_profile: yup.string().required('Photo profile is required'),
    gender: yup.string().required('Gender is required'),
    domicile: yup.string().required('Domicile is required'),
    email: yup.string().email().required('Email is required'),
    phone_number: yup.string().required('Phone number is required'),
    linkedin_link: yup.string().url().required('Linkedin link is required'),
    date_of_birth: yup.string().required('Date of birth is required'),
  })

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

  const handleSubmitForm = (data: any) => {
    const form = {
      ...data,
      phone_number: `${countrySelected.dial_code} ${data.phone_number}`,
    }

    console.log(form)
  }

  const handlePhoneNumber = (value: any) => {
    if(value.length == 1 && value[0] == '0') return
    setPhoneNumber(value)
    setValue('phone_number', value)
  }

  return(
    <>
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
                <UploadIcon /> <span>Take a Picture</span>
              </ButtonCustom>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Full Name<span className="text-danger">*</span></FormLabel>
            <FormControl 
              {...register("full_name")}
              placeholder="Full Name"
            />
          </div>
          <AntDateTimePicker
            isLabel={true}
            labelName={<>Date of Birth<span className="text-danger">*</span></>}
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
          <div className="flex flex-col gap-2">
            <FormLabel>{'Pronoun (gender)'}<span className="text-danger">*</span></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel sx={{ color: 'var(--color-neutral-90)', fontWeight: 400, fontSize: '0.875rem' }} value="female" control={<Radio sx={{ color: 'var(--color-primary)', '&.Mui-checked': { color: 'var(--color-primary)' }}} {...register("gender")} />} label="She/Her (Female)" />
              <FormControlLabel sx={{ color: 'var(--color-neutral-90)', fontWeight: 400, fontSize: '0.875rem' }} value="male" control={<Radio sx={{ color: 'var(--color-primary)', '&.Mui-checked': { color: 'var(--color-primary)' }}} {...register("gender")} />} label="He/Him (Male)" />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Domicile<span className="text-danger">*</span></FormLabel>
            <SelectStatic
              placeholder="Select your domicile"
              options={[
                {
                  label: 'Indonesia',
                  value: 'Indonesia'
                },
                {
                  label: 'Malaysia',
                  value: 'Malaysia'
                }
              ]} 
              control={control} 
              errors={errors} 
              fieldName={"domicile"}
              />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Phone Number<span className="text-danger">*</span></FormLabel>
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 flex gap-2 items-center">
                <div className="border-e border-neutral-40 pe-2">
                  <SelectCountryCode callbackSelected={setCountrySelected}/>
                </div>
                <p className="text-sm">{countrySelected?.dial_code}</p>
              </div>
              <FormControl style={{paddingLeft: countrySelected?.dial_code?.length > 4 ? '7.5rem' : countrySelected?.dial_code?.length > 3 ? '7rem' : '6.5rem'}} placeholder="81XXXXXXXXX" value={phoneNumber} onChange={(e: any) => handlePhoneNumber(e.target.value)}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Email<span className="text-danger">*</span></FormLabel>
            <FormControl 
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>LinkedIn Link<span className="text-danger">*</span></FormLabel>
            <FormControl 
              {...register("linkedin_link",)}
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
            { watch('linkedin_link') && (
              <div className="flex gap-1 text-primary items-center">
                <CheckCircleIcon />
                <p className="text-xs">URL Address found</p>
              </div>
            )}
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