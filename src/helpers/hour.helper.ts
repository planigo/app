import { Days } from "@/constants/hour.constants";

export const getDayLabel = (dayCode: number): string => {
    // RG: We decide to start at number 1
    if (dayCode < 0 || dayCode > 7) {
        throw new Error("Cannot match with a day");
    }

    return Days[dayCode]
}

export const reformatHour = (time: string): string => {
    return ""
}