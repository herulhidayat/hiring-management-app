import { useForm } from "react-hook-form";
import { FormControl, FormControlTextArea, FormErrorLabel, FormLabel } from "../Styled/form.styled";
import SelectStatic from "../Form/SelectStaticV2";
import { Grid, Snackbar } from "@mui/material";
import { CardDefault } from "../Styled/card.styled";
import { BadgeDefaultOutline } from "../Styled/badge.styled";
import ButtonCustom from "../Button/ButtonCustom";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { formatThousand } from "../Helper/number.helper";
import AntDateTimePicker from "../Form/AntDateTimePicker";
import { CheckCircle, Close, ExpandMore } from "@mui/icons-material";
import DateIcon from "../Icons/DateIcon";
import moment from "moment";
import { getItem } from "../Helper/localstorage.helper";
import api from "@/services/api.service";
import { API_PATH } from "@/services/_path.service";


const queryClient = new QueryClient();

interface Props {
  handleCloseModal: () => void
  callbackSuccess?: () => void
}
function FormAddJob({ handleCloseModal, callbackSuccess }: Props) {
  const user = getItem('user')
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [dateTemp, setDateTemp] = useState<any>(null);

  const schema = yup.object().shape({
    job_name: yup.string().required('Full name is required'),
    job_type: yup.string().required('Job type is required'),
    job_description: yup.string().required('Job description is required'),
    candidate: yup.number().min(1).required('Candidate is required'),
    status: yup.string().required('Status is required'),
    location: yup.string().required('Location is required'),
    location_type: yup.string().required('Location type is required'),
    started_on_text: yup.string().required('Started on text is required'),
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

  const mutation = useMutation({
    mutationFn: async (params: any) => {
      setIsLoading(true);
      const response = await api.post(`${API_PATH().job}`,
        params
      );

      if(response.status === 201) {
        queryClient.refetchQueries({ queryKey: ["job"] });
        callbackSuccess && callbackSuccess();
        setIsLoading(false);
        handleCloseModal()
      }

      return response.data;
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.msg);
      setIsLoading(false);
    }
  });

  const handleFormSubmit = (value: any) => {
    const form = {
      title: value.job_name,
      status: value.status,
      location: value.location,
      location_type: value.location_type,
      job_type: value.job_type,
      job_description: value.job_description,
      candidate: value.candidate,
      salary_range: {
        min: value.salary_min || 0,
        max: value.salary_max || 0,
        currency: "IDR",
        display_text: `Rp${formatThousand(value.salary_min)} - Rp${formatThousand(value.salary_max)}`
      },
      list_card: {
        cta: "Manage Job",
        badge: value.status,
        started_on_text: `started on ${moment(value.start_date).format('DD MMMM YYYY')}`
      },
      application_form: informationConfig,
      company: user?.company
    }

    mutation.mutate(form)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardDefault className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-10 w-3/4 md:w-1/2">
          <div className="flex flex-col gap-0">
            <div className="flex justify-between p-6 border-b border-neutral-40">
              <div className="flex flex-col gap-0">
                <h4 className="text-xl font-bold text-neutral-100">Job Opening</h4>
              </div>
              <div className="cursor-pointer" onClick={handleCloseModal}>
                <Close />
              </div>
            </div>
            <div className="p-6 pe-4 overflow-y-auto max-h-[calc(100vh-12.5rem)] me-1">

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <FormLabel>Job Name<span className="text-danger">*</span></FormLabel>
                  <FormControl
                    {...register("job_name")}
                    className={errors.job_name ? 'error' : ''}
                    placeholder="Ex. Frontend Developer"
                  />
                  {errors.job_name && <FormErrorLabel>{errors.job_name.message as string}</FormErrorLabel>}
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
                  {errors.job_type && <FormErrorLabel>{errors.job_type.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Job Description<span className="text-danger">*</span></FormLabel>
                  <FormControlTextArea
                    {...register("job_description")}
                    className={errors.job_description ? 'error' : ''}
                    placeholder="Ex. "
                  />
                  {errors.job_description && <FormErrorLabel>{errors.job_description.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Number of Candidate Needed<span className="text-danger">*</span></FormLabel>
                  <FormControl
                    {...register("candidate")}
                    type="number"
                    min={1}
                    placeholder="Ex. 2"
                    className={errors.candidate ? 'error' : ''}
                  />
                  {errors.candidate && <FormErrorLabel>{errors.candidate.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Status<span className="text-danger">*</span></FormLabel>
                  <SelectStatic
                    placeholder="Select your status"
                    options={[
                      {
                        label: 'Active',
                        value: 'active'
                      },
                      {
                        label: 'Inactive',
                        value: 'inactive'
                      },
                      {
                        label: 'Draft',
                        value: 'draft'
                      }
                    ]}
                    control={control}
                    errors={errors}
                    fieldName={"status"}
                  />
                  {errors.status && <FormErrorLabel>{errors.status.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Location<span className="text-danger">*</span></FormLabel>
                  <FormControl
                    {...register("location")}
                    placeholder="Ex. Jakarta, Indonesia"
                    className={errors.location ? 'error' : ''}
                  />
                  {errors.location && <FormErrorLabel>{errors.location.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-2">
                  <FormLabel>Workplace Model<span className="text-danger">*</span></FormLabel>
                  <SelectStatic
                    placeholder="Select your workplace model"
                    options={[
                      {
                        label: 'Onsite',
                        value: 'onsite'
                      },
                      {
                        label: 'Hybrid',
                        value: 'hybrid'
                      },
                      {
                        label: 'Remote',
                        value: 'remote'
                      }
                    ]}
                    control={control}
                    errors={errors}
                    fieldName={"location_type"}
                  />
                  {errors.location_type && <FormErrorLabel>{errors.location_type.message as string}</FormErrorLabel>}
                </div>
                <div className="flex flex-col gap-0">
                  <AntDateTimePicker
                    isLabel={true}
                    labelName={<>Publish Date<span className="text-danger">*</span></>}
                    placeholder={'Select date'}
                    showTime={false}
                    defaultValue={dateTemp || new Date()}
                    style={{
                      borderRadius: '0.5rem',
                      width: '100%',
                      padding: '0.71rem 1rem',
                    }}
                    callbackOnChange={(value: any) => {
                      setValue('started_on_text', value)
                      setDateTemp(value)
                    }}
                    suffixIcon={<ExpandMore />}
                    prefix={
                      <div className="me-2"><DateIcon /></div>
                    }
                  />
                  {errors.started_on_text && <FormErrorLabel>{errors.started_on_text.message as string}</FormErrorLabel>}
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
                            color={item.status_required === 'mandatory' ? "var(--color-primary)" : "var(--color-neutral-90)"}
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
                            color={item.status_required === 'optional' ? "var(--color-primary)" : "var(--color-neutral-90)"}
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
                            color={item.status_required === 'off' ? "var(--color-primary)" : "var(--color-neutral-90)"}
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
            </div>
            <div className="flex justify-end p-6 border-t border-neutral-40">
              <ButtonCustom optionsConfig={{
                type: 'submit',
                loading: isLoading
              }}>
                Publish Job
              </ButtonCustom>
            </div>
          </div>
        </CardDefault>
      </form>
    </>
  )
}

export default function FormAddJobFeature({ handleCloseModal, callbackSuccess }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <FormAddJob handleCloseModal={handleCloseModal} callbackSuccess={callbackSuccess} />
    </QueryClientProvider>
  );
}
