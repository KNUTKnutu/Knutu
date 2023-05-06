package Struct

type User struct {
	Id                 string     `json:"id" firestore:"id"`
	Pw                 string     `json:"pw" firestore:"pw"`
	Name               string     `json:"name"`
	Email              string     `json:"email"`
	Title              string     `json:"title"`
	ProfilePicture     string     `json:"profile_picture"`
	Preference         Preference `json:"preference"`
	Level              int        `json:"level"`
	CurrentExperience  float64    `json:"current_experience"`
	TotalExperience    float64    `json:"total_experience"`
	RemainExperience   float64    `json:"remain_experience"`
	Reputation         int        `json:"reputation"`
	CreatedTime        int64      `json:"created_time"`
	UpdatedTime        int64      `json:"updated_time"`
	ReportedCount      int        `json:"reported_count"`
	IsAccountGaemaeneo bool       `json:"is_account_gaemaeneo"`
	IsAccountSuspended bool       `json:"is_account_suspended"`
	IsInGame           bool       `json:"is_in_game"`
}
