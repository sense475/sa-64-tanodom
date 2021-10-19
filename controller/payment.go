package controller

import (
	"net/http"

	"github.com/sense475/sa-64-lab5/entity"
	"github.com/gin-gonic/gin"
)

// POST /watch_videos
func CreatePayment(c *gin.Context) {

	var payment entity.Payment
	var user entity.User
	var treatment entity.Treatment
	var patient entity.Patient

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา video ด้วย id
	if tx := entity.DB().Where("id = ?", payment.TreatmentID).First(&treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Treatment not found"})
		return
	}

	// 9: ค้นหา resolution ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}

	// 10: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", payment.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// 11: สร้าง Payment
	wv := entity.Payment{
		User:  user,             // โยงความสัมพันธ์กับ Entity User
		Treatment:       treatment,                  // โยงความสัมพันธ์กับ Entity Treatment
		Patient:    patient,               // โยงความสัมพันธ์กับ Entity Patient
		Price:	payment.Price,		//ตั้งค่าฟิลด์ price
		Paytime: payment.Paytime, // ตั้งค่าฟิลด์ paytimeTime
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})
}

// GET /payment/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Patient").Preload("Treatment").Raw("SELECT * FROM payment WHERE id = ?", id).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payments
func ListPayment(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().Preload("User").Preload("Patient").Preload("Treatment").Raw("SELECT * FROM payment").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// DELETE /paymeny/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /payment
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.ID).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	if err := entity.DB().Save(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}