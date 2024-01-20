import { Document, Schema, model, Model } from "mongoose";

interface JobInterface extends Document {
  title: string;
  location: string;
  skillsRequired: string[];
  jobDesignation: string;
  educationQualification: string;
  experience: number;
  freshersEligible: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  postedAt: Date;
  updatedAt: Date | null; 
  online: boolean;
  workType: boolean;
  internship: boolean;
}

const jobSchema = new Schema<JobInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z0-9\s]*$/.test(value),
        message: "Title can only contain alphanumeric characters and spaces.",
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    jobDesignation: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    educationQualification: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    freshersEligible: {
      type: Boolean,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    online: {
      type: Boolean,
      default: false,
    },
    workType: {
      type: Boolean,
      default: true,
    },
    internship: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true as const,
  }
);
const Job: Model<JobInterface> = model("Job", jobSchema);

export default Job;
