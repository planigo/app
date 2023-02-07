import { Days } from "@/constants/hour.constants";
import { Day } from "@/models/hour.model";

export const getDayLabel = (dayIndex: number): Day => {
    // RG: We decide to start at number 1
    if(dayIndex < 0 || dayIndex > 7) {
        throw new Error("Cannot match with a day");
        
    }
    return Days[dayIndex - 1]
}