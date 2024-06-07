import { Employee } from "./employee.interface";
import { Shift } from "./shift.interface";

export interface Workday {
    id: number;
    shift: Shift;
    date: string; 
    timeOfArrival: string;
    departureTime: string; 
    totalHours: number;
    approved: string; 
    employee: Employee;
  
  }