#!/bin/bash

# copy the folder
rm -rf nodejs
rm gremlin-layer.zip
mkdir -p nodejs
cp package.json nodejs/
cp -r node_modules nodejs/node_modules

# zip the folder 
zip -vr gremlin-layer.zip nodejs/ -x "*.DS_Store"

# upload to s3
aws s3 cp gremlin-layer.zip s3://prabhat-ml-oregon/lambda-layers/gremlin-layer.zip

# publish the layer
aws lambda publish-layer-version --layer-name gremlin-layer --description "Gremlin layer" --license-info "MIT" \
--content S3Bucket=prabhat-ml-oregon,S3Key=lambda-layers/gremlin-layer.zip --compatible-runtimes nodejs12.x

# modify lambda to use the new layer
aws lambda update-function-configuration --function-name audit --layers arn:aws:lambda:us-west-2:107995894928:layer:gremlin-layer:12