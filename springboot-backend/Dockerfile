# Stage 1: Build the application
FROM maven:3.6.3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Setup the runtime environment
FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/IMS-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app.jar"]