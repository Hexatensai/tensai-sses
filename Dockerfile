#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /home/app
EXPOSE 8000 5432
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["tensai-sses.csproj", "."]
RUN dotnet restore "./tensai-sses.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "tensai-sses.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "tensai-sses.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /home/app/publish .
COPY trdb.sh /docker-entrypoint-initdb.d/
ENTRYPOINT ["dotnet", "tensai-sses.dll","docker-entrypoint.sh"]
CMD ["sh" , "entrypoint.sh"]

#FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
#
#COPY . /home/app/
#WORKDIR /home/app
#COPY ["tensai-sses.csproj", "."]
#RUN dotnet restore "./tensai-sses.csproj"
#COPY . .
##RUN apk add python3 py3-pip curl && \
    ##python3 -m venv venv 
#RUN . venv/bin/activate && \
    ##python3 -m pip install --upgrade pip && \
    #pip install -r /home/app/requirements.txt
#ENV PYTHONUNBUFFERED=1
#COPY trdb.sh /docker-entrypoint-initdb.d/
#ENTRYPOINT ["docker-entrypoint.sh"]
#
#EXPOSE 8000 5432
#CMD ["sh" , "entrypoint.sh"]
