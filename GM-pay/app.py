
from flask import Flask, render_template as rt, request ,flash ,redirect,jsonify
from api.db_crud import  alreadyExit, addUser , userData, getdata
from formClasses import signupForm, loginForm
from flask_login import UserMixin, login_user,LoginManager ,login_required, logout_user ,current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS


app=Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = "my super secrate key"

# Flask_Login Stuff
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(email):
    data= userData(email)
    user_object = User( Name=data['Name'],email=data['email'], pass_hash=data['pass_hash'] )
    return user_object


class User(UserMixin):
    def __init__(self, Name , email, pass_hash):
        # self.id = user_id
        self.Name = Name
        self.email= email
        self.pass_hash =pass_hash
        # self.is_active = is_active

    def get_id(self):
        return self.email

### all the routes


@app.route('/')
def homepage():
    return rt('index.html')


@app.route('/payments/<int:merchant_id>', methods=['GET', 'POST'])
def payment(merchant_id):
    if (request.method== "POST"):
        data = request.json
        data= jsonify(data)
        print(data)
        
    # merchant_name = getmerchantname(merchant_id)
    return rt('payment.html' , merchant_name='.seeakers',  data=data )


# login
@app.route('/login', methods=['GET', 'POST'])
def login():
    form=loginForm()
    print(form.errors)
    if form.validate_on_submit():
        if (alreadyExit(form.email.data)):
            data = userData(form.email.data)
            if (check_password_hash(data['pass_hash'],form.password.data)):
                user_object = User( Name=data['Name'],email=data['email'], pass_hash=data['pass_hash'] )
                login_user(user_object)
                flash("Login Succesfull!!")
                Name=data['Name']
                return redirect(f'/dashboard/{Name}')
            else:
                flash('Incorrect login credentials')
        else:
            flash('user doest exist try again')
    print(form.errors)
    

    return rt('login.html' , form = form )



# signup
@app.route('/signup', methods=['GET', 'POST'])
def signin():

    form = signupForm()
    if form.validate_on_submit():
        print('form validate')

        if (alreadyExit(form.email.data)):
            flash("This email is already in use")
            return rt('signup.html', form=form)
        else:
            print("This name is already in use")
            hash_pass =  generate_password_hash(form.password.data, method='scrypt')
            addUser( form.userName.data, form.email.data , hash_pass , account_balance =0 ,transactions = [] )
            flash('Sign Up Successful')
            return redirect('/login')

    return rt('signup.html' , form=form)


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
	logout_user()
	flash("You Have Been Logged Out! Thanks For Stopping By...")
	return redirect(('/login'))


@app.route('/dashboard/<name>')
@login_required
def dashbord(name):
    data = getdata(name)
    print(name)
    return rt('dashbord.html' , data = data)




@app.route('/receive_data/<int:merchant_id>', methods=['POST','GET'])
def receive_data(merchant_id):
    if (request.method=="POST"):
        # price = request.json
        # print("Received data:", price)
        
        order_id = request.form.get("order_id")
        amount = request.form.get("amount")

        print(merchant_id)

        response_data = {'status': 'success'}
        # return jsonify(response_data)
    
    return rt('payment.html' , merchant_name=".sneakers" , order_id =order_id ,amount=amount)



# all the errors goes here 
@app.errorhandler(404)
def badlink(e):
    return rt('pagenotfound.html') , 404







if __name__ == "__main__":
    app.run( debug=True , host='0.0.0.0',port=8080)