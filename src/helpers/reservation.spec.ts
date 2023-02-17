import { Reservation, Slot } from '@/models/reservation.model';
import { describe, expect, test } from '@jest/globals';
import { getNextAvailableReservation, getNextAvailableSlot } from './reservation.helper';

describe("Next reservation", () => {
    test("A closed store for next days should return null", () => {
        const nextReservations: Reservation[] = [
            {
                date: "2023-02-16",
                slots: []
            },
            {
                date: "2023-02-17",
                slots: []
            },
            {
                date: "2023-02-18",
                slots: []
            },
            {
                date: "2023-02-19",
                slots: []
            },
            {
                date: "2023-02-21",
                slots: []
            },
            {
                date: "2023-02-22",
                slots: []
            },
            {
                date: "2023-02-23",
                slots: []
            },
        ]
        const result = getNextAvailableReservation(nextReservations)
        const expectedResult = null
        expect(result).toBe(expectedResult)
    })

    test("Should return the next reservation", () => {
        const nextReservations: Reservation[] = [
            {
                date: "2023-02-16",
                slots: []
            },
            {
                date: "2023-02-17",
                slots: []
            },
            {
                date: "2023-02-18",
                slots: []
            },
            {
                date: "2023-02-19",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-20",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-21",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-22",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-23",
                slots: []
            },
        ]
        const result = getNextAvailableReservation(nextReservations)
        const expectedResult = {
            date: "2023-02-19",
            slots: [
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "10:00:00",
                    "end": "11:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "11:00:00",
                    "end": "12:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "12:00:00",
                    "end": "13:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "13:00:00",
                    "end": "14:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "14:00:00",
                    "end": "15:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "15:00:00",
                    "end": "16:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "16:00:00",
                    "end": "17:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "17:00:00",
                    "end": "18:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "18:00:00",
                    "end": "19:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "19:00:00",
                    "end": "20:00:00",
                    "duration": 60
                }
            ]
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test("Should return the next reservation #2", () => {
        const nextReservations: Reservation[] = [
            {
                date: "2023-02-16",
                slots: []
            },
            {
                date: "2023-02-17",
                slots: []
            },
            {
                date: "2023-02-18",
                slots: []
            },
            {
                date: "2023-02-19",
                slots: []
            },
            {
                date: "2023-02-20",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-21",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-22",
                slots: [
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "10:00:00",
                        "end": "11:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "11:00:00",
                        "end": "12:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "12:00:00",
                        "end": "13:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "13:00:00",
                        "end": "14:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "14:00:00",
                        "end": "15:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "15:00:00",
                        "end": "16:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "16:00:00",
                        "end": "17:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "17:00:00",
                        "end": "18:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "18:00:00",
                        "end": "19:00:00",
                        "duration": 60
                    },
                    {
                        "reservationId": "",
                        "isAvailable": true,
                        "start": "19:00:00",
                        "end": "20:00:00",
                        "duration": 60
                    }
                ]
            },
            {
                date: "2023-02-23",
                slots: []
            },
        ]
        const result = getNextAvailableReservation(nextReservations)
        const expectedResult = {
            date: "2023-02-20",
            slots: [
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "10:00:00",
                    "end": "11:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "11:00:00",
                    "end": "12:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "12:00:00",
                    "end": "13:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "13:00:00",
                    "end": "14:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "14:00:00",
                    "end": "15:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "15:00:00",
                    "end": "16:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "16:00:00",
                    "end": "17:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "17:00:00",
                    "end": "18:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "18:00:00",
                    "end": "19:00:00",
                    "duration": 60
                },
                {
                    "reservationId": "",
                    "isAvailable": true,
                    "start": "19:00:00",
                    "end": "20:00:00",
                    "duration": 60
                }
            ]
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test("Should return the first slot available", () => {
        const slots: Slot[] = [
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "10:00:00",
                "end": "11:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "11:00:00",
                "end": "12:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "12:00:00",
                "end": "13:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "13:00:00",
                "end": "14:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "14:00:00",
                "end": "15:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "15:00:00",
                "end": "16:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "16:00:00",
                "end": "17:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "17:00:00",
                "end": "18:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "18:00:00",
                "end": "19:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "19:00:00",
                "end": "20:00:00",
                "duration": 60
            }
        ]
        const result = getNextAvailableSlot(slots)
        const expectedResult = {
            "reservationId": "",
            "isAvailable": true,
            "start": "10:00:00",
            "end": "11:00:00",
            "duration": 60
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test("Should return the third slot available", () => {
        const slots: Slot[] = [
            {
                "reservationId": "id-test-1",
                "isAvailable": false,
                "start": "10:00:00",
                "end": "11:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-test-2",
                "isAvailable": false,
                "start": "11:00:00",
                "end": "12:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "12:00:00",
                "end": "13:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "13:00:00",
                "end": "14:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "14:00:00",
                "end": "15:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "15:00:00",
                "end": "16:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "16:00:00",
                "end": "17:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "17:00:00",
                "end": "18:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "18:00:00",
                "end": "19:00:00",
                "duration": 60
            },
            {
                "reservationId": "",
                "isAvailable": true,
                "start": "19:00:00",
                "end": "20:00:00",
                "duration": 60
            }
        ]
        const result = getNextAvailableSlot(slots)
        const expectedResult = {
            "reservationId": "",
            "isAvailable": true,
            "start": "12:00:00",
            "end": "13:00:00",
            "duration": 60
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test("A shop Should return null", () => {
        const slots: Slot[] = [
            {
                "reservationId": "id-test-1",
                "isAvailable": false,
                "start": "10:00:00",
                "end": "11:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-test-2",
                "isAvailable": false,
                "start": "11:00:00",
                "end": "12:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-3",
                "isAvailable": false,
                "start": "12:00:00",
                "end": "13:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-4",
                "isAvailable": false,
                "start": "13:00:00",
                "end": "14:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-5",
                "isAvailable": false,
                "start": "14:00:00",
                "end": "15:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-6",
                "isAvailable": false,
                "start": "15:00:00",
                "end": "16:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-7",
                "isAvailable": false,
                "start": "16:00:00",
                "end": "17:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-8",
                "isAvailable": false,
                "start": "17:00:00",
                "end": "18:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-9",
                "isAvailable": false,
                "start": "18:00:00",
                "end": "19:00:00",
                "duration": 60
            },
            {
                "reservationId": "id-10",
                "isAvailable": false,
                "start": "19:00:00",
                "end": "20:00:00",
                "duration": 60
            }
        ]
        const result = getNextAvailableSlot(slots)
        const expectedResult = null
        expect(result).toBe(expectedResult)
    })

})

