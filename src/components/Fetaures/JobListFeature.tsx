import { CardDefault, CardItem } from "../Styled/card.styled";
import Image from "next/image";
import LocationIcon from "../Icons/LocationIcon";
import MoneyIcon from "../Icons/MoneyIcon";
import { useEffect, useState } from "react";
import CheckCircleIcon from "../Icons/CheckCircleIcon";
import BadgeCheckIcon from "../Icons/BadgeCheckIcon";
import { BadgeCustom, BadgeDefault, BadgeDefaultOutline } from "../Styled/badge.styled";
import ShareIcon from "../Icons/ShareIcon";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api.service";
import { API_PATH } from "@/services/_path.service";

interface Props {
  callbackSelected: (value: any) => void;
}

export default function JobListFeature({ callbackSelected }: Props) {
  const [selected, setSelected] = useState<any>(listJobDummy.data[0]);
  const [onHover, setOnHover] = useState<any>(null);


  const dataLists = useQuery({
    queryKey: ["datasets", "detail"],
    queryFn: async () => {
      const response = await api.get(
        `${API_PATH().job}?select=*`,
      );

      setSelected(response.data[0]);
      callbackSelected(response.data[0]);
      return response.data;
    },
  });

  const handleSelected = (value: any) => {
    setSelected(value);
    callbackSelected(value);
  }

  return (
    <div className="flex flex-col gap-4" style={{ height: 'calc(100vh - 8.5rem)' }}>
      <div className="flex flex-col gap-4 pr-4 overflow-y-scroll">
        {dataLists.data?.map((item: any, index: number) => (
          <CardItem key={index} className={`px-4 py-3 cursor-pointer ${selected?.id === item.id ? 'focus' : ''}`} onClick={() => handleSelected(item)} onMouseEnter={() => setOnHover(item)} onMouseLeave={() => setOnHover(null)}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start relative">
                <div className="flex gap-4 text-neutral-90">
                  <div>
                    <Image src="/assets/logo-default.png" width={48} height={48} alt="logo-company" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <h3 className="text-base/relaxed font-bold">{item.title}</h3>
                    <div className="flex gap-1 items-center">
                      <p className="text-sm/relaxed">{item.company}</p>
                      <div className="text-primary"><BadgeCheckIcon /></div>
                    </div>
                  </div>
                </div>
                {listIdAppliedDummy.includes(item.id) && (
                  <div className="flex gap-1 text-xs/snug font-bold text-success items-center">
                    <CheckCircleIcon />
                    Applied
                  </div>
                )}
                <CardDefault className={`absolute ${onHover?.id === item.id ? 'opacity-100 top-0 right-0' : 'opacity-0 top-[-1rem] right-[-1rem]'} bg-white p-1 transition-all duration-300`}>
                  <ShareIcon />
                </CardDefault>
              </div>
              <div className="border-b border-neutral-40 border-dashed"></div>
              <div className="flex flex-col gap-2 text-neutral-80">
                <div className="flex gap-1">
                  <LocationIcon />
                  <p className="text-xs/snug">{item.location}</p>
                </div>
                <div className="flex gap-1">
                  <MoneyIcon />
                  <p className="text-xs/snug">{item.salary_range.display_text}</p>
                </div>
              </div>
              <div className="bg-neutral-20 flex gap-2 p-2 rounded-lg">
                <BadgeDefaultOutline color={item.job_type == "full-time" ? "success" : item.job_type == "contract" ? "warning" : "primary"} className="capitalize">{item.job_type}</BadgeDefaultOutline>
                {item.location_type == "onsite" ? (
                  <BadgeCustom bgColor="var(--color-neutral-100)" color="var(--color-white)" className="capitalize">{item.location_type}</BadgeCustom>
                ) : (
                  <BadgeDefault color={item.location_type == "remote" ? "success" : "primary"} className="capitalize">{item.location_type}</BadgeDefault>
                )}
              </div>
            </div>
          </CardItem>
        ))}
      </div>
    </div>
  )
}

