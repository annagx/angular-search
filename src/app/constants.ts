import { Project } from "./interfaces/project";
import { StatusDetails } from "./interfaces/status-details";
import { Theme } from "./interfaces/theme";

export enum StatusCode {
    Approved,
    Validation,
    Refused,
    Inactive,
    Creation
  }

  export enum BackgroundColor {
    Green = '#98ebae',
    Yellow = '#ede76d',
    Red = '#eb91a3',
    White = '#fff',
    Blue = '#9fcfe0',
  }

  export enum TextColor {
    Green = '#3e784e',
    Yellow = '#737145',
    Red = '#5e1927',
    White = '#000',
    Blue = '#325663',
  }

  export const THEMES: { [key: number]: Theme } = {
    0: {
        backgroundColor: BackgroundColor.Green,
        textColor: TextColor.Green
    },
    1: {
        backgroundColor: BackgroundColor.Yellow,
        textColor: TextColor.Yellow
    },
    2: {
        backgroundColor: BackgroundColor.Red,
        textColor: TextColor.Red
    },
    3: {
        backgroundColor: BackgroundColor.White,
        textColor: TextColor.White
    },
    4: {
        backgroundColor: BackgroundColor.Blue,
        textColor: TextColor.Blue
    },
    }
  

  export const STATUS: StatusDetails[] = [
    {
        id: 0,
        text: "Approuvé",
        theme: THEMES[StatusCode.Approved],
    },
    {
        id: 1,
        text: "Validation",
        theme: THEMES[StatusCode.Validation],
    },
    {
        id: 2,
        text: "Refusé",
        theme: THEMES[StatusCode.Refused],
    },
    {
        id: 3,
        text: "Inactif",
        theme: THEMES[StatusCode.Inactive],
    },
    {
        id: 4,
        text: "Création",
        theme: THEMES[StatusCode.Creation],
    },
]

  export const PROJECTS: Project[] = [
    {
        "id" : 0,
        "name" : "Gestion A",
        "projectNumber" : "12345",
        "status" : StatusCode.Approved
    },
    {
        "id" : 1,
        "name" : "Gestion B",
        "projectNumber" : "12346",
        "status" : StatusCode.Validation
    },
    {
        "id" : 2,
        "name" : "Gestion C",
        "projectNumber" : "65432",
        "status" : StatusCode.Refused
    },
    {
        "id" : 3,
        "name" : "Gestion D",
        "projectNumber" : "99999",
        "status" : StatusCode.Inactive
    },
    {
        "id" : 4,
        "name" : "Gestion E",
        "projectNumber" : "00001",
        "status" : StatusCode.Creation
    },
    {
        "id" : 5,
        "name" : "Gestion F",
        "projectNumber" : "98745",
        "status" : StatusCode.Creation
    },
    {
        "id" : 6,
        "name" : "Gestion G",
        "projectNumber" : "23456",
        "status" : StatusCode.Inactive
    },
    {
        "id" : 7,
        "name" : "Gestion AA",
        "projectNumber" : "34567",
        "status" : StatusCode.Approved
    },
    {
        "id" : 8,
        "name" : "Gestion BB",
        "projectNumber" : "45678",
        "status" : StatusCode.Refused
    },
    {
        "id" : 9,
        "name" : "Gestion CC",
        "projectNumber" : "56789",
        "status" : StatusCode.Creation
    },

    {
        "id" : 10,
        "name" : "A1",
        "projectNumber" : "120",
        "status" : StatusCode.Refused
    }
  ]