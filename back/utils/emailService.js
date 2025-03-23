import  nodemailer from "nodemailer";

export const sendConfirmationEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const confirmationLink = `${process.env.CLIENT_URL}/confirm/${email}`;

        await transporter.sendMail({
            from: `"Your Newsletter" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirm Your Subscription",
            html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your subscription.</p>`,
        });

        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

