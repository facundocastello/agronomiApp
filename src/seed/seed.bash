curl -H 'Content-Type: application/json' \
            -X POST http://192.168.0.27:5984/dbname/_bulk_docs \
            -d "$(< bovineTypes.json)"