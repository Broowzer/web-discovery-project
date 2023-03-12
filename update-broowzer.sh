#!/usr/bin/env sh

rm -fr broowzer
mkdir broowzer
cd broowzer && wget 'https://github.com/broowzer/broowzer-browser/releases/download/v1.0.0/broowzer-browser-1.0.0-linux-amd64.zip' -O broowzer.zip && unzip broowzer.zip && rm broowzer.zip
