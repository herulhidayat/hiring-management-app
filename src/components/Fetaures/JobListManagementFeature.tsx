import { AccessTime, Assignment, AssignmentOutlined, Description, DescriptionOutlined, VideoCameraFront, VideoCameraFrontOutlined, Work, WorkOutline } from "@mui/icons-material"
import ButtonCustom from "../Button/ButtonCustom"
import { BadgeCustomOutline, BadgeDefaultOutline } from "../Styled/badge.styled"

export default function JobListManagementFeature() {

  return (
    <div className="flex flex-col gap-4" style={{ height: 'calc(100vh - 8.5rem)' }}>
      <div className="flex flex-col gap-4 pr-2 overflow-y-auto">
        {listJobDummy.data.map((item, index) => (
          <div key={index} className={`p-2`}>
            <div className="flex flex-col gap-3 p-6 cursor-pointer rounded-2xl shadow-[0px_4px_8px_rgba(0,0,0,0.1)]">
              <div className="flex gap-2 items-start">
                <BadgeDefaultOutline color={ item.status === "active" ? "success" : item.status === "inactive" ? "danger" : "warning"} className="capitalize">{item.status}</BadgeDefaultOutline>
                <BadgeCustomOutline color={"var(--color-neutral-70)"} className="capitalize">{item.list_card.started_on_text}</BadgeCustomOutline>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {item.title}
                </p>
                <p className="text-base text-neutral-80">
                  {item.job_type}
                </p>
                <p className="text-base text-neutral-80">
                  {item.salary_range.display_text}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70'>
                      <AccessTime sx={{ fontSize: '1rem' }} />
                      Applied
                    </div>
                    <p className='text-xs/normal font-bold text-primary'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70'>
                      <AssignmentOutlined sx={{ fontSize: '1rem' }} />
                      Test
                    </div>
                    <p className='text-xs/normal font-bold text-primary'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70'>
                      <VideoCameraFrontOutlined sx={{ fontSize: '1rem' }} />
                      Interview
                    </div>
                    <p className='text-xs/normal font-bold text-primary'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70'>
                      <DescriptionOutlined sx={{ fontSize: '1rem' }} />
                      Offering
                    </div>
                    <p className='text-xs/normal font-bold text-primary'>0</p>
                  </div>
                  <div className="border-s border-neutral-40"></div>
                  <div className="flex flex-col gap-1">
                    <div className='text-xs/normal flex gap-1 items-center text-neutral-70'>
                      <WorkOutline sx={{ fontSize: '1rem' }} />
                      Hired
                    </div>
                    <p className='text-xs/normal font-bold text-primary'>0</p>
                  </div>
                </div>
                <ButtonCustom>
                  {item.list_card.cta}
                </ButtonCustom>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
      "status": "draft",
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