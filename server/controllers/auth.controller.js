const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const err = new Error("user already exist")
      err.status = 400;
      throw err;
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashPassword, role })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: "8h" })

    return res.status(201).json({ success: true, message: "user created successfully", data: { token, user } })

  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      const err = new Error("Invalid details")
      err.status = 400;
      throw err;
    }

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) {
      const err = new Error("Password doesn't match")
      err.status = 400
      throw err;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: "8h" })

    return res.status(200).json({ success: true, message: "user logged-in successfully", data: { token, user } })

  } catch (error) {
    next(error)
  }
}

const getMe = async (req, res, next) => {
  try {
    const _id = req.user;

    const user = await User.findOne(_id);

    if (!user) {
      const err = new Error("user not found");
      err.status = 404;
      throw err;
    }

    return res.status(200).json({ message: "user fetched successfully", data: user })

  } catch (error) {
    next(error)
  }
}

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "users fetched successfully", data: users })

  } catch (error) {
    next(error)
  }
}



const forgotPasswordControllers = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ msg: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found with that email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: `"WorkTrack Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - WorkTrack",

      html: `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f3f7f7;
      padding: 30px 15px;
    ">
      <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      ">

        <!-- Header -->
        <div style="
          background-color: #0f766e;
          padding: 25px 20px;
          text-align: center;
        ">
          <h1 style="
            color: #ffffff;
            margin: 0;
            font-size: 25px;
            font-weight: 700;
            letter-spacing: 0.5px;
          ">
            WorkTrack
          </h1>

          <p style="
            color: #ccfbf1;
            margin: 8px 0 0;
            font-size: 13px;
          ">
            Smart Attendance. Better Workdays.
          </p>
        </div>

        <!-- Email Content -->
        <div style="
          padding: 32px 30px;
          color: #374151;
        ">

          <h2 style="
            margin: 0 0 20px;
            font-size: 22px;
            color: #111827;
          ">
            Password Reset Request
          </h2>

          <p style="
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 15px;
          ">
            Hello <strong>${user.name}</strong>,
          </p>

          <p style="
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 20px;
          ">
            We received a request to reset the password for your
            WorkTrack account. Click the button below to create
            a new password and regain access to your workspace.
          </p>

          <!-- Reset Button -->
          <div style="
            text-align: center;
            margin: 30px 0;
          ">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                background-color: #0f766e;
                color: #ffffff;
                padding: 13px 30px;
                border-radius: 7px;
                text-decoration: none;
                font-size: 15px;
                font-weight: 600;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="
            font-size: 14px;
            line-height: 1.7;
            color: #6b7280;
          ">
            This password reset link will expire in
            <strong>1 hour</strong>.
            If you did not request a password reset, you can
            safely ignore this email. Your account will remain secure.
          </p>

          <div style="
            margin-top: 25px;
            padding: 15px;
            background-color: #f0fdfa;
            border-left: 4px solid #0f766e;
            border-radius: 4px;
          ">
            <p style="
              margin: 0;
              font-size: 13px;
              line-height: 1.6;
              color: #115e59;
            ">
              <strong>Security reminder:</strong>
              Never share your password or password reset link
              with anyone.
            </p>
          </div>

          <p style="
            font-size: 14px;
            line-height: 1.7;
            margin-top: 28px;
          ">
            Best regards,<br />
            <strong>The WorkTrack Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #f3f4f6;
          padding: 20px 15px;
          text-align: center;
          font-size: 12px;
          line-height: 1.8;
          color: #6b7280;
        ">
          <p style="margin: 0 0 5px;">
            &copy; ${new Date().getFullYear()} WorkTrack.
            All rights reserved.
          </p>

          <p style="margin: 0;">
            Need assistance?
            <a
              href="mailto:${process.env.SUPPORT_EMAIL || process.env.EMAIL_USER}"
              style="
                color: #0f766e;
                text-decoration: none;
                font-weight: 600;
              "
            >
              Contact Support
            </a>
          </p>

          <p style="
            margin: 12px 0 0;
            font-size: 11px;
            color: #9ca3af;
          ">
            This is an automated email. Please do not reply directly.
          </p>
        </div>

      </div>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ msg: "Failed to send email" });
      }
      res.json({ msg: "Reset link sent to your email" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const resetPasswordControllers = async (req, res) => {
  try {
    const resetPassToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetPassToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { register, login, getMe, allUsers, forgotPasswordControllers, resetPasswordControllers }
