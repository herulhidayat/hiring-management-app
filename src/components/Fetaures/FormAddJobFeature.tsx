import { useForm } from "react-hook-form";
import { FormControl, FormControlTextArea, FormLabel } from "../Styled/form.styled";
import SelectStatic from "../Form/SelectStaticV2";
import { Grid } from "@mui/material";
import { CardDefault } from "../Styled/card.styled";
import { BadgeDefaultOutline } from "../Styled/badge.styled";
import ButtonCustom from "../Button/ButtonCustom";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormAddJobFeature() {
  const [informationConfig, setInformationConfig] = useState<{
    field: string;
    label: string;
    required: boolean;
    status_required: 'mandatory' | 'optional' | 'off';
  }[]>([
    {
      field: 'full_name',
      label: 'Full Name',
      required: true,
      status_required: 'mandatory',
    },
    {
      field: 'photo_profile',
      label: 'Photo Profile',
      required: true,
      status_required: 'mandatory',
    },
    {
      field: 'gender',
      label: 'Gender',
      required: false,
      status_required: 'mandatory',
    },
    {
      field: 'domicile',
      label: 'Domicile',
      required: false,
      status_required: 'mandatory',
    },
    {
      field: 'email',
      label: 'Email',
      required: true,
      status_required: 'mandatory',
    },
    {
      field: 'phone_number',
      label: 'Phone Number',
      required: false,
      status_required: 'mandatory',
    },
    {
      field: 'linkedin_link',
      label: 'Linkedin Link',
      required: false,
      status_required: 'mandatory',
    },
    {
      field: 'date_of_birth',
      label: 'Date of Birth',
      required: false,
      status_required: 'mandatory',
    },
  ]);

  const schema = yup.object().shape({
    job_name: yup.string().required('Full name is required'),
    job_type: yup.string().required('Job type is required'),
    job_description: yup.string().required('Job description is required'),
    candidate: yup.number().min(1).required('Candidate is required'),
    salary_min: yup.number(),
    salary_max: yup.number(),
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
    resolver: yupResolver(schema)
  });

  const handleFormSubmit = (value:any) => {
    const form = {
      title: value.job_name,
      job_type: value.job_type,
      job_description: value.job_description,
      candidate: value.candidate,
      salary_range: {
        min: value.salary_min,
        max: value.salary_max
      },
      application_form: informationConfig
    }

    console.log(form);
  }

  return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormLabel>Job Name<span className="text-danger">*</span></FormLabel>
            <FormControl 
              {...register("job_name")}
              placeholder="Ex. Frontend Developer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Job Type<span className="text-danger">*</span></FormLabel>
            <SelectStatic
              placeholder="Select Job Type"
              options={[
                {
                  label: 'Full Time',
                  value: 'full-time'
                },
                {
                  label: 'Contract',
                  value: 'contract'
                },
                {
                  label: 'Part Time',
                  value: 'part-time'
                },
                {
                  label: 'Internship',
                  value: 'internship'
                },
                {
                  label: 'Freelance',
                  value: 'freelance'
                }
              ]} 
              control={control} 
              errors={errors} 
              fieldName={"job_type"}
              />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Job Description<span className="text-danger">*</span></FormLabel>
            <FormControlTextArea 
              {...register("job_description")}
              placeholder="Ex. "
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Number of Candidate Needed<span className="text-danger">*</span></FormLabel>
            <FormControl 
              {...register("candidate")}
              type="number"
              min={1}
              placeholder="Ex. 2"
            />
          </div>
          <div className="w-full border-t border-neutral-40 border-dashed mb-2"></div>
          <div className="flex flex-col gap-2">
            <FormLabel>Job Salary</FormLabel>
            <Grid container spacing={2}>
              <Grid size={6}>
                <div className="flex flex-col gap-2">
                  <FormLabel>Minimum Estimated Salary</FormLabel>
                  <div className="relative">
                    <span className="absolute px-1 left-2 top-1/2 -translate-y-1/2 text-sm font-medium">Rp</span>
                    <FormControl 
                      {...register("salary_min")}
                      type="number"
                      min={1}
                      placeholder="Ex. 7000000"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>
              </Grid>
              <Grid size={6}>
                <div className="flex flex-col gap-2">
                  <FormLabel>Maximum Estimated Salary</FormLabel>
                  <div className="relative">
                    <span className="absolute px-1 left-2 top-1/2 -translate-y-1/2 text-sm font-medium">Rp</span>
                    <FormControl 
                      {...register("salary_max")}
                      type="number"
                      min={1}
                      placeholder="Ex. 8000000"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <CardDefault className="p-4 flex flex-col gap-4">
            <p className="text-sm/relaxed font-bold text-neutral-90">Minimum Profile Information Required</p>
            <div className="flex flex-col gap-1 p-2">
              {informationConfig.map((item, index) => (
                <div className="flex justify-between items-center border-b border-neutral-40 py-2" key={index}>
                  <p className="text-sm/relaxed text-neutral-90">{item.label}</p>
                  <div className="flex gap-2 items-center">
                    <ButtonCustom
                      color={ item.status_required === 'mandatory' ? "var(--color-primary)" : "var(--color-neutral-90)"}
                      bgColor="var(--color-neutral-10)"
                      bgColorHover="var(--color-neutral-30)"
                      styleConfig={{
                        border: `1px solid ${item.status_required === 'mandatory' ? "var(--color-primary)" : "var(--color-neutral-40)"}`,
                        borderRadius: "1.5rem",
                        fontWeight: "400"
                      }}
                      optionsConfig={{
                        onClick: () => {
                          setInformationConfig((prev) => {
                            return prev.map((prevItem, prevIndex) => {
                              if (prevIndex === index) {
                                return {
                                  ...prevItem,
                                  status_required: 'mandatory'
                                }
                              }
                              return prevItem
                            })
                          })
                        }
                      }}
                    >Mandatory</ButtonCustom>
                    <ButtonCustom
                      color={ item.status_required === 'optional' ? "var(--color-primary)" : "var(--color-neutral-90)"}
                      bgColor="var(--color-neutral-10)"
                      bgColorHover="var(--color-neutral-30)"
                      styleConfig={{
                        border: `1px solid ${item.status_required === 'optional' ? "var(--color-primary)" : "var(--color-neutral-40)"}`,
                        borderRadius: "1.5rem",
                        fontWeight: "400"
                      }}
                      optionsConfig={{
                        onClick: () => {
                          setInformationConfig((prev) => {
                            return prev.map((prevItem, prevIndex) => {
                              if (prevIndex === index) {
                                return {
                                  ...prevItem,
                                  status_required: 'optional'
                                }
                              }
                              return prevItem
                            })
                          })
                        },
                        disabled: item.required
                      }}
                    >Optional</ButtonCustom>
                    <ButtonCustom
                      color={ item.status_required === 'off' ? "var(--color-primary)" : "var(--color-neutral-90)"}
                      bgColor="var(--color-neutral-10)"
                      bgColorHover="var(--color-neutral-30)"
                      styleConfig={{
                        border: `1px solid ${item.status_required === 'off' ? "var(--color-primary)" : "var(--color-neutral-40)"}`,
                        borderRadius: "1.5rem",
                        fontWeight: "400"
                      }}
                      optionsConfig={{
                        onClick: () => {
                          setInformationConfig((prev) => {
                            return prev.map((prevItem, prevIndex) => {
                              if (prevIndex === index) {
                                return {
                                  ...prevItem,
                                  status_required: 'off'
                                }
                              }
                              return prevItem
                            })
                          })
                        },
                        disabled: item.required
                      }}
                    >off</ButtonCustom>
                  </div>
                </div>
              ))}
            </div>
          </CardDefault>
        </div>
      </form>
  )
}