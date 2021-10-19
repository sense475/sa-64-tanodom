package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB{
	return db
}

func SetupDatabase()  {
	database, err :=gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err !=nil {
		panic("failed to connect database")
	}

	//Migrate the schema
	database.AutoMigrate(
		&Payment{}, 
		&Patient{}, 
		&Treatment{},
		&User{},
	)

	db = database

	//ข้อมูลผู้ป่วย Patient
Patient1 := Patient{
	PatientName: "ธโนดม",
	PatientLastname: "โชติบำรุงพงศ์",
	PatientAge: 21,
	PatientIDcard: "11037-03000-XXX",
	PatientTel: "088-584-52xx",
	}


db.Model(&Patient{}).Create(&Patient1)

User1 := User{
	UserName: "sense",
	UserUsername: "sensesense",
	UserPass: "1",
	}
db.Model(&User{}).Create(&User1)

Treatment1 := Treatment{
	Name: "อุดฟัน",
	RawPrescriptionRAW: "A12",
	ToothNumber: "23",
	TreatmentDate: time.Now(),
	}
db.Model(&Treatment{}).Create(&Treatment1)
Payment1 := Payment{
	Price: 2000.00,
	Paytime: time.Now(),
	note: "",
	Patient: Patient1,
	User: User1,
	Treatment: Treatment1,



}
db.Model(&Payment{}).Create(&Payment1)
}