import numpy as np
from flask import Flask, abort, jsonify, request
import jsonpickle
import pickle as pickle
from flask_cors import CORS, cross_origin

# Load the file into my_random_forest
my_random_forest = pickle.load(open("iris_rfc.pkl", "rb"))

app = Flask(__name__)

app.config['SECRET_KEY'] = 'SecretKey'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/iris": {"origins": "http://localhost:port"}})

@app.route('/iris', methods = ['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def make_predict():
    # Request the data from the post method and store in data
    data = request.get_json(force = True)
    
    predict_request = [data['sl'], data['sw'], data['pl'], data['pw']]

    # Convert the array to an numpy array
    predict_request = np.array(predict_request)
    # Reshape the data to a 2d array
    predict_request = predict_request.reshape(-1,4)

    # Change the numpy array with 64bit ints into an array that can be jsonified
    y_hat = my_random_forest.predict(predict_request).tolist()
    output = y_hat

    # Jsonify results
    return jsonify(results = output)

if __name__ == '__main__':
    app.run(port = 9000, debug=True)