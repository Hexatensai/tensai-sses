#!/bin/sh
cd /src
. ./venv/bin/activate
exec npm start  && \ dotnet run
