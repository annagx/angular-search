import { StatusCode } from "../constants";

export interface Project {
    id: number;
    name: string;
    projectNumber: string|number;
    status: StatusCode;
  }