const listIdAppliedDummy = ['job_20251001_0001', 'job_20251001_0003']

const listJobDummy = {
    "data": [
      {
        "id": "job_20251001_0001",
        "slug": "frontend-developer",
        "title": "Frontend Developer",
        "status": "inactive",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "remote",
        "salary_range": {
          "min": 7000000,
          "max": 8000000,
          "currency": "IDR",
          "display_text": "Rp7.000.000 - Rp8.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0002",
        "slug": "backend-developer",
        "title": "Backend Developer",
        "status": "inactive",
        "location": "Jakarta, Indonesia",
        "job_type": "intern",
        "location_type": "hybrid",
        "salary_range": {
          "min": 8000000,
          "max": 9000000,
          "currency": "IDR",
          "display_text": "Rp8.000.000 - Rp9.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0003",
        "slug": "fullstack-developer",
        "title": "Fullstack Developer",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "hybrid",
        "salary_range": {
          "min": 9000000,
          "max": 10000000,
          "currency": "IDR",
          "display_text": "Rp9.000.000 - Rp10.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0004",
        "slug": "devops-engineer",
        "title": "Devops Engineer",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "contract",
        "location_type": "remote",
        "salary_range": {
          "min": 10000000,
          "max": 11000000,
          "currency": "IDR",
          "display_text": "Rp10.000.000 - Rp11.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0005",
        "slug": "qa-engineer",
        "title": "QA Engineer",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 11000000,
          "max": 12000000,
          "currency": "IDR",
          "display_text": "Rp11.000.000 - Rp12.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0006",
        "slug": "backend-developer",
        "title": "Backend Developer",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "intern",
        "location_type": "onsite",
        "salary_range": {
          "min": 12000000,
          "max": 13000000,
          "currency": "IDR",
          "display_text": "Rp12.000.000 - Rp13.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0007",
        "slug": "frontend-developer",
        "title": "Frontend Developer",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "intern",
        "location_type": "onsite",
        "salary_range": {
          "min": 13000000,
          "max": 14000000,
          "currency": "IDR",
          "display_text": "Rp13.000.000 - Rp14.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0008",
        "slug": "fullstack-developer-2",
        "title": "Fullstack Developer 2",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 14000000,
          "max": 15000000,
          "currency": "IDR",
          "display_text": "Rp14.000.000 - Rp15.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0009",
        "slug": "devops-engineer-2",
        "title": "Devops Engineer 2",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 15000000,
          "max": 16000000,
          "currency": "IDR",
          "display_text": "Rp15.000.000 - Rp16.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0010",
        "slug": "qa-engineer-2",
        "title": "QA Engineer 2",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 16000000,
          "max": 17000000,
          "currency": "IDR",
          "display_text": "Rp16.000.000 - Rp17.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0011",
        "slug": "backend-developer-2",
        "title": "Backend Developer 2",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 17000000,
          "max": 18000000,
          "currency": "IDR",
          "display_text": "Rp17.000.000 - Rp18.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0012",
        "slug": "frontend-developer-2",
        "title": "Frontend Developer 2",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 18000000,
          "max": 19000000,
          "currency": "IDR",
          "display_text": "Rp18.000.000 - Rp19.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0013",
        "slug": "fullstack-developer-3",
        "title": "Fullstack Developer 3",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 19000000,
          "max": 20000000,
          "currency": "IDR",
          "display_text": "Rp19.000.000 - Rp20.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
      {
        "id": "job_20251001_0014",
        "slug": "devops-engineer-3",
        "title": "Devops Engineer 3",
        "status": "active",
        "location": "Jakarta, Indonesia",
        "job_type": "full-time",
        "location_type": "onsite",
        "salary_range": {
          "min": 20000000,
          "max": 21000000,
          "currency": "IDR",
          "display_text": "Rp20.000.000 - Rp21.000.000"
        },
        "list_card": {
          "badge": "Active",
          "started_on_text": "started on 1 Oct 2025",
          "cta": "Manage Job"
        }
      },
    ]
  }