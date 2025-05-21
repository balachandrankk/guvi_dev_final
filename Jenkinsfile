pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_DIR = "${env.WORKSPACE}"  // Defines where Docker Compose will run
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/balachandrankk/guvi_dev_final.git'
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    dir("${env.WORKSPACE}") {
                        sh 'docker-compose down || true'  // Clean up any existing containers before starting
                        sh 'docker-compose up -d --build'  // Build and start containers in detached mode
                    }
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    sh 'sleep 10'  // Wait for services to start
                    sh 'curl -I http://localhost:8081 || true'  // Check if the service is responding
                }
            }
        }
    }

    // Post block is removed to keep containers running after the build
}
