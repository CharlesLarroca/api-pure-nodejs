echo 'requesting all heroes'
curl localhost:3000/heroes

echo 'requesting flash'
curl localhost:3000/heroes/1

echo 'requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes

echo 'Creating Luffy'
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Luffy", "age": 19, "power": "Devil-Fruit Gomu-Gomu"}' \
    localhost:3000/heroes)

echo $CREATE

ID=$(echo $CREATE)

echo 'requesting Luffy'
curl localhost:3000/heroes/1$ID