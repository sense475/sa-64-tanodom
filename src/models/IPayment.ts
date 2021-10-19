import { UsersInterface } from "./IUser";
import { TreatmentInterface } from "./ITreatment";
import { PatientInterface } from "./IPatient";
export interface PaymentInterface {
    ID: number,
    price: number,
    note: String,
    UserID: number,
    User: UsersInterface,
    PatientID: number,
    Patient: PatientInterface,
    TreatmentID: number,
    Treatment: TreatmentInterface,

    Paytime: Date,
}