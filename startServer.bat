cd "C:\Program Files\MongoDB\Server\3.6\bin"
START mongod --dbpath "C:\mongodb\dorm-supplies-api\data\db" --port 5000
TIMEOUT 2
cd "C:\Users\burnerval\Desktop\HSA\dorm-supplies-api"
nodemon app.js