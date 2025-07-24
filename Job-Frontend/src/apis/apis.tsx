// import axios from "axios";


// interface JobApiResponse {
//     success : boolean;
//     job : []
// }


// export const joblist = async () : Promise<JobApiResponse> => {
//     try {
//         const  response =  await axios.get(`http://10.60.15.87:8080/api/jobs`)
//         return response.data
//     } catch (error) {
//          console.error( "Faild to fetch", error)
//     }
    
// }

// apis.tsx
import axios from 'axios';

export interface JobType {
  id: number;
  title: string;
  location: string;
  salary: string;
  datePost: string;
  experience: string;
  jobType: string;
  jobProfile: string;
  Qualification: string;
  Skils: string;
}

export const joblist = async (): Promise<JobType[]> => {
  try {
    const response = await axios.get('http://10.60.15.87:8080/api/jobs');
    return response.data.jobs; // your JSON structure has jobs inside .jobs
  } catch (error) {
    console.error('Failed to fetch jobs', error);
    return [];
  }
};
