FROM openjdk:17-alpine

EXPOSE 8080

COPY ./build/libs/petCommunity-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app.jar"]