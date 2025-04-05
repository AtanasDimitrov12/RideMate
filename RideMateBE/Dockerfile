# Stage 1: Build the application using Gradle
FROM gradle:8.5-jdk21 AS build
WORKDIR /opt/app

# Copy all backend source files
COPY . .

# Build the JAR file
RUN gradle build

# Stage 2: Run the JAR file using JDK runtime
FROM openjdk:21-jdk-slim
WORKDIR /opt/app

# Copy the JAR from the previous stage
COPY --from=build /opt/app/build/libs/*.jar app.jar

# Expose port used by Spring Boot (default 8080)
EXPOSE 8080

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
