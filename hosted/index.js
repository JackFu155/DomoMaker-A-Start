//Function to send email containing passsword

function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "jackfu155@gmail.com",
	Password : "DeathStar10188",
	To : '<recipient’s email address>',
	From : "jackfu155@gmail.com",
	Subject : "Password: {{Password}}",
	Body : "<email body>",
	}).then(
		message => alert("mail sent successfully")
	);
}