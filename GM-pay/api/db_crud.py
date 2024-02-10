import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

with open('config.json', 'r') as c:
    params = json.load(c)["params"]

db_user = params['db_username']
db_pass = params['db_pass']


def SECRET_KEY():
    Secrate=  params['app_secret_key']
    return Secrate



uri = "mongodb+srv://"+str(db_user)+":"+str(db_pass)+"@cluster0.ebzle64.mongodb.net/"
client = MongoClient(uri, server_api=ServerApi('1'))
mydb = client["GM_Pay"]

merchant = mydb["merchant_data"]


def addUser( Name , email, pass_hash , account_balance , transactions):
    user_data = dict(Name = Name, email = email, pass_hash = pass_hash , account_balance = account_balance, transactions =transactions)
    result = merchant.insert_one(user_data)
    print(result)


def alreadyExit(email):
        data = merchant.find_one({ "email": email })
        if data:
            return True
        else:
            return False

def userData(email):
    data = merchant.find_one({ "email": email })
    return data

def getmerchantname(merchant_id):
    data = merchant.find_one({ "merchant_id": merchant_id })
    return data

def getdata(Name):
    data = merchant.find_one({"Name" : Name })
    print(data)
    return data

