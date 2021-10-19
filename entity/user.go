package entity

import(
	"time"
	"gorm.io/gorm"
)
type Patient struct {
	gorm.Model
	PatientName string
	PatientLastname string
	PatientAge int
	PatientIDcard string `gorm:"uniqueIndex"`
	PatientTel string
	PatientTime time.Time

	Payment	[]Payment	`gorm:"foreignKey:PatientID"`
}

type Payment struct{
		gorm.Model

		Price	float32
		Paytime time.Time
		note	string

		PatientID 	*uint
		Patient 	Patient

		UserID	*uint
		User	User

		TreatmentID	*uint
		Treatment	Treatment


}


type User struct{
	gorm.Model
	UserName	string
	UserUsername	string `gorm:"uniqueIndex"`
	UserPass 	string


	Payment	[]Payment	`gorm:"foreignKey:UserID"`
}


type Treatment struct{
	gorm.Model
	Name string
	RawPrescriptionRAW string
	ToothNumber string
	TreatmentDate time.Time


	Payment []Payment `gorm:"foreignKey:TreatmentID"`
 }
   

