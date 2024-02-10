from flask import Flask, render_template as rt, request ,flash ,redirect


app=Flask(__name__)




@app.route('/')
def homepage():
    return rt('index.html')


@app.route('/payment/', methods = ["POST", "GET"])
def payments():
    if (request.method == "POST"):
        merchant_id = 1234
        print (merchant_id)
        value = int(request.form.get("price"))
        print(value)

        url = 'http://127.0.0.1:8080/receive_data/123'  # Update with your Flask server's IP and port

        data_to_send = {'key': 'value', 'another_key': 'another_value'}

        response = requests.post(url, json=data_to_send)

        print(response.status_code)
        print(response.json())



@app.route('/status/<int:merchant_id>', methods=['POST','GET'])
def receive_data(merchant_id):
    if (request.method=="POST"):
     
        
        hash = request.form.get("hash")
        status = request.form.get("status")
        amount =request.form.get("amount")
        

        print(merchant_id)

        response_data = {'status': 'success'}

    
    return rt('paymentstatus.html' , hash=hash , status =status ,amount=amount)

@app.route('/check/<int:hash>/<int:status>/<int:amount>,')
def check(hash, status , amount):
    return rt('paymentstatus.html' , hash=hash , status =status ,amount=amount)





app.run( debug=True , host='0.0.0.0',port=9090)