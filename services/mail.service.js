const nodemailer = require("nodemailer");

module.exports = function (app) {
  app.post("/sendEmail", async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mihaismolenski@gmail.com",
        pass: "fsdovayumdsmxdxw",
      },
    });

    const mailOptions = {
      from: "PrushaMedia.ro",
      to: "mihaismolenski@gmail.com",
      subject: `[Message from PrushaMedia.ro client]`,
      html: `<b>From:</b> ${req.body.name}<br />
        <b>Phone:</b> ${req.body.phone}<br />
        <b>Email:</b> ${req.body.email}<br />
        <b>Message:</b> ${req.body.message}`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ success: true });
  });
};
