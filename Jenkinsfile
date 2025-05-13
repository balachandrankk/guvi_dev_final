pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_DIR = "${env.WORKSPACE}"  // Define the working directory for Docker Compose
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your Git repository
                git 'https://github.com/balachandrankk/guvi_dev_final.git'
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    // Pull the latest images and start the containers
                    sh 'docker-compose down || true'  // Stop and remove any running containers from previous builds
                    sh 'docker-compose up -d --build'  // Build images and run containers in detached mode
                }
            }
        }

        stage('Verify') {
            steps {
                // Simple verification using curl (ensure you can access the site at port 8081)
                sh 'curl -I http://localhost:8081'  // Or change the port if needed
            }
        }
    }

    post {
        always {
            // Clean up containers after the build
            echo 'Cleaning up containers...'
            sh 'docker-compose down'
        }
    }
}
