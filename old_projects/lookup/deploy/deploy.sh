#!/bin/bash

## variables
# $1 => ssh username of hosting provider
# $2 => ssh host of hosting provider
# $3 => project name ($CI_PROJECT_NAME of gitlab runner)
# $4 => ssh key

# check ssh connectivity and credentials
ssh -q "${1}@${2}" -i "${4}" exit
if [ $? -ne 0 ]; then
  echo -e "\e[41mServer unreachable or password invalid. Check your credentials \e[49m"
  exit 1;
fi

# bulid app and zip it
zipFilename="${3}_$(date +%d_%m_%Y).tar.gz"

tar --exclude=".alias" \
    --exclude=".git" \
    --exclude=".idea" \
    --exclude="assets" \
    --exclude="deploy" \
    --exclude="docker" \
    --exclude="vendor" \
    --exclude="node_modules" \
    --exclude="tests" \
    --exclude=".env.test" \
    --exclude=".env.local" \
    --exclude="var" \
    --exclude=".envrc" \
    --exclude=".gitignore" \
    --exclude="Makefile" \
    --exclude="package.json" \
    --exclude="package-lock.json" \
    --exclude="phpunit.xml.dist" \
    --exclude="README.md" \
    --exclude="webpack.config.js" \
    --exclude="tsconfig.json" \
    --exclude="jest.config.js" \
    --exclude="babel.config.js" \
    --exclude="npm-debug.log" \
    --exclude=".gitlab-ci.yml" \
  -zcf "../${zipFilename}" .

cd .. || exit 1;

# upload zip file
echo 'upload app...'
uploadedFilePath="/var/tmp/uploads/${3}_ondeck.tar.gz"
scp -i "${4}" "./${zipFilename}" "${1}@${2}:/var/tmp/uploads/${3}_ondeck.tar.gz"

echo 'install app...'
rootPath='/httpdocs'
ondeckPath="${rootPath}/${3}_ondeck/"

ssh -q "${1}@${2}" -i "${4}" "
  #create ondeck
  if [ -d '${ondeckPath}' ]; then
    rm -rf '${ondeckPath}';
  fi
  mkdir '${ondeckPath}'

  # dezip files to on deck folder and copy .env.local file
  tar xfvz '${uploadedFilePath}' -C '${ondeckPath}'
  cp '/env/${3}_.env.local' '${ondeckPath}/.env.local'

  # install backend dependencies
  cd '${ondeckPath}'
  php ./composer.phar dump-env prod;
  php ./composer.phar install --no-dev --optimize-autoloader
  php bin/console cache:clear --no-warmup

  echo 'installation successful'
  echo 'swapping now...'

  if [ $? -ne 0 ]; then
    echo -e '\e[31mCritical\e[39m: Something went wrong. Swap not done!'
    exit 1
  fi

  # swap
  mv '${rootPath}/${3}_current/' '${rootPath}/${3}_old/'
  mv '${ondeckPath}' '${rootPath}/${3}_current/'

  if [ -d '${ondeckPath}' ] || ! [ -d '${rootPath}/${3}_old/' ]; then
    echo -e '\e[31mCritical\e[39m: Swap not successfull. Swap the folder manually: ${rootPath}'
    exit 1
  fi

  echo -e swap '\e[32msuccessful\e[39m'
  rm -rf ${rootPath}/${3}_old/;
  mv ${uploadedFilePath} /backups/${zipFilename}

  exit 0
"

if [ $? -ne 0 ]; then
  echo -e "\e[41mDeployment unsuccessfull\e[49m"
  exit 1
fi

echo -e "\e[42mDeployment successfull\e[49m"

