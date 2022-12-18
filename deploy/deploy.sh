#!/usr/bin/env bash

# Exit on fail
set -e

if [ -z $1 ]
then
    echo "Deployment bucket name not specified. Exiting..."
    exit 2
fi

echo -e "\e[32m-- Deployment commenced --\e[39m"

# 1. CF Create buckets
echo -e "\e[32mChecking deployment bucket exists...\e[39m"
if aws s3 ls "s3://$1" 2>&1 | grep -q 'An error occurred'
then
    echo -e "\e[32m(Existing bucket not found. Attempting to create deployment bucket...)\e[39m"
    aws s3api create-bucket --bucket $1 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
    echo -e "\e[32m(Deployment bucket created)\e[39m"
else
    echo -e "\e[32m(Deployment bucket already exists)\e[39m"
fi

# 2. Copy function zips to functions bucket
echo -e "\e[32mUploading function code...\e[39m"
TRANSLATE_ZIP_NAME=$(basename $(ls ../dist/translate*.zip))
SERVER_ZIP_NAME=$(basename $(ls ../dist/server*.zip))
aws s3 cp ../dist/ s3://$1/ --recursive

# 3. CF Create everything else
echo -e "\e[32mCloudforming infrastructure...\e[39m"
aws cloudformation deploy \
    --s3-bucket $1 \
    --template-file infra.json \
    --force-upload \
    --stack-name obfuscator-stack \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        FunctionsBucketName=$1 \
        ServerZipName=$SERVER_ZIP_NAME \
        TranslateZipName=$TRANSLATE_ZIP_NAME \
    --no-fail-on-empty-changeset

# 4. Get static site bucket name
echo -e "\e[32mRetrieving static site bucket name...\e[39m"
SITE_BUCKET_NAME="$(aws cloudformation list-exports --query "Exports[?Name==\`ObfuscatorSiteBucketName\`].Value" --no-paginate --output text)"
echo -e "\e[32m(Static site bucket name is\e[39m $SITE_BUCKET_NAME\e[32m)\e[39m"


# 5. Copy assets to static site bucket
echo -e "\e[32mUploading static assets to static site bucket...\e[39m"
aws s3 cp ../src/frontend/dist/static/ s3://$SITE_BUCKET_NAME/static/ --recursive

echo -e "\e[32m-- Deployment completed successfully --\e[39m"

# 6. Remind about DNS
echo -e "\e[32mDon't forget to set up an A Alias record pointing to CloudFront\e[39m"
DIST_DOMAIN_NAME="$(aws cloudformation list-exports --query "Exports[?Name==\`ObfuscatorAPIDistributedDomainName\`].Value" --no-paginate --output text)"
echo -e "\e[32m(Amazon CloudFront distribution domain name is\e[39m $DIST_DOMAIN_NAME\e[32m)\e[39m"