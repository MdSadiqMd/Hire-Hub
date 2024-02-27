import mongoose, { Document, Schema, Model } from 'mongoose';

interface JobInterface extends Document {
  jobtitle: string;
  companyName:string;
  location: string;
  salary: number[];
  skillsRequired: string[];
  jobDescription: string;
  educationQualification: string;
  experience: number;
  freshersEligible: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  postedAt: Date;
  updatedAt: Date | null;
  workType: string;
  internship: boolean;
  companyLogo: string | null;
}

const jobSchema = new Schema<JobInterface>(
  {
    jobtitle: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z0-9\s]*$/.test(value),
        message: 'Title can only contain alphanumeric characters and spaces.',
      },
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: [String],
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
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
    postedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    workType: {
      type: String,
      default: 'true',
      enum: ['Hybrid', 'Remote','On-Site','Internship'],
    },
    companyLogo: {
      type: String,
    },
  },
  {
    timestamps: true as const,
  }
);

const Job: Model<JobInterface> = mongoose.models['jobs'] || mongoose.model('jobs', jobSchema);

export default Job;
