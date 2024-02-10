from flask_wtf import FlaskForm , RecaptchaField
from wtforms import StringField, SubmitField, EmailField, PasswordField
from wtforms.validators import DataRequired , EqualTo , Length


class signupForm(FlaskForm):
    userName = StringField("User Name", validators=[DataRequired()])
    email = EmailField("Your Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirmPassword = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password' ,message='pasward must match')])
    submit = SubmitField("Create an account")


class loginForm(FlaskForm):
    email = EmailField("Your Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Login")



