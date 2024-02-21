import { Separator } from "@/components/ui/separator"
import { JobForm } from "./job-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Post a Job</h3>
        <p className="text-sm text-muted-foreground">
          Post a job and deep dive into exceptional pool of talent over Hire-Hub
        </p>
      </div>
      <Separator />
      <JobForm />
    </div>
  )
